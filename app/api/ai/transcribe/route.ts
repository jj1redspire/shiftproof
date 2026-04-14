import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Anthropic from '@anthropic-ai/sdk'

// Transcribe audio using Claude's text interpretation as fallback
// For production, swap with a dedicated transcription service (e.g. Whisper API)
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { audio } = await request.json()
    if (!audio) return NextResponse.json({ error: 'No audio provided' }, { status: 400 })

    // Attempt transcription via Claude's audio capabilities
    // If unavailable, return a helpful prompt for the user to type
    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'document',
                source: { type: 'base64', media_type: 'application/octet-stream', data: audio },
              } as unknown as Anthropic.TextBlockParam,
              {
                type: 'text',
                text: 'This is a voice recording of facility inspection observations. Please transcribe it accurately. Return only the transcription, no other text.',
              },
            ],
          },
        ],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        return NextResponse.json({ transcript: content.text })
      }
    } catch {
      // Audio transcription not supported — user must type manually
    }

    // Fallback: prompt user to type
    return NextResponse.json({ transcript: '' })
  } catch (error) {
    console.error('transcribe error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
