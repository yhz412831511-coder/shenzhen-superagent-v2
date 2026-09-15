import { useState } from 'react'
import type { PartyExecStep } from '../../data/fixtures-party'

const securityBadgeMap: Record<string, string> = {
  ok: 'badge badge-success',
  auth: 'badge badge-info',
  confirm: 'badge badge-warning',
  masked: 'badge badge-info',
}

interface ExecStepProps {
  step: PartyExecStep
  status: 'done' | 'running'
}

export function ExecStep({ step, status }: ExecStepProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`exec-step ${status === 'running' ? 'running' : ''}`}>
      <div className="exec-step-head" onClick={() => setOpen(!open)}>
        {status === 'running' ? <span className="exec-spinner" /> : <span className="exec-check">✓</span>}
        <span className={`exec-step-chevron ${open ? 'open' : ''}`}>▶</span>
        <span className="exec-step-node">{step.node}</span>
        <span className="badge badge-muted">{step.system}</span>
        <span className={securityBadgeMap[step.securityLevel] || 'badge badge-success'}>{step.security}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{step.result}</span>
      </div>
      {open && (
        <div className="exec-step-detail">
          <div className="exec-detail-row">
            <span className="exec-detail-label">工具调用</span>
            <span className="exec-detail-value">
              <code>{step.toolName}</code>
            </span>
          </div>
          <div className="exec-detail-row">
            <span className="exec-detail-label">参数摘要</span>
            <span className="exec-detail-value">{step.toolParams}</span>
          </div>
          <div className="exec-detail-row">
            <span className="exec-detail-label">返回结果</span>
            <span className="exec-detail-value">{step.toolResult}</span>
          </div>
          <div className="exec-detail-row">
            <span className="exec-detail-label">安全鉴权</span>
            <span className="exec-detail-value">{step.authNote}</span>
          </div>
        </div>
      )}
    </div>
  )
}

interface ExecStepListProps {
  steps: PartyExecStep[]
  visibleCount: number
}

export function ExecStepList({ steps, visibleCount }: ExecStepListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {steps.slice(0, visibleCount).map((step, idx) => (
        <ExecStep key={step.id} step={step} status={idx < visibleCount - 1 ? 'done' : 'running'} />
      ))}
    </div>
  )
}
