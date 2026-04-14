'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Play, Calendar, AlertTriangle, Zap, ChevronRight, Loader2 } from 'lucide-react'
import type { Location, Report } from '@/types'
import { format, parseISO, differenceInCalendarDays } from 'date-fns'

function ConditionBadge({ rating }: { rating: string }) {
  const map: Record<string, string> = {
    good: 'bg-green-900 text-green-300',
    fair: 'bg-yellow-900 text-yellow-300',
    poor: 'bg-red-900 text-red-300',
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${map[rating] || map.good}`}>{rating || 'good'}</span>
}

function getStreak(reports: Report[]): number {
  if (reports.length === 0) return 0
  let streak = 1
  const sorted = [...reports].sort((a, b) => b.shift_date.localeCompare(a.shift_date))
  for (let i = 1; i < sorted.length; i++) {
    const diff = differenceInCalendarDays(parseISO(sorted[i-1].shift_date), parseISO(sorted[i].shift_date))
    if (diff === 1) streak++
    else break
  }
  return streak
}

function ScoreBar({ score }: { score?: number }) {
  const s = score ?? 7
  const color = s >= 8 ? 'bg-green-500' : s >= 5 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-navy-700 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${(s / 10) * 100}%` }} />
      </div>
      <span className="text-xs text-gray-400">{s}/10</span>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      const { data: locs } = await supabase
        .from('shiftproof_locations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true })

      if (!locs || locs.length === 0) {
        router.push('/dashboard/onboarding')
        return
      }

      setLocations(locs as Location[])
      setSelectedLocation(locs[0].id)
    }
    load()
  }, [router])

  useEffect(() => {
    if (!selectedLocation) return
    async function loadReports() {
      setLoading(true)
      const supabase = createClient()
      const { data } = await supabase
        .from('shiftproof_reports')
        .select('*')
        .eq('location_id', selectedLocation)
        .order('shift_date', { ascending: false })
        .limit(60)
      setReports((data || []) as Report[])
      setLoading(false)
    }
    loadReports()
  }, [selectedLocation])

  const streak = getStreak(reports)
  const totalDamage = reports.reduce((acc, r) => acc + (r.damage_details?.length || 0), 0)

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Condition Timeline</h1>
          <p className="text-gray-400 text-sm mt-0.5">Daily facility documentation record</p>
        </div>
        <div className="flex items-center gap-3">
          {locations.length > 1 && (
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="bg-navy-700 border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          )}
          <Link href="/dashboard/walkthrough" className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-4 py-2.5 rounded-lg text-sm transition-colors">
            <Play className="w-4 h-4" />
            Start Walkthrough
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-surface rounded-xl border border-surface-border p-4 text-center">
          <div className="text-2xl font-black text-amber-400">{reports.length}</div>
          <div className="text-gray-400 text-xs mt-1">Total Reports</div>
        </div>
        <div className="bg-surface rounded-xl border border-surface-border p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-2xl font-black text-amber-400">{streak}</span>
          </div>
          <div className="text-gray-400 text-xs mt-1">Day Streak</div>
        </div>
        <div className="bg-surface rounded-xl border border-surface-border p-4 text-center">
          <div className="text-2xl font-black text-red-400">{totalDamage}</div>
          <div className="text-gray-400 text-xs mt-1">Damage Items</div>
        </div>
      </div>

      {/* Reports list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-surface-border rounded-2xl">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No reports yet</h3>
          <p className="text-gray-400 text-sm mb-6">Do your first walkthrough to start building your evidence record.</p>
          <Link href="/dashboard/walkthrough" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-6 py-3 rounded-lg transition-colors">
            <Play className="w-4 h-4" />
            Start First Walkthrough
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map(report => {
            const zoneCount = Object.keys(report.zone_data || {}).length
            const damageCount = report.damage_details?.length || 0
            const hasUrgent = report.damage_flagged
            const overallRating = zoneCount > 0
              ? Object.values(report.zone_data).every((z: unknown) => (z as {overall_rating: string}).overall_rating === 'good') ? 'good'
              : Object.values(report.zone_data).some((z: unknown) => (z as {overall_rating: string}).overall_rating === 'poor') ? 'poor'
              : 'fair'
              : 'good'

            return (
              <Link
                key={report.id}
                href={`/dashboard/reports/${report.id}`}
                className="flex items-center gap-4 bg-surface hover:bg-surface-light border border-surface-border hover:border-amber-400/30 rounded-xl p-4 transition-all group"
              >
                <div className="text-center min-w-[52px]">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {format(parseISO(report.shift_date), 'MMM')}
                  </div>
                  <div className="text-2xl font-black text-white leading-none">
                    {format(parseISO(report.shift_date), 'd')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(parseISO(report.shift_date), 'EEE')}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-medium text-sm capitalize">{report.report_type} walkthrough</span>
                    <ConditionBadge rating={overallRating} />
                    {hasUrgent && <AlertTriangle className="w-4 h-4 text-red-400" />}
                  </div>
                  <ScoreBar score={report.overall_score} />
                  <div className="text-xs text-gray-500 mt-1.5">
                    {zoneCount} zones · {damageCount > 0 ? `${damageCount} damage item${damageCount > 1 ? 's' : ''}` : 'no damage'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 transition-colors shrink-0" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
