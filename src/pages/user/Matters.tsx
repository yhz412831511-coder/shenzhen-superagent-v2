import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { matterList } from '../../data/fixtures-nav'

const categories = ['全部', '办文', '办会', '办事', '专业事项'] as const
const levels = ['全部', '重要', '常规'] as const

export default function Matters() {
  const navigate = useNavigate()
  const [cat, setCat] = useState<string>('全部')
  const [level, setLevel] = useState<string>('全部')

  const filtered = matterList.filter(
    (m) => (cat === '全部' || m.category === cat) && (level === '全部' || m.level === level)
  )

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">事项中心</h1>
        <p className="page-subtitle">已完成的任务按分类分级归集 · 点击进入详情下探 · 演示样例</p>
      </div>

      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c}
              className="btn btn-secondary"
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-1) var(--space-3)',
                background: cat === c ? 'var(--ui-brand-soft)' : undefined,
                color: cat === c ? 'var(--primary)' : undefined,
                borderColor: cat === c ? 'var(--primary)' : undefined,
              }}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          {levels.map((l) => (
            <button
              key={l}
              className={`btn btn-ghost`}
              style={{
                fontSize: 'var(--text-sm)',
                padding: 'var(--space-1) var(--space-3)',
                color: level === l ? 'var(--primary)' : undefined,
                fontWeight: level === l ? 600 : 400,
              }}
              onClick={() => setLevel(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filtered.map((m) => (
          <div key={m.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(`/matters/${m.id}`)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span className="badge badge-info">{m.category}</span>
              <span className={`badge ${m.level === '重要' ? 'badge-danger' : 'badge-muted'}`}>{m.level}</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{m.title}</span>
              <span style={{ flex: 1 }} />
              {m.hasReplay && <span className="badge badge-success">含 AI 执行回放</span>}
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{m.completedAt} 完成</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)', lineHeight: 1.6 }}>
              {m.desc}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {m.materials.map((mat) => (
                <span key={mat} className="tag">{mat}</span>
              ))}
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', marginLeft: 'auto' }}>进入详情 ›</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card" style={{ textAlign: 'center', color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)', padding: 'var(--space-8)' }}>
            该筛选条件下暂无事项
          </div>
        )}
      </div>
    </div>
  )
}
