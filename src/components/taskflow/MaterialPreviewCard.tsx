import { useState } from 'react'
import type { PartyMaterialDoc } from '../../data/fixtures-party'

export function MaterialPreviewCard({ material }: { material: PartyMaterialDoc }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mpc-card">
      <div className="mpc-head">
        <span className="mpc-icon">📄</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mpc-title">{material.title}</div>
          <div className="mpc-desc">{material.desc}</div>
        </div>
        <button className="ssr-toggle" onClick={() => setOpen((o) => !o)}>
          {open ? '收起' : '预览'}
        </button>
      </div>
      {open && (
        <div className="mpc-body">
          {material.sections.map((s) => (
            <div key={s.heading} className="mpc-section">
              <div className="mpc-section-title">{s.heading}</div>
              {s.lines.map((l, i) => (
                <div key={i} className="mpc-line">
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
