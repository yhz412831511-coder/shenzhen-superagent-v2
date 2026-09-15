import { useState, type ReactNode } from 'react'

interface CollapsibleSectionProps {
  summary: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}

export function CollapsibleSection({ summary, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="cs-wrap">
      <button className="cs-head" onClick={() => setOpen((o) => !o)}>
        <span className={`cs-caret ${open ? 'open' : ''}`}>▶</span>
        <span className="cs-summary">{summary}</span>
      </button>
      {open && <div className="cs-body">{children}</div>}
    </div>
  )
}
