'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react'
import type { Location } from '@/types'
import { format, parseISO } from 'date-fns'

interface DamageRecord {
  id: string
  date: string
  zone: string
  description: string
  severity: string
  status: string
  report_id: string
}

const severityColors: Record<string, string> = {
  minor: 'bg-yellow-900 text-yellow-300',
  moderate: 'bg-orange-900 text-orange-300',
  severe: 'bg-red-900 text-red-300',
}

export default function DamagePage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [damage, setDamage] = useState<DamageRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: locs } = await supabase.from('shiftproof_locations').select('*').eq('user_id', user.id).eq('is_active', true)
      if (locs) {
        setLocations(locs as Location[])
        if (locs.length > 0) setSelectedLocation(locs[0].id)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!selectedLocation) return
    async function loadDamage() {
      setLoading(true)
      const supabase = createClient()
      const { data: reports } = await supabase
        .from('shiftproof_reports')
        .select('id, shift_date, zone_data, damage_details')
        .eq('location_id', selectedLocation)
        .eq('damage_flagged', true)
        .order('shift_date', { ascending: false })

      const records: DamageRecord[] = []
      for (const report of (reports || [])) {
        const zones = Object.values(report.zone_data || {}) as Array<{zone_name: string; new_damage?: Array<{description: string; severity: string; location_within_zone: string}>}>
        for (const zone of zones) {
          for (const dmg of (zone.new_damage || [])) {
            records.push({
              id: `${report.id}-${zone.zone_name}-${dmg.description}`,
              date: report.shift_date,
              zone: zone.zone_name,
              description: dmg.description,
              severity: dmg.severity || 'minor',
              status: 'open',
              report_id: report.id,
            })
          }
        }
      }
      setDamage(records)
      setLoading(false)
    }
    loadDamage()
  }, [selectedLocation])

  const filtered = damage.filter(d => filter === 'all' ? true : d.status === filter)

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Damage Log</h1>
          <p className="text-gray-400 text-sm mt-0.5">Every damage event, timestamped and searchable</p>
        </div>
        {locations.length > 1 && (
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="bg-navy-700 border border-surface-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
          >
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400" />
        {(['all', 'open', 'resolved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-amber-400 text-navy-900' : 'bg-surface-light text-gray-400 hover:text-white border border-surface-border'}`}
          >
            {f}
          </button>
        ))}
        <span className="text-gray-500 text-sm ml-2">{filtered.length} items</span>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-500">Loading damage records...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-surface-border rounded-2xl">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">{filter === 'all' ? 'No damage recorded' : `No ${filter} items`}</h3>
          <p className="text-gray-400 text-sm">
            {filter === 'all' ? 'Keep doing daily walkthroughs. Any damage the AI flags will appear here.' : `All damage items have been ${filter === 'open' ? 'resolved' : 'opened'}.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-surface border border-surface-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${item.severity === 'severe' ? 'text-red-400' : item.severity === 'moderate' ? 'text-orange-400' : 'text-yellow-400'}`} />
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-white">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      <span className="text-gray-500 text-xs">{item.zone}</span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{format(parseISO(item.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${severityColors[item.severity] || 'bg-gray-800 text-gray-300'}`}>
                    {item.severity}
                  </span>
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded ${item.status === 'resolved' ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'}`}>
                    {item.status === 'resolved' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
