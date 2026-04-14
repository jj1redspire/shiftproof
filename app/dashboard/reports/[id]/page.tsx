'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ArrowLeft, Download, AlertTriangle, Wrench, CheckCircle, Loader2, Shield } from 'lucide-react'
import type { Report, ZoneData } from '@/types'
import { format, parseISO } from 'date-fns'

function RatingBadge({ rating }: { rating: string }) {
  const map: Record<string, string> = {
    good: 'bg-green-900 text-green-300 border-green-700',
    fair: 'bg-yellow-900 text-yellow-300 border-yellow-700',
    poor: 'bg-red-900 text-red-300 border-red-700',
  }
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${map[rating] || map.good} uppercase tracking-wide`}>{rating}</span>
}

function SeverityDot({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    normal: 'bg-green-400',
    attention: 'bg-yellow-400',
    urgent: 'bg-red-400',
    minor: 'bg-yellow-400',
    moderate: 'bg-orange-400',
    severe: 'bg-red-400',
  }
  return <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${map[severity] || 'bg-gray-400'}`} />
}

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from('shiftproof_reports')
        .select('*, shiftproof_locations(name)')
        .eq('id', params.id)
        .single()
      if (!data) { router.push('/dashboard'); return }
      setReport(data as unknown as Report)
      setLoading(false)
    }
    load()
  }, [params.id, router])

  async function handleExportPDF() {
    if (!report) return
    const { generateReportPDF } = await import('@/lib/pdf')
    const doc = generateReportPDF({
      id: report.id,
      shift_date: report.shift_date,
      report_type: report.report_type,
      location_name: (report as unknown as { shiftproof_locations?: { name: string } }).shiftproof_locations?.name || 'Location',
      business_name: 'My Business',
      zone_data: report.zone_data as Record<string, {
        zone_name: string;
        overall_rating?: string;
        summary?: string;
        condition_items?: Array<{item: string; severity: string; notes?: string}>;
        new_damage?: Array<{description: string; severity: string}>;
        maintenance_items?: Array<{description: string; priority: string}>;
      }>,
      ai_summary: report.ai_summary,
      overall_score: report.overall_score,
      completed_at: report.completed_at,
    })
    doc.save(`shiftproof-${report.shift_date}.pdf`)
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
    </div>
  )

  if (!report) return null

  const zones = Object.values(report.zone_data || {}) as ZoneData[]

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Back */}
      <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Timeline
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-400 mb-1 capitalize">{report.report_type} walkthrough</div>
          <h1 className="text-3xl font-black">
            {format(parseISO(report.shift_date), 'MMMM d, yyyy')}
          </h1>
          {report.overall_score && (
            <p className="text-gray-400 text-sm mt-1">Overall score: {report.overall_score}/10</p>
          )}
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-surface-light hover:bg-surface-border border border-surface-border text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shrink-0"
        >
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* AI Summary */}
      {report.ai_summary && (
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold">AI Summary</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{report.ai_summary}</p>
        </div>
      )}

      {/* Zones */}
      {zones.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No zone data recorded.</div>
      ) : (
        <div className="space-y-4">
          {zones.map((zone, i) => (
            <div key={i} className="bg-surface rounded-xl border border-surface-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
                <h3 className="font-bold">{zone.zone_name}</h3>
                <RatingBadge rating={zone.overall_rating || 'good'} />
              </div>
              <div className="p-5 space-y-4">
                {zone.summary && (
                  <p className="text-gray-400 text-sm italic">{zone.summary}</p>
                )}

                {zone.condition_items && zone.condition_items.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      <CheckCircle className="w-3.5 h-3.5" /> Observations
                    </div>
                    <ul className="space-y-1.5">
                      {zone.condition_items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <SeverityDot severity={item.severity} />
                          <span>{item.item}{item.notes ? ` — ${item.notes}` : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {zone.new_damage && zone.new_damage.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">
                      <AlertTriangle className="w-3.5 h-3.5" /> New Damage
                    </div>
                    <ul className="space-y-1.5">
                      {zone.new_damage.map((dmg, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-red-300">
                          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0 mt-1.5" />
                          {dmg.description}
                          <span className="text-red-500 text-xs ml-auto">[{dmg.severity}]</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {zone.maintenance_items && zone.maintenance_items.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2">
                      <Wrench className="w-3.5 h-3.5" /> Maintenance Needed
                    </div>
                    <ul className="space-y-1.5">
                      {zone.maintenance_items.map((maint, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-yellow-300">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
                          {maint.description}
                          <span className="text-yellow-500 text-xs ml-auto">[{maint.priority}]</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
