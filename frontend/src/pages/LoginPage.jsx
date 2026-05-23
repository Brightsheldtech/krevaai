import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="card p-8 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="section-heading text-2xl mb-1">Sign in to Kreva AI</h1>
          <p className="text-muted text-sm">Authentication coming soon.</p>
        </div>
        <p className="text-xs text-muted">
          No account?{' '}
          <Link to="/signup" className="text-primary hover:text-primary-hover transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
