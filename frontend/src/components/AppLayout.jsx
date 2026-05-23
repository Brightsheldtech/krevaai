import { Outlet, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Wrench, History, User, Zap } from 'lucide-react'
import { useAuthStore } from '../store/authStore.js'
import { useSubscriptionStore } from '../store/subscriptionStore.js'

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/tools', label: 'Tools', icon: Wrench },
  { to: '/app/history', label: 'History', icon: History },
  { to: '/app/account', label: 'Account', icon: User },
]

export default function AppLayout() {
  const { user } = useAuthStore()
  const { plan } = useSubscriptionStore()

  const fullName = user?.user_metadata?.full_name || ''
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-surface border-r border-border fixed inset-y-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
          <Link
            to="/app"
            className="font-heading font-extrabold text-xl text-foreground tracking-heading"
          >
            Kreva AI
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted hover:text-foreground hover:bg-surface-raised border border-transparent'
                }`
              }
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-2 shrink-0">
          {plan === 'free' && (
            <Link
              to="/app/billing"
              className="flex items-center gap-2 w-full px-3 py-2 bg-primary/10 border border-primary/20 rounded-card text-xs text-primary font-medium hover:bg-primary/15 transition-colors duration-200"
            >
              <Zap size={12} />
              Upgrade to Pro
            </Link>
          )}
          <div className="flex items-center gap-3 px-2 py-2 rounded-card">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="text-xs font-mono font-medium text-primary">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground font-medium truncate">
                {fullName || user?.email}
              </p>
              <p className="text-xs text-muted capitalize">{plan} Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-60 min-h-screen">
        <main className="pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-surface border-t border-border flex z-20">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-muted'
              }`
            }
          >
            <Icon size={18} strokeWidth={1.75} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
