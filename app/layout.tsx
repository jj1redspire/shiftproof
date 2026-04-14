import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ShiftProof — Daily Facility Condition Documentation',
  description: "Protect your bar's lease deposit and insurance claims with daily AI-powered facility condition reports.",
  keywords: 'bar documentation, facility condition report, lease dispute, insurance claim, nightclub maintenance log',
  openGraph: {
    title: 'ShiftProof — Document. Protect. Prove.',
    description: 'Your bar takes damage every night. Do you have proof?',
    type: 'website',
    url: 'https://shiftproof.io',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-navy-800 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
