import { useAuthStore } from '../store/authStore.js'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="page-content">
      <div className="page-header -mx-6 -mt-6 mb-6">
        <h1 className="section-heading text-2xl">Welcome back, {firstName}</h1>
        <p className="text-muted text-sm mt-1">Dashboard coming soon.</p>
      </div>
    </div>
  )
}
