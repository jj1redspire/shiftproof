import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-800">
      {/* Nav */}
      <nav className="border-b border-surface-border bg-navy-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-bold text-white">ShiftProof</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-300 hover:text-white text-sm transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="bg-amber-400 hover:bg-amber-500 text-navy-900 font-bold text-sm py-2 px-5 rounded-lg transition-colors">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: April 17, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Overview</h2>
            <p>
              Ashward Group LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates ShiftProof at shiftproof.io.
              This Privacy Policy explains how we collect, use, store, and share information when you
              use the ShiftProof service (&ldquo;Service&rdquo;). By using the Service, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>

            <h3 className="text-base font-semibold text-white mt-4 mb-2">Account Information</h3>
            <p>
              When you create an account, we collect your email address and any profile information you
              provide (such as business name and location name). This information is required to create
              and maintain your account and to send you service-related communications.
            </p>

            <h3 className="text-base font-semibold text-white mt-4 mb-2">Facility Inspection Data</h3>
            <p>
              The core function of ShiftProof is to store your facility condition documentation. This
              includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Photos you upload during walkthroughs (including any embedded EXIF metadata)</li>
              <li>Voice recordings you make during walkthroughs</li>
              <li>Transcriptions of your voice recordings, generated via our AI transcription service</li>
              <li>AI-structured condition reports generated from your inputs</li>
              <li>Damage log entries, including notes and photos</li>
              <li>Zone configurations and walkthrough history</li>
              <li>Timestamps and date records for all submissions</li>
            </ul>

            <h3 className="text-base font-semibold text-white mt-4 mb-2">Payment Information</h3>
            <p>
              Payment processing is handled by Stripe. We do not store your full credit card number or
              payment card details on our servers. We receive limited payment metadata from Stripe (such
              as last four digits and expiration date) for billing management purposes.
            </p>

            <h3 className="text-base font-semibold text-white mt-4 mb-2">Usage Data</h3>
            <p>
              We may collect information about how you interact with the Service, including pages visited,
              features used, and actions taken. This data is used to improve the Service and diagnose
              technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Provide, operate, and maintain the Service</li>
              <li>Process your voice recordings through AI transcription and generate structured condition reports</li>
              <li>Analyze your condition data using AI to identify damage, flag issues, and generate report summaries</li>
              <li>Generate and deliver PDF export packages you request</li>
              <li>Process payments and manage your subscription</li>
              <li>Send you transactional emails (account confirmations, billing receipts, service notices)</li>
              <li>Respond to your support requests</li>
              <li>Improve and develop new features for the Service</li>
              <li>Enforce our Terms of Service and protect the security of the Service</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information or facility inspection data to third parties.
              We do not use your facility data for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p>
              ShiftProof relies on the following third-party services to operate. Each has its own
              privacy policy governing how they handle data:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-3">
              <li>
                <strong className="text-white">Supabase</strong> — Database and authentication infrastructure.
                Your account data, facility data, and uploaded content are stored in Supabase-hosted
                PostgreSQL databases. Supabase Privacy Policy:{' '}
                <a href="https://supabase.com/privacy" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                  supabase.com/privacy
                </a>
              </li>
              <li>
                <strong className="text-white">Stripe</strong> — Payment processing. Stripe handles all
                credit card transactions. We do not store payment card data. Stripe Privacy Policy:{' '}
                <a href="https://stripe.com/privacy" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                  stripe.com/privacy
                </a>
              </li>
              <li>
                <strong className="text-white">OpenAI (Whisper)</strong> — Audio transcription. Voice
                recordings you submit are sent to OpenAI&apos;s Whisper API for transcription. Audio data
                is processed according to OpenAI&apos;s API data usage policy. OpenAI Privacy Policy:{' '}
                <a href="https://openai.com/privacy" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                  openai.com/privacy
                </a>
              </li>
              <li>
                <strong className="text-white">Anthropic (Claude)</strong> — AI report generation.
                Transcribed observations are sent to Anthropic&apos;s API to generate structured condition
                reports. Anthropic Privacy Policy:{' '}
                <a href="https://www.anthropic.com/privacy" className="text-amber-400 hover:text-amber-300" target="_blank" rel="noopener noreferrer">
                  anthropic.com/privacy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your account information and facility data for as long as your account is active.
              If you cancel your subscription, your data is retained for 90 days, during which you can
              export all reports as PDFs. After 90 days, your data may be permanently deleted.
            </p>
            <p className="mt-3">
              You may request deletion of your account and associated data at any time by contacting us
              at{' '}
              <a href="mailto:joel@ashwardgroup.com" className="text-amber-400 hover:text-amber-300">
                joel@ashwardgroup.com
              </a>
              . We will process deletion requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including encrypted
              connections (HTTPS/TLS), row-level security policies in our database, and access controls
              that restrict data access to authorized users only.
            </p>
            <p className="mt-3">
              No method of transmission over the internet or electronic storage is 100% secure. While we
              take reasonable precautions, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Export your facility condition reports at any time in PDF format</li>
              <li>Correct inaccurate account information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of non-transactional email communications</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:joel@ashwardgroup.com" className="text-amber-400 hover:text-amber-300">
                joel@ashwardgroup.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>
              ShiftProof is intended for use by businesses and is not directed at individuals under the
              age of 18. We do not knowingly collect personal information from minors. If you believe
              we have inadvertently collected such information, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will
              notify you via email or through a notice in the Service. The date at the top of this policy
              indicates when it was last updated. Continued use of the Service after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
            <p>
              Questions about this Privacy Policy? Contact us at{' '}
              <a href="mailto:joel@ashwardgroup.com" className="text-amber-400 hover:text-amber-300">
                joel@ashwardgroup.com
              </a>
              .
            </p>
            <p className="mt-2">
              <strong className="text-white">Ashward Group LLC</strong><br />
              Oregon, United States
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white">ShiftProof</span>
            <span>© 2026. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <a href="mailto:joel@ashwardgroup.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
