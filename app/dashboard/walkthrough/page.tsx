'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Location, Zone } from '@/types'
import type { ZoneConditionResult } from '@/lib/anthropic'
import {
  Camera, Mic, Play, Square, ChevronRight, Check,
  Loader2, X, AlertTriangle, Wrench, ChevronLeft, Upload, Shield
} from 'lucide-react'

interface CapturedZoneData {
  zone_id: string
  zone_name: string
  photos: string[]
  voice_transcript: string
  ai_result: ZoneConditionResult | null
  overall_rating: 'good' | 'fair' | 'poor'
  summary: string
  condition_items: ZoneConditionResult['condition_items']
  new_damage: ZoneConditionResult['new_damage']
  maintenance_items: ZoneConditionResult['maintenance_items']
  completed_at: string
}

function PhotoCapture({
  photos,
  onAdd,
  onRemove,
}: {
  photos: string[]
  onAdd: (url: string) => void
  onRemove: (i: number) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        if (ev.target?.result) onAdd(ev.target.result as string)
      }
      reader.readAsDataURL(file)
    })
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {photos.map((p, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-surface-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}
        {photos.length < 4 && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-surface-border hover:border-amber-400/50 flex flex-col items-center justify-center gap-1 transition-colors"
          >
            <Camera className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Add photo</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

function VoiceRecorder({
  onTranscript,
  transcript,
}: {
  onTranscript: (t: string) => void
  transcript: string
}) {
  const [recording, setRecording] = useState(false)
  const [processing, setProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        setProcessing(true)
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const reader = new FileReader()
        reader.onload = async ev => {
          const base64 = (ev.target?.result as string).split(',')[1]
          try {
            const res = await fetch('/api/ai/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audio: base64 }),
            })
            const { transcript: t } = await res.json()
            onTranscript(t || '')
          } catch {
            // If transcription fails, let the user type instead
          }
          setProcessing(false)
        }
        reader.readAsDataURL(blob)
      }

      mediaRecorder.start()
      setRecording(true)
    } catch {
      alert('Microphone access required for voice recording.')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={processing}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
            recording
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-surface-light hover:bg-surface-border border border-surface-border text-white'
          } disabled:opacity-50`}
        >
          {processing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Transcribing...</>
          ) : recording ? (
            <><Square className="w-4 h-4" /> Stop Recording</>
          ) : (
            <><Mic className="w-4 h-4" /> Record Observations</>
          )}
        </button>
        {recording && (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 text-sm">Recording...</span>
          </div>
        )}
      </div>
      <textarea
        value={transcript}
        onChange={e => onTranscript(e.target.value)}
        placeholder="Or type your observations here... (e.g. 'Bar top looks clean, one stool has a cracked vinyl seat')"
        className="w-full bg-navy-700 border border-surface-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none h-24"
      />
    </div>
  )
}

function AIResultEditor({
  result,
  onChange,
}: {
  result: ZoneConditionResult
  onChange: (r: ZoneConditionResult) => void
}) {
  const ratingColors: Record<string, string> = {
    good: 'border-green-500 bg-green-500/10 text-green-400',
    fair: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
    poor: 'border-red-500 bg-red-500/10 text-red-400',
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Overall rating:</span>
        {(['good', 'fair', 'poor'] as const).map(r => (
          <button
            key={r}
            onClick={() => onChange({ ...result, overall_rating: r })}
            className={`px-3 py-1 rounded-full text-xs font-bold border capitalize transition-colors ${
              result.overall_rating === r ? ratingColors[r] : 'border-surface-border text-gray-500 hover:text-white'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-2 italic">&ldquo;{result.summary}&rdquo;</p>
      </div>

      {result.condition_items.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            <Check className="w-3.5 h-3.5" /> Observations ({result.condition_items.length})
          </div>
          <div className="space-y-1.5">
            {result.condition_items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                  item.severity === 'urgent' ? 'bg-red-400' : item.severity === 'attention' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span className="text-gray-300">{item.item}</span>
                <span className={`text-xs shrink-0 ml-auto ${
                  item.severity === 'urgent' ? 'text-red-400' : item.severity === 'attention' ? 'text-yellow-400' : 'text-green-400'
                }`}>{item.severity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.new_damage.length > 0 && (
        <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">
            <AlertTriangle className="w-3.5 h-3.5" /> New Damage Flagged
          </div>
          <div className="space-y-1.5">
            {result.new_damage.map((dmg, i) => (
              <div key={i} className="text-sm text-red-300">
                • {dmg.description} <span className="text-red-500 text-xs">[{dmg.severity}]</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.maintenance_items.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 uppercase tracking-wide mb-2">
            <Wrench className="w-3.5 h-3.5" /> Maintenance Items
          </div>
          <div className="space-y-1.5">
            {result.maintenance_items.map((m, i) => (
              <div key={i} className="text-sm text-yellow-300">
                • {m.description} <span className="text-yellow-500 text-xs">[{m.priority}]</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WalkthroughPage() {
  const router = useRouter()
  const [location, setLocation] = useState<Location | null>(null)
  const [zones, setZones] = useState<Zone[]>([])
  const [step, setStep] = useState<'setup' | 'zone' | 'complete'>('setup')
  const [currentZoneIdx, setCurrentZoneIdx] = useState(0)
  const [reportType, setReportType] = useState<'closing' | 'opening'>('closing')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [photos, setPhotos] = useState<string[]>([])
  const [transcript, setTranscript] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<ZoneConditionResult | null>(null)
  const [completedZones, setCompletedZones] = useState<CapturedZoneData[]>([])

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
        .limit(1)

      if (!locs || locs.length === 0) { router.push('/dashboard/onboarding'); return }
      setLocation(locs[0] as Location)

      const { data: z } = await supabase
        .from('shiftproof_zones')
        .select('*')
        .eq('location_id', locs[0].id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      setZones((z || []) as Zone[])
      setLoading(false)
    }
    load()
  }, [router])

  const currentZone = zones[currentZoneIdx]

  function resetZoneState() {
    setPhotos([])
    setTranscript('')
    setAiResult(null)
  }

  async function analyzeZone() {
    if (!transcript.trim()) {
      alert('Please add observations by recording or typing before analyzing.')
      return
    }
    setAnalyzing(true)
    try {
      const res = await fetch('/api/ai/structure-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneName: currentZone.name, transcript }),
      })
      const data = await res.json()
      setAiResult(data)
    } catch {
      // Fallback: create a simple result
      setAiResult({
        condition_items: [{ item: transcript, severity: 'normal', is_preexisting: false, notes: '' }],
        new_damage: [],
        maintenance_items: [],
        overall_rating: 'good',
        summary: transcript,
      })
    }
    setAnalyzing(false)
  }

  function completeZone() {
    if (!aiResult) return
    const zoneData: CapturedZoneData = {
      zone_id: currentZone.id,
      zone_name: currentZone.name,
      photos,
      voice_transcript: transcript,
      ai_result: aiResult,
      overall_rating: aiResult.overall_rating,
      summary: aiResult.summary,
      condition_items: aiResult.condition_items,
      new_damage: aiResult.new_damage,
      maintenance_items: aiResult.maintenance_items,
      completed_at: new Date().toISOString(),
    }

    const updated = [...completedZones]
    const existingIdx = updated.findIndex(z => z.zone_id === currentZone.id)
    if (existingIdx >= 0) updated[existingIdx] = zoneData
    else updated.push(zoneData)
    setCompletedZones(updated)

    if (currentZoneIdx < zones.length - 1) {
      setCurrentZoneIdx(currentZoneIdx + 1)
      resetZoneState()
    } else {
      setStep('complete')
    }
  }

  async function saveReport() {
    if (!location) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const zoneDataMap: Record<string, CapturedZoneData> = {}
      completedZones.forEach(z => { zoneDataMap[z.zone_id] = z })

      const allDamage = completedZones.flatMap(z => z.new_damage.map(d => ({
        ...d,
        zone: z.zone_name,
        date_discovered: new Date().toISOString().split('T')[0],
        status: 'open',
      })))

      const hasDamage = allDamage.length > 0

      // Calculate overall score (1-10): start at 10, deduct for poor/fair zones
      const poorCount = completedZones.filter(z => z.overall_rating === 'poor').length
      const fairCount = completedZones.filter(z => z.overall_rating === 'fair').length
      const score = Math.max(1, 10 - (poorCount * 2) - fairCount)

      // AI summary
      const ratingCounts = { good: 0, fair: 0, poor: 0 }
      completedZones.forEach(z => ratingCounts[z.overall_rating]++)
      const summaryText = `${completedZones.length}-zone ${reportType} walkthrough. ${ratingCounts.good} zones good, ${ratingCounts.fair} fair, ${ratingCounts.poor} poor. ${hasDamage ? `${allDamage.length} new damage items flagged.` : 'No new damage detected.'}`

      const today = new Date().toISOString().split('T')[0]

      const { data: report, error } = await supabase
        .from('shiftproof_reports')
        .insert({
          location_id: location.id,
          user_id: user.id,
          report_type: reportType,
          status: 'submitted',
          shift_date: today,
          completed_at: new Date().toISOString(),
          zone_data: zoneDataMap,
          photos: completedZones.flatMap(z => z.photos),
          ai_summary: summaryText,
          damage_flagged: hasDamage,
          damage_details: allDamage,
          overall_score: score,
        })
        .select()
        .single()

      if (error) throw error
      router.push(`/dashboard/reports/${report.id}`)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save report')
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
    </div>
  )

  // Setup step
  if (step === 'setup') {
    return (
      <div className="p-4 md:p-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-2">Start Walkthrough</h1>
        <p className="text-gray-400 text-sm mb-6">
          {location?.name} · {zones.length} zones
        </p>
        <div className="bg-surface rounded-xl border border-surface-border p-6 mb-6">
          <h3 className="font-semibold mb-4">Walkthrough type</h3>
          <div className="grid grid-cols-2 gap-3">
            {(['closing', 'opening'] as const).map(t => (
              <button
                key={t}
                onClick={() => setReportType(t)}
                className={`py-3 rounded-xl border font-medium text-sm capitalize transition-colors ${reportType === t ? 'border-amber-400 bg-amber-400/10 text-amber-400' : 'border-surface-border text-gray-400 hover:text-white hover:border-gray-500'}`}
              >
                {t} walkthrough
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {zones.map((z, i) => (
            <div key={z.id} className="flex items-center gap-3 py-2 px-4 rounded-lg bg-surface border border-surface-border">
              <span className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center text-xs text-gray-400 font-bold">{i + 1}</span>
              <span className="text-sm text-white">{z.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStep('zone')}
          className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-4 rounded-xl transition-colors text-lg"
        >
          <Play className="w-5 h-5" /> Start Walkthrough
        </button>
      </div>
    )
  }

  // Complete step
  if (step === 'complete') {
    const ratingCounts = { good: 0, fair: 0, poor: 0 }
    completedZones.forEach(z => ratingCounts[z.overall_rating]++)
    const totalDamage = completedZones.reduce((acc, z) => acc + z.new_damage.length, 0)
    const totalMaintenance = completedZones.reduce((acc, z) => acc + z.maintenance_items.length, 0)

    return (
      <div className="p-4 md:p-8 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Walkthrough Complete</h1>
        <p className="text-gray-400 text-sm mb-8">{completedZones.length} zones documented</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-900/30 border border-green-700/40 rounded-xl p-4">
            <div className="text-2xl font-black text-green-400">{ratingCounts.good}</div>
            <div className="text-green-300 text-xs mt-1">Good</div>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700/40 rounded-xl p-4">
            <div className="text-2xl font-black text-yellow-400">{ratingCounts.fair}</div>
            <div className="text-yellow-300 text-xs mt-1">Fair</div>
          </div>
          <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-4">
            <div className="text-2xl font-black text-red-400">{ratingCounts.poor}</div>
            <div className="text-red-300 text-xs mt-1">Poor</div>
          </div>
        </div>
        {totalDamage > 0 && (
          <div className="bg-red-900/20 border border-red-700/40 rounded-xl p-4 mb-4 text-left">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-1">
              <AlertTriangle className="w-4 h-4" /> {totalDamage} new damage item{totalDamage > 1 ? 's' : ''} flagged
            </div>
            <p className="text-red-300 text-xs">Added to your damage log</p>
          </div>
        )}
        {totalMaintenance > 0 && (
          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm mb-1">
              <Wrench className="w-4 h-4" /> {totalMaintenance} maintenance item{totalMaintenance > 1 ? 's' : ''} noted
            </div>
          </div>
        )}
        <button
          onClick={saveReport}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-4 rounded-xl transition-colors text-lg disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {saving ? 'Saving Report...' : 'Save Report'}
        </button>
      </div>
    )
  }

  // Zone walkthrough step

  return (
    <div className="p-4 max-w-lg mx-auto pb-8">
      {/* Progress bar */}
      <div className="flex gap-1 mb-4">
        {zones.map((z, i) => {
          const done = completedZones.some(cz => cz.zone_id === z.id)
          const current = i === currentZoneIdx
          return (
            <div
              key={z.id}
              className={`flex-1 h-1.5 rounded-full transition-all ${done ? 'bg-amber-400' : current ? 'bg-amber-400/50' : 'bg-surface-border'}`}
            />
          )
        })}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            if (currentZoneIdx > 0) {
              setCurrentZoneIdx(currentZoneIdx - 1)
              resetZoneState()
            } else {
              setStep('setup')
            }
          }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Zone {currentZoneIdx + 1} of {zones.length}</div>
          <h2 className="text-lg font-bold">{currentZone?.name}</h2>
        </div>
        <div className="w-5" />
      </div>

      {/* Checkpoints */}
      {currentZone?.checklist_items && currentZone.checklist_items.length > 0 && (
        <div className="bg-navy-900/50 rounded-xl border border-surface-border p-4 mb-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Inspect these areas:</p>
          <div className="flex flex-wrap gap-1.5">
            {currentZone.checklist_items.slice(0, 6).map((cp, i) => (
              <span key={i} className="text-xs bg-navy-700 text-gray-400 px-2 py-1 rounded">
                {cp}
              </span>
            ))}
            {currentZone.checklist_items.length > 6 && (
              <span className="text-xs text-gray-600">+{currentZone.checklist_items.length - 6} more</span>
            )}
          </div>
        </div>
      )}

      {/* Photos */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 mb-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Camera className="w-4 h-4 text-amber-400" />
          Photos ({photos.length}/4)
        </h3>
        <PhotoCapture
          photos={photos}
          onAdd={url => setPhotos([...photos, url])}
          onRemove={i => setPhotos(photos.filter((_, idx) => idx !== i))}
        />
      </div>

      {/* Voice / text */}
      <div className="bg-surface rounded-xl border border-surface-border p-4 mb-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Mic className="w-4 h-4 text-amber-400" />
          Observations
        </h3>
        <VoiceRecorder transcript={transcript} onTranscript={setTranscript} />
      </div>

      {/* Analyze button */}
      {!aiResult && (
        <button
          onClick={analyzeZone}
          disabled={analyzing || !transcript.trim()}
          className="w-full flex items-center justify-center gap-2 bg-surface-light hover:bg-surface-border border border-surface-border text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 mb-4"
        >
          {analyzing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing with AI...</>
          ) : (
            <><Shield className="w-4 h-4 text-amber-400" /> Analyze with AI</>
          )}
        </button>
      )}

      {/* AI result review */}
      {aiResult && (
        <div className="bg-surface rounded-xl border border-surface-border p-4 mb-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            AI Analysis — Review & Edit
          </h3>
          <AIResultEditor result={aiResult} onChange={setAiResult} />
        </div>
      )}

      {/* Next zone button */}
      <button
        onClick={completeZone}
        disabled={!aiResult}
        className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-4 rounded-xl transition-colors disabled:opacity-50 text-lg"
      >
        {currentZoneIdx === zones.length - 1 ? (
          <><Check className="w-5 h-5" /> Finish Walkthrough</>
        ) : (
          <>Next Zone <ChevronRight className="w-5 h-5" /></>
        )}
      </button>

      {!aiResult && transcript.trim() && (
        <p className="text-center text-gray-500 text-xs mt-3">
          Tap &ldquo;Analyze with AI&rdquo; first to structure your observations
        </p>
      )}
    </div>
  )
}
