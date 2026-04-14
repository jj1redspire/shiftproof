'use client'
import { useState } from 'react'
import { FileText, Shield, Gavel, Download, Loader2, AlertTriangle } from 'lucide-react'

const packages = [
  {
    id: 'lease',
    title: 'Lease Defense Package',
    icon: Shield,
    description: 'All daily condition reports for a date range, formatted as a lease-condition document. Use when disputing damage claims at lease end.',
    color: 'border-blue-500/30 bg-blue-500/5',
    iconColor: 'text-blue-400',
  },
  {
    id: 'insurance',
    title: 'Insurance Claim Evidence',
    icon: FileText,
    description: 'Reports showing facility condition before and after an incident. Proves pre-existing condition and date of damage occurrence.',
    color: 'border-amber-500/30 bg-amber-500/5',
    iconColor: 'text-amber-400',
  },
  {
    id: 'slipfall',
    title: 'Slip-and-Fall Defense',
    icon: Gavel,
    description: "The facility condition report for a specific date showing the space was in good condition at the time of an alleged incident.",
    color: 'border-red-500/30 bg-red-500/5',
    iconColor: 'text-red-400',
  },
]

export default function ExportPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  async function handleExport(packageId: string) {
    if (!startDate) { alert('Please select a start date'); return }
    setLoading(packageId)
    try {
      const res = await fetch('/api/reports/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageType: packageId, startDate, endDate: endDate || startDate }),
      })
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `shiftproof-${packageId}-${startDate}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      alert('Export failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Export Evidence Packages</h1>
        <p className="text-gray-400 text-sm mt-1">Generate formatted PDF documentation packages for legal, insurance, or lease disputes.</p>
      </div>

      {/* Date range */}
      <div className="bg-surface rounded-xl border border-surface-border p-5 mb-8">
        <h3 className="font-semibold mb-4">Select Date Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">End date <span className="text-gray-600">(optional)</span></label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 transition-colors text-sm"
            />
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="space-y-4">
        {packages.map(pkg => (
          <div key={pkg.id} className={`border rounded-xl p-5 ${pkg.color}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <pkg.icon className={`w-8 h-8 shrink-0 mt-0.5 ${pkg.iconColor}`} />
                <div>
                  <h3 className="font-bold text-white mb-1">{pkg.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{pkg.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleExport(pkg.id)}
                disabled={!!loading}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-4 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 shrink-0"
              >
                {loading === pkg.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-navy-700 border border-surface-border rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-gray-400 text-sm">
            All exports include a <strong className="text-white">&ldquo;This report was generated by ShiftProof daily condition documentation system&rdquo;</strong> footer with timestamp and report IDs for legal credibility.
          </p>
        </div>
      </div>
    </div>
  )
}
