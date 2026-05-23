import { TOOLS } from '../lib/tools.js'

export default function ToolsPage() {
  return (
    <div className="page-content">
      <div className="page-header -mx-6 -mt-6 mb-6">
        <h1 className="section-heading text-2xl">Tools</h1>
        <p className="text-muted text-sm mt-1">
          {TOOLS.length} tools available. Coming soon.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <div key={tool.slug} className="card p-4 opacity-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-card bg-surface-raised flex items-center justify-center">
                  <Icon size={15} className="text-primary" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-medium text-foreground">{tool.name}</span>
              </div>
              <p className="text-xs text-muted">{tool.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
