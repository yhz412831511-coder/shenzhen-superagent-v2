import { useState } from 'react'
import type { PartyCaseCard } from '../../data/fixtures-party'

interface InlineAskCardProps {
  card: PartyCaseCard
  decision: boolean | null
  onChoose: (yes: boolean) => void
  readOnly?: boolean
}

export function InlineAskCard({ card, decision, onChoose, readOnly = false }: InlineAskCardProps) {
  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const answered = decision !== null
  const yes = decision === true

  return (
    <div className={`iac-card ${card.kind === 'memory' ? 'iac-memory' : 'iac-conflict'}`}>
      <div className="iac-head">
        <span className={`badge ${card.kind === 'memory' ? 'badge-warning' : 'badge-danger'}`}>{card.badge}</span>
        <span className="iac-title">{card.title}</span>
      </div>

      <div className="iac-question">
        <span className="iac-avatar">政</span>
        <span>{card.question}</span>
      </div>

      <button className="iac-evidence-toggle" onClick={() => setEvidenceOpen((o) => !o)}>
        {evidenceOpen ? '收起依据' : '查看依据'}
        <span className={`ssr-caret ${evidenceOpen ? 'open' : ''}`}>▶</span>
      </button>
      {evidenceOpen && (
        <div className="iac-evidence">
          <div className="iac-evidence-col">
            <div className="iac-evidence-title">{card.evidenceTitle}</div>
            {card.evidenceLines.map((l) => (
              <div key={l.label} className="iac-line">
                <span className="iac-line-label">{l.label}</span>
                <span>{l.value}</span>
              </div>
            ))}
          </div>
          <div className="iac-evidence-col">
            <div className="iac-evidence-title">{card.gapTitle}</div>
            {card.gapLines.map((l) => (
              <div key={l.label} className="iac-line">
                <span className="iac-line-label">{l.label}</span>
                <span>{l.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {answered ? (
        <div className="iac-answered">
          <span className={`badge ${yes ? 'badge-success' : 'badge-muted'}`}>
            {yes ? card.primaryAction : card.secondaryAction}
          </span>
          <span className="iac-note">{yes ? card.primaryResultNote : card.secondaryResultNote}</span>
        </div>
      ) : readOnly ? (
        <div className="iac-answered">
          <span className="badge badge-muted">待处理</span>
        </div>
      ) : (
        <div className="iac-actions">
          <button className="btn btn-primary" onClick={() => onChoose(true)}>
            {card.primaryAction}
          </button>
          <button className="btn btn-secondary" onClick={() => onChoose(false)}>
            {card.secondaryAction}
          </button>
        </div>
      )}
    </div>
  )
}
