'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  Shield, LayoutDashboard, Play, AlertTriangle,
  Download, MapPin, Settings, CreditCard, LogOut, Menu, X
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Timeline' },
  { href: '/dashboard/walkthrough', icon: Play, label: 'Start Walkthrough' },
  { href: '/dashboard/damage', icon: AlertTriangle, label: 'Damage Log' },
  { href: '/dashboard/export', icon: Download, label: 'Export' },
  { href: '/dashboard/locations', icon: MapPin, label: 'Locations & Zones' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-60'}`}>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-surface-border">
        <Shield className="w-6 h-6 text-amber-400" />
        <span className="text-lg font-bold">ShiftProof</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                  : 'text-gray-400 hover:text-white hover:bg-surface-light'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-surface-border">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-surface-light w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-navy-800 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-navy-900 border-r border-surface-border shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-navy-900 border-r border-surface-border flex flex-col">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-400" />
                <span className="font-bold">ShiftProof</span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <Sidebar mobile />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-navy-900 border-b border-surface-border shrink-0">
          <button onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold">ShiftProof</span>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
