import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-14">
        <Link
          to="/"
          className="font-heading font-extrabold text-lg text-foreground tracking-heading"
        >
          Kreva AI
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <a
            href="#tools"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
          >
            Features
          </a>
          <Link
            to="/pricing"
            className="text-sm text-muted hover:text-foreground transition-colors duration-200"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-ghost text-sm py-1.5 px-3 hidden sm:inline-flex">
            Sign In
          </Link>
          <Link to="/signup" className="btn-primary text-sm py-1.5 px-4">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
