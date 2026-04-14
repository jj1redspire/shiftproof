import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generateReportPDF } from '@/lib/pdf'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { packageType, startDate, endDate } = await request.json()

    // Load user info
    const { data: userData } = await supabase
      .from('shiftproof_users')
      .select('*')
      .eq('id', user.id)
      .single()

    // Load reports in date range
    const { data: reports } = await supabase
      .from('shiftproof_reports')
      .select('*, shiftproof_locations(name)')
      .eq('user_id', user.id)
      .gte('shift_date', startDate)
      .lte('shift_date', endDate || startDate)
      .order('shift_date', { ascending: true })

    if (!reports || reports.length === 0) {
      return NextResponse.json({ error: 'No reports found for this date range' }, { status: 404 })
    }

    const locationName = (reports[0] as unknown as { shiftproof_locations?: { name: string } }).shiftproof_locations?.name || 'Location'

    // For multi-report packages, use the first report's PDF structure
    // In production, this would concatenate multiple reports
    const firstReport = reports[0]
    const doc = generateReportPDF({
      id: firstReport.id,
      shift_date: firstReport.shift_date,
      report_type: `${packageType === 'lease' ? 'Lease Defense Package' : packageType === 'insurance' ? 'Insurance Claim Evidence' : 'Slip-and-Fall Defense'} — ${startDate}${endDate && endDate !== startDate ? ` to ${endDate}` : ''}`,
      location_name: locationName,
      business_name: userData?.email?.split('@')[0] || 'Business',
      zone_data: firstReport.zone_data,
      ai_summary: firstReport.ai_summary,
      overall_score: firstReport.overall_score,
      completed_at: firstReport.completed_at,
    })

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="shiftproof-${packageType}-${startDate}.pdf"`,
      },
    })
  } catch (error) {
    console.error('export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
