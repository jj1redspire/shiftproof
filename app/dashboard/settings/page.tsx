'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Settings, Loader2, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email || '')
    })
  }, [])

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    setSuccess('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Password updated successfully')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-6 h-6 text-amber-400" />
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <div className="bg-surface rounded-xl border border-surface-border p-6 mb-6">
        <h3 className="font-semibold mb-4">Account Info</h3>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Email address</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full bg-navy-900 border border-surface-border rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed text-sm"
          />
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-surface-border p-6">
        <h3 className="font-semibold mb-4">Change Password</h3>
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-900/30 border border-green-700 text-green-300 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {success}
          </div>
        )}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Confirm new password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
