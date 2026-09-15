import { useState } from 'react'
import { systemConnectors } from '../../data/fixtures-nav'

export default function Connections() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">系统连接</h1>
        <p className="page-subtitle">
          基于 MCP 协议连接的政务系统 · {systemConnectors.length} 个系统 · 点击卡片展开工具清单 · 演示样例
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {systemConnectors.map((c) => {
          const open = expanded === c.id
          return (
            <div key={c.id} className="card">
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', cursor: 'pointer' }}
                onClick={() => setExpanded(open ? null : c.id)}
              >
                <span className={`exec-step-chevron ${open ? 'open' : ''}`}>▶</span>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{c.name}</span>
                <span className="tag">MCP</span>
                <span className={`badge ${c.status === '已连接' ? 'badge-success' : 'badge-info'}`}>{c.status}</span>
                <span className="badge badge-muted">{c.mode}</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  {c.tools.length} 个工具 · 本月调用 {c.callsThisMonth} 次 · 最近 {c.lastCall}
                </span>
              </div>
              {open && (
                <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--muted)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {c.tools.map((t) => (
                    <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                      <span className="tag" style={{ fontFamily: 'var(--font-code)' }}>{t.name}</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{t.purpose}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="card mt-4" style={{ background: 'var(--muted)' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
          权限模式沿用岗位权限：只读随岗位自动继承；受控写须人工确认并留痕；CODES 等敏感系统须逐次授权，任务结束自动回收。不扩大来源系统原有权限。
        </span>
      </div>
    </div>
  )
}
