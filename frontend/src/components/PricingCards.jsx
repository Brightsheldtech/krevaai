import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 'NGN 0',
    period: 'forever',
    tagline: 'Try all eight tools with no credit card.',
    features: [
      'Access to all 8 tools',
      '5 requests per day',
      'No credit card required',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    highlight: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 'NGN 3,500',
    period: 'per month',
    tagline: 'For business owners who use AI regularly.',
    features: [
      'Access to all 8 tools',
      '200 requests per month',
      'History saved for 30 days',
      'Priority support',
    ],
    cta: 'Get Starter',
    href: '/signup?plan=starter',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'NGN 8,000',
    period: 'per month',
    tagline: 'For serious entrepreneurs who run on AI.',
    features: [
      'Everything in Starter',
      'Unlimited requests',
      'Priority speed',
      'Full request history',
      'API access (coming soon)',
    ],
    cta: 'Get Pro',
    href: '/signup?plan=pro',
    highlight: true,
    badge: 'Recommended',
  },
]

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`relative flex flex-col rounded-card border p-6 ${
            plan.highlight
              ? 'bg-surface border-primary shadow-card-hover'
              : 'bg-surface border-border shadow-card'
          }`}
        >
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center px-3 py-1 bg-primary text-white text-xs font-medium rounded-badge">
                {plan.badge}
              </span>
            </div>
          )}

          <div className="mb-6">
            <div className="text-[11px] font-medium text-muted uppercase tracking-widest mb-2">
              {plan.name}
            </div>
            <div className="font-heading font-extrabold text-3xl text-foreground tracking-heading">
              {plan.price}
            </div>
            <div className="text-xs text-muted mt-1">{plan.period}</div>
            <p className="text-sm text-muted mt-3 leading-relaxed">{plan.tagline}</p>
          </div>

          <ul className="space-y-2.5 flex-1 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check
                  size={13}
                  className="text-success mt-0.5 shrink-0"
                  strokeWidth={2.5}
                />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            to={plan.href}
            className={
              plan.highlight
                ? 'btn-primary w-full justify-center'
                : 'btn-outline w-full justify-center'
            }
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  )
}
