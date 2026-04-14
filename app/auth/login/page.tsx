'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Shield, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-amber-400" />
            <span className="text-2xl font-bold">ShiftProof</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back</p>
        </div>
        <div className="bg-surface rounded-2xl border border-surface-border p-8">
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-amber-400 hover:text-amber-300">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign in
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-amber-400 hover:text-amber-300 font-medium">
              Start free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
