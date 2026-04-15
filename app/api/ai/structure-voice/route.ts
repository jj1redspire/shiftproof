import { NextRequest, NextResponse } from 'next/server'
import { structureVoiceNote } from '@/lib/anthropic'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { zoneName, transcript } = body
    if (!zoneName || !transcript) {
      return NextResponse.json({ error: 'Missing zoneName or transcript' }, { status: 400 })
    }

    // businessType can be passed explicitly by the caller, or we auto-detect
    // it from the user's first active location — this way the walkthrough page
    // doesn't need to be modified to get vertical-specific AI prompts.
    let businessType: string = body.businessType || 'bar'

    if (!body.businessType) {
      const { data: locationData } = await supabase
        .from('shiftproof_locations')
        .select('business_type, type')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (locationData) {
        businessType = locationData.business_type || locationData.type || 'bar'
      }
    }

    const result = await structureVoiceNote(zoneName, transcript, businessType)
    return NextResponse.json(result)
  } catch (error) {
    console.error('structure-voice error:', error)
    return NextResponse.json({ error: 'Failed to analyze observations' }, { status: 500 })
  }
}
