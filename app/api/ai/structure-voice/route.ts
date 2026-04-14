import { NextRequest, NextResponse } from 'next/server'
import { structureVoiceNote } from '@/lib/anthropic'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { zoneName, transcript } = await request.json()
    if (!zoneName || !transcript) {
      return NextResponse.json({ error: 'Missing zoneName or transcript' }, { status: 400 })
    }

    const result = await structureVoiceNote(zoneName, transcript)
    return NextResponse.json(result)
  } catch (error) {
    console.error('structure-voice error:', error)
    return NextResponse.json({ error: 'Failed to analyze observations' }, { status: 500 })
  }
}
