'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { MapPin, Plus, Check, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { Location, Zone } from '@/types'

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [zones, setZones] = useState<Record<string, Zone[]>>({})
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null)
  const [showAddLocation, setShowAddLocation] = useState(false)
  const [newLocName, setNewLocName] = useState('')
  const [newLocAddress, setNewLocAddress] = useState('')
  const [newZoneNames, setNewZoneNames] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLocations()
  }, [])

  async function loadLocations() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: locs } = await supabase
      .from('shiftproof_locations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (locs) {
      setLocations(locs as Location[])
      // Load zones for each location
      const zoneMap: Record<string, Zone[]> = {}
      for (const loc of locs) {
        const { data: z } = await supabase
          .from('shiftproof_zones')
          .select('*')
          .eq('location_id', loc.id)
          .order('sort_order', { ascending: true })
        zoneMap[loc.id] = (z || []) as Zone[]
      }
      setZones(zoneMap)
    }
    setLoading(false)
  }

  async function addLocation() {
    if (!newLocName) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('shiftproof_locations').insert({
      user_id: user.id,
      name: newLocName,
      address: newLocAddress,
      type: 'bar',
    })
    setNewLocName('')
    setNewLocAddress('')
    setShowAddLocation(false)
    setSaving(false)
    loadLocations()
  }

  async function toggleZone(zoneId: string, currentActive: boolean) {
    const supabase = createClient()
    await supabase.from('shiftproof_zones').update({ is_active: !currentActive }).eq('id', zoneId)
    loadLocations()
  }

  async function addZone(locationId: string) {
    const name = newZoneNames[locationId]
    if (!name) return
    const supabase = createClient()
    const currentZones = zones[locationId] || []
    await supabase.from('shiftproof_zones').insert({
      location_id: locationId,
      name,
      sort_order: currentZones.length + 1,
      checklist_items: [],
      is_active: true,
    })
    setNewZoneNames(prev => ({ ...prev, [locationId]: '' }))
    loadLocations()
  }

  if (loading) return <div className="flex items-center justify-center min-h-64"><Loader2 className="w-6 h-6 text-amber-400 animate-spin" /></div>

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Locations & Zones</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage your inspection locations and zones</p>
        </div>
        <button
          onClick={() => setShowAddLocation(true)}
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-4 py-2.5 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Location
        </button>
      </div>

      {/* Add location form */}
      {showAddLocation && (
        <div className="bg-surface border border-amber-400/30 rounded-xl p-5 mb-4">
          <h3 className="font-semibold mb-4">New Location</h3>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={newLocName}
              onChange={e => setNewLocName(e.target.value)}
              placeholder="Location name"
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            />
            <input
              type="text"
              value={newLocAddress}
              onChange={e => setNewLocAddress(e.target.value)}
              placeholder="Address (optional)"
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowAddLocation(false)} className="flex-1 py-2.5 rounded-lg border border-surface-border text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
            <button
              onClick={addLocation}
              disabled={saving || !newLocName}
              className="flex-1 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Add Location'}
            </button>
          </div>
        </div>
      )}

      {/* Locations list */}
      {locations.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-surface-border rounded-2xl">
          <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No locations yet</h3>
          <p className="text-gray-400 text-sm">Add your first location to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map(loc => {
            const locZones = zones[loc.id] || []
            const isExpanded = expandedLocation === loc.id
            return (
              <div key={loc.id} className="bg-surface border border-surface-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-light transition-colors"
                  onClick={() => setExpandedLocation(isExpanded ? null : loc.id)}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <div className="text-left">
                      <div className="font-semibold">{loc.name}</div>
                      {loc.address && <div className="text-gray-400 text-xs">{loc.address}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">{locZones.filter(z => z.is_active).length} active zones</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-surface-border px-5 py-4">
                    <div className="space-y-2 mb-4">
                      {locZones.map(zone => (
                        <div key={zone.id} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                          <span className={`text-sm ${zone.is_active ? 'text-white' : 'text-gray-500'}`}>{zone.name}</span>
                          <button
                            onClick={() => toggleZone(zone.id, zone.is_active)}
                            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${zone.is_active ? 'bg-green-900 text-green-300 hover:bg-red-900 hover:text-red-300' : 'bg-gray-800 text-gray-500 hover:bg-green-900 hover:text-green-300'}`}
                          >
                            {zone.is_active ? <><Check className="w-3 h-3" /> Active</> : <><X className="w-3 h-3" /> Inactive</>}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newZoneNames[loc.id] || ''}
                        onChange={e => setNewZoneNames(prev => ({ ...prev, [loc.id]: e.target.value }))}
                        placeholder="New zone name..."
                        className="flex-1 bg-navy-700 border border-surface-border rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                        onKeyDown={e => e.key === 'Enter' && addZone(loc.id)}
                      />
                      <button
                        onClick={() => addZone(loc.id)}
                        className="flex items-center gap-1 bg-surface-light hover:bg-surface-border border border-surface-border text-white text-sm px-3 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Zone
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
