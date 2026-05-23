import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, CreditCard, RefreshCcw, ChevronDown, Check } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import PricingCards from '../components/PricingCards.jsx'
import { TOOLS } from '../lib/tools.js'

// ─── Data ───────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: Users, text: 'Built for Nigerian businesses' },
  { icon: CreditCard, text: 'No credit card required' },
  { icon: Zap, text: 'All 8 tools, instant access' },
  { icon: RefreshCcw, text: 'Cancel any time' },
]

const STEPS = [
  {
    number: '01',
    title: 'Create a free account',
    desc: 'Sign up in 30 seconds. No payment details needed. All eight tools are available from day one.',
  },
  {
    number: '02',
    title: 'Choose your tool',
    desc: 'Pick from eight AI tools built for the Nigerian market. Content writing, coaching, invoicing, and more.',
  },
  {
    number: '03',
    title: 'Get results in seconds',
    desc: 'Fill in your details, generate, and copy your output. Put it to work immediately.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What is Kreva AI?',
    a: 'Kreva AI is a subscription platform that gives Nigerian business owners access to eight AI-powered tools: content writing, business coaching, invoicing, customer replies, logo concepts, and more. All in one place.',
  },
  {
    q: 'Do I need a credit card to get started?',
    a: 'No. The free plan requires no payment details. You get five AI requests per day across all eight tools at no cost. Upgrade only when you need more.',
  },
  {
    q: 'Which payment methods are supported?',
    a: 'Payments are processed by Paystack, which supports Nigerian debit cards, bank transfers, and USSD. All amounts are in naira.',
  },
  {
    q: 'What happens when I reach my request limit?',
    a: 'Free users get five requests per day. Once the limit is reached, you can upgrade to a paid plan or wait for the reset at midnight. Starter and Pro users have monthly allowances.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. Cancel from your account settings at any time. Your access continues until the end of the current billing period with no additional charges.',
  },
  {
    q: 'Does Kreva AI work on mobile?',
    a: 'Yes. Kreva AI is a Progressive Web App. On Android, open it in Chrome and tap "Add to Home Screen." On iPhone, open it in Safari, tap Share, then "Add to Home Screen." It installs like a native app with no app store needed.',
  },
  {
    q: 'Are my inputs and outputs private?',
    a: 'Yes. Your data is stored only in your account history and is never used to train AI models. You can delete your history at any time from the History page.',
  },
]

// ─── Dashboard preview (hero visual) ─────────────────────────────────────────

function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto">
      <div
        className="absolute -inset-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(91,110,245,0.08) 0%, transparent 68%)',
        }}
      />
      <div className="relative bg-surface border border-border rounded-[10px] shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-raised border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-danger/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
          </div>
          <div className="ml-2 max-w-[140px] w-full bg-surface border border-border rounded-[4px] px-2.5 py-1">
            <span className="text-[10px] font-mono text-muted">app.krevaai.com</span>
          </div>
        </div>

        {/* App layout */}
        <div className="flex" style={{ height: '264px' }}>
          {/* Sidebar */}
          <div className="w-36 bg-surface border-r border-border flex flex-col p-2 shrink-0">
            <div className="px-2 py-2 mb-1">
              <span className="text-[11px] font-heading font-bold text-foreground">Kreva AI</span>
            </div>
            {[
              { label: 'Dashboard', active: false },
              { label: 'Tools', active: true },
              { label: 'History', active: false },
              { label: 'Account', active: false },
            ].map(({ label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-[4px] mb-0.5 border ${
                  active
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'text-muted border-transparent'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    active ? 'bg-primary' : 'bg-border'
                  }`}
                />
                <span className="text-[10px] font-medium">{label}</span>
              </div>
            ))}

            <div className="mt-auto space-y-1.5">
              <div className="px-2 py-1.5 bg-primary/10 border border-primary/20 rounded-[4px]">
                <span className="text-[9px] text-primary font-medium">Upgrade to Pro</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-[7px] font-mono font-medium text-primary">AO</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] text-foreground font-medium truncate">Free Plan</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="text-[11px] font-heading font-bold text-foreground mb-3">
              Content Writer
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Input panel */}
              <div className="space-y-1.5">
                <div className="h-5 bg-surface-raised border border-border rounded-[4px]" />
                <div className="h-5 bg-surface-raised border border-border rounded-[4px]" />
                <div className="h-16 bg-surface-raised border border-border rounded-[4px]" />
                <div className="h-5 bg-surface-raised border border-border rounded-[4px]" />
                <div className="h-6 bg-primary rounded-[4px] flex items-center justify-center">
                  <div className="w-10 h-1.5 bg-white/25 rounded-full" />
                </div>
              </div>
              {/* Output panel */}
              <div className="bg-surface-raised border border-border rounded-[6px] p-2.5 space-y-1.5">
                {[100, 88, 100, 72, 95, 58, 82, 100, 65, 90].map((w, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full bg-foreground/10"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────

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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 px-5 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '1000px',
            height: '460px',
            background:
              'radial-gradient(ellipse at center top, rgba(91,110,245,0.09) 0%, transparent 68%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-badge text-xs text-primary font-medium mb-7">
                <Zap size={11} strokeWidth={2} />
                8 AI tools in one subscription
              </div>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground tracking-heading leading-[1.08] mb-5">
                Eight AI tools built for Nigerian business
              </h1>
              <p className="text-muted text-base leading-relaxed mb-8">
                Content writing, business coaching, invoicing, customer replies, and more. All in
                one subscription. Start free, no credit card required.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/signup" className="btn-primary px-6 py-2.5">
                  Get Started Free
                </Link>
                <Link to="/pricing" className="btn-outline px-6 py-2.5">
                  See All Tools
                  <ArrowRight size={14} strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <div className="border-y border-border py-5">
        <div className="max-w-4xl mx-auto px-5">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted">
                <Icon size={13} strokeWidth={1.75} className="text-primary" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="tools" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-3xl mb-3">Eight tools for your business</h2>
            <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
              Every tool is built for the Nigerian market. The language, the context, and the
              realities of doing business here.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TOOLS.map((tool) => {
              const Icon = tool.icon
              return (
                <Link key={tool.slug} to="/pricing" className="card-hover p-5 group block">
                  <div className="w-8 h-8 rounded-card bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-200">
                    <Icon size={15} className="text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1.5">{tool.name}</div>
                  <p className="text-xs text-muted leading-relaxed">{tool.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-5 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-3xl mb-3">How it works</h2>
            <p className="text-muted text-sm">Get your first AI result in under two minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((step) => (
              <div key={step.number} className="card p-6">
                <div className="font-mono text-xs text-primary mb-4">{step.number}</div>
                <div className="text-sm font-medium text-foreground mb-2">{step.title}</div>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-5 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading text-3xl mb-3">Simple, transparent pricing</h2>
            <p className="text-muted text-sm">Start free. Upgrade when you are ready.</p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-heading text-3xl text-center mb-10">
            Frequently asked questions
          </h2>
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
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <span className="font-heading font-extrabold text-base text-foreground tracking-heading">
              Kreva AI
            </span>
            <p className="text-xs text-muted mt-1">Built by BrightSheld Technologies</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted">
            <a href="#tools" className="hover:text-foreground transition-colors duration-200">
              Features
            </a>
            <Link to="/pricing" className="hover:text-foreground transition-colors duration-200">
              Pricing
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
