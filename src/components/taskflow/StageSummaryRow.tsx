import { useState, type ReactNode } from 'react'

export type SummaryRowStatus = 'pending' | 'running' | 'done'

interface StageSummaryRowProps {
  status: SummaryRowStatus
  code?: string
  title: string
  result?: string
  meta?: string
  badges?: ReactNode
  children?: ReactNode
  detailLabel?: string
  defaultOpen?: boolean
}

export function StageSummaryRow({
  status,
  code,
  title,
  result,
  meta,
  badges,
  children,
  detailLabel = '详情',
  defaultOpen = false,
}: StageSummaryRowProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`ssr-row ${status}`}>
      <div className="ssr-main">
        <span className="ssr-status">
          {status === 'done' ? (
            <span className="exec-check">✓</span>
          ) : status === 'running' ? (
            <span className="exec-spinner" />
          ) : (
            <span className="ssr-dot" />
          )}
        </span>
        {code && <span className="ssr-code">{code}</span>}
        <span className="ssr-title">{title}</span>
        {badges}
        {result && <span className="ssr-result">{result}</span>}
        {meta && <span className="ssr-meta">{meta}</span>}
        {children && (
          <button className="ssr-toggle" onClick={() => setOpen((o) => !o)}>
            {open ? '收起' : detailLabel}
            <span className={`ssr-caret ${open ? 'open' : ''}`}>▶</span>
          </button>
        )}
      </div>
      {open && <div className="ssr-detail">{children}</div>}
    </div>
  )
}
