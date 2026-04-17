import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function TermsPage() {
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
        <h1 className="text-4xl font-extrabold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: April 17, 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-gray-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using ShiftProof (&ldquo;the Service&rdquo;), a product of Ashward Group LLC
              (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by
              these Terms of Service (&ldquo;Terms&rdquo;). If you are using the Service on behalf of a business,
              you represent that you have authority to bind that business to these Terms.
            </p>
            <p className="mt-3">
              If you do not agree to these Terms, do not access or use the Service. We may update these
              Terms from time to time. Continued use of the Service after changes constitutes acceptance
              of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
            <p>
              ShiftProof is a daily facility condition documentation platform that enables businesses
              to record, store, and export timestamped photo and AI-structured condition reports for
              their physical locations. The Service is available at shiftproof.io and through any
              associated mobile web interface.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Accounts and Registration</h2>
            <p>
              You must create an account to use the Service. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity that occurs under your
              account. You must provide accurate and complete information during registration and keep
              that information current.
            </p>
            <p className="mt-3">
              You may not share your account credentials with others or use another person&apos;s account.
              Notify us immediately at{' '}
              <a href="mailto:joel@ashwardgroup.com" className="text-amber-400 hover:text-amber-300">
                joel@ashwardgroup.com
              </a>{' '}
              if you suspect unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Subscription and Billing</h2>
            <p>
              ShiftProof is offered on a subscription basis. By subscribing to a paid plan, you authorize
              Ashward Group LLC to charge your payment method on a monthly basis at the rate displayed
              at the time of purchase.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>
                <strong className="text-white">Auto-renewal:</strong> Subscriptions automatically renew
                each month unless cancelled before the renewal date.
              </li>
              <li>
                <strong className="text-white">Free trial:</strong> New accounts receive a 14-day free
                trial. No charge is made until the trial period ends. You may cancel at any time during
                the trial without being charged.
              </li>
              <li>
                <strong className="text-white">No refunds:</strong> All subscription fees are
                non-refundable. If you cancel your subscription, you retain access through the end of
                your current billing period. No partial-month refunds are issued.
              </li>
              <li>
                <strong className="text-white">Price changes:</strong> We reserve the right to change
                subscription pricing. We will provide at least 30 days&apos; notice before any price
                increase takes effect for existing subscribers.
              </li>
              <li>
                <strong className="text-white">Failed payments:</strong> If a payment fails, we may
                suspend access to the Service until payment is resolved. We will attempt to notify you
                via email before suspension.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Upload, store, or transmit any content that is unlawful, defamatory, obscene, or that infringes any third-party intellectual property rights</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure</li>
              <li>Use automated scripts, bots, or scrapers to access the Service without prior written permission</li>
              <li>Resell, sublicense, or commercially exploit the Service without our written authorization</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Use the Service in any way that violates applicable local, state, national, or international law</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts that violate these prohibited use
              provisions without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Your Content</h2>
            <p>
              You retain ownership of all content you upload to the Service, including photos, voice
              recordings, and text observations (&ldquo;Your Content&rdquo;). By uploading content, you grant
              Ashward Group LLC a limited, non-exclusive license to store, process, and display Your
              Content solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-3">
              You represent that you have all necessary rights to upload Your Content and that doing so
              does not violate any third-party rights or applicable law. You are solely responsible for
              the accuracy and legality of Your Content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Intellectual Property</h2>
            <p>
              The Service, including its software, design, text, graphics, and other content created by
              Ashward Group LLC, is protected by copyright and other intellectual property laws. You may
              not copy, modify, distribute, or create derivative works from any part of the Service without
              our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that the Service will be uninterrupted, error-free, or free of viruses
              or other harmful components. ShiftProof condition reports are documentation tools only —
              we make no warranty regarding their legal sufficiency or evidentiary value in any
              particular jurisdiction or proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ASHWARD GROUP LLC SHALL NOT BE LIABLE
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT
              NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT
              OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p className="mt-3">
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE
              SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING
              THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Ashward Group LLC and its officers,
              directors, employees, and agents from and against any claims, liabilities, damages, losses,
              and expenses, including reasonable attorneys&apos; fees, arising out of or related to your use
              of the Service, Your Content, or your violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Termination</h2>
            <p>
              You may cancel your account at any time through your account settings or by contacting us
              at{' '}
              <a href="mailto:joel@ashwardgroup.com" className="text-amber-400 hover:text-amber-300">
                joel@ashwardgroup.com
              </a>
              . Upon cancellation, your access continues through the end of your current billing period.
            </p>
            <p className="mt-3">
              We reserve the right to suspend or terminate your account at any time for violation of
              these Terms or for any other reason at our discretion. Upon termination, your right to
              use the Service ceases immediately. You may export your data prior to termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">12. Governing Law and Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of
              Oregon, without regard to its conflict of law provisions. Any dispute arising out of or
              related to these Terms or the Service shall be resolved exclusively in the state or federal
              courts located in Oregon, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">13. Entire Agreement</h2>
            <p>
              These Terms, together with our{' '}
              <Link href="/privacy" className="text-amber-400 hover:text-amber-300">Privacy Policy</Link>,
              constitute the entire agreement between you and Ashward Group LLC regarding the Service
              and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">14. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
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
