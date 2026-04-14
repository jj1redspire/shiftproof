'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Shield, Loader2, CheckCircle } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { business_name: businessName } },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-400 mb-6">We sent a confirmation link to <strong className="text-white">{email}</strong>. Click it to activate your account and start your 14-day free trial.</p>
          <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 text-sm">Back to sign in</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-bold">ShiftProof</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Start your free trial</h1>
          <p className="text-gray-400 text-sm mt-1">14 days free. No credit card required.</p>
        </div>
        <div className="bg-surface rounded-2xl border border-surface-border p-8">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Business name</label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                required
                className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="The Rusty Nail Bar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="you@yourbar.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full bg-navy-700 border border-surface-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create account
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-amber-400 hover:text-amber-300 font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
