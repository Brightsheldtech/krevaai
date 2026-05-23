import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getToolBySlug } from '../lib/tools.js'

export default function ToolPage() {
  const { slug } = useParams()
  const tool = getToolBySlug(slug)

  if (!tool) {
    return (
      <div className="page-content">
        <p className="text-muted text-sm">Tool not found.</p>
      </div>
    )
  }

  const Icon = tool.icon

  return (
    <div className="page-content">
      <div className="page-header -mx-6 -mt-6 mb-6">
        <Link
          to="/app/tools"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft size={12} />
          All tools
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-card bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Icon size={16} className="text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="section-heading text-xl">{tool.name}</h1>
            <p className="text-muted text-xs mt-0.5">{tool.description}</p>
          </div>
        </div>
      </div>
      <div className="card p-6 text-center text-muted text-sm">
        This tool is being built in section 5.
      </div>
    </div>
  )
}
