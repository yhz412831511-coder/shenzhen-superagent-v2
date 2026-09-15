import { skills, agents } from '../../data/fixtures-nav'

export default function Abilities() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">专业能力</h1>
        <p className="page-subtitle">
          技能与专业智能体 · {skills.length} 个技能 · {agents.length} 个智能体 · 演示样例
        </p>
      </div>

      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>技能（Skills）</h2>
          <span className="badge badge-muted">由经验池沉淀</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
          {skills.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{s.name}</span>
                <span className="tag">{s.version}</span>
                <span style={{ flex: 1 }} />
                <span className="badge badge-success">{s.status}</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{s.purpose}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>本月调用 {s.callsThisMonth} 次</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>专业智能体（Agents）</h2>
          <span className="badge badge-muted">按处室岗位配置</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
          {agents.map((a) => (
            <div
              key={a.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: `1px solid ${a.featured ? 'var(--primary)' : 'var(--border)'}`,
                background: a.featured ? 'var(--ui-brand-soft)' : 'var(--card)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{a.name}</span>
                {a.featured && <span className="badge badge-info">本次任务使用</span>}
                <span style={{ flex: 1 }} />
                <span className="badge badge-success">{a.status}</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{a.duty}</span>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                <span>挂载技能 {a.skillCount} 个</span>
                <span>关联系统：{a.systems}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: 'var(--muted)' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
          技能由经验池从任务执行中沉淀（见管理端「经验与进化」）；专业智能体按处室岗位配置挂载技能与系统连接（见管理端「连接器工厂」）。
        </span>
      </div>
    </div>
  )
}
