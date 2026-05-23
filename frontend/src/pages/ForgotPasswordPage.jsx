import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="card p-8 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="section-heading text-2xl mb-1">Reset your password</h1>
          <p className="text-muted text-sm">Authentication — section 2 in the build order.</p>
        </div>
        <Link to="/login" className="text-xs text-primary hover:text-primary-hover transition-colors">
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
