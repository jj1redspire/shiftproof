import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import OpenAI, { toFile } from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { audio } = await request.json()
    if (!audio) return NextResponse.json({ error: 'No audio provided' }, { status: 400 })

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
    const buffer = Buffer.from(audio, 'base64')
    const file = await toFile(buffer, 'recording.webm', { type: 'audio/webm' })

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'en',
    })

    return NextResponse.json({ transcript: transcription.text })
  } catch (error) {
    console.error('transcribe error:', error)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
