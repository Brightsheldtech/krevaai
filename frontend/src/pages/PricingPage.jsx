import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import PricingCards from '../components/PricingCards.jsx'

const FAQ_ITEMS = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. You can upgrade or downgrade from your account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.',
  },
  {
    q: 'What counts as one request?',
    a: 'Each time you generate AI output from any of the eight tools, that counts as one request. Regenerating or editing inputs and generating again counts as a new request.',
  },
  {
    q: 'Do unused requests roll over?',
    a: 'No. Free plan requests reset daily at midnight. Starter and Pro plan requests reset at the start of each monthly billing cycle.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'If you are not satisfied within the first 7 days of a paid plan, contact us and we will process a full refund. After 7 days, subscriptions are non-refundable but you can cancel to stop future charges.',
  },
  {
    q: 'What is API access on the Pro plan?',
    a: 'API access will allow developers to call Kreva AI tools programmatically from their own applications. This feature is coming soon and will be included in the Pro plan at no additional cost.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left gap-6 group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
          {question}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={1.75}
          className={`text-muted shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm text-muted leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <div className="pt-28 pb-20 px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground tracking-heading mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-muted text-base max-w-sm mx-auto leading-relaxed">
              Start free with no credit card. Upgrade when you need more.
            </p>
          </div>

          {/* Plan cards */}
          <PricingCards />

          {/* Feature comparison note */}
          <div className="mt-10 max-w-2xl mx-auto card p-6">
            <div className="text-xs font-medium text-muted uppercase tracking-widest mb-4">
              All plans include
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Access to all 8 AI tools',
                'Nigerian-market focused outputs',
                'Mobile-friendly PWA',
                'Secure Supabase auth',
                'Request history',
                'Naira pricing via Paystack',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h2 className="section-heading text-2xl text-center mb-8">Pricing questions</h2>
            <div className="card">
              <div className="px-6">
                {FAQ_ITEMS.map((item, i) => (
                  <FAQItem
                    key={i}
                    question={item.q}
                    answer={item.a}
                    isOpen={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-sm text-muted mb-4">
              Still have questions? Start free and explore all eight tools.
            </p>
            <Link to="/signup" className="btn-primary px-8 py-3 text-base">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="font-heading font-extrabold text-base text-foreground tracking-heading"
          >
            Kreva AI
          </Link>
          <div className="flex items-center gap-6 text-xs text-muted">
            <Link to="/#tools" className="hover:text-foreground transition-colors duration-200">
              Features
            </Link>
            <Link to="/login" className="hover:text-foreground transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-foreground transition-colors duration-200">
              Sign Up
            </Link>
          </div>
          <p className="text-xs text-muted">{new Date().getFullYear()} Kreva AI</p>
        </div>
      </footer>
    </div>
  )
}
