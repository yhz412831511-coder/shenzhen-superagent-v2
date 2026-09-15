import { useState, Fragment } from 'react'
import { incidentStats, incidentEvents } from '../../data/fixtures-admin'

function levelBadge(level: string) {
  if (level === '高') return <span className="ad-badge ad-badge-red">高</span>
  if (level === '中') return <span className="ad-badge ad-badge-amber">中</span>
  return <span className="ad-badge ad-badge-muted">低</span>
}

function statusBadge(status: string) {
  if (status === '待处置') return <span className="ad-badge ad-badge-red">待处置</span>
  if (status === '处置中') return <span className="ad-badge ad-badge-amber">处置中</span>
  return <span className="ad-badge ad-badge-green">已闭环</span>
}

const statTones: Record<string, string> = {
  red: 'var(--ad-red)',
  green: 'var(--ad-green)',
  cyan: 'var(--ad-cyan)',
}

export default function Incidents() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">事件处置</div>
          <div className="ad-header-sub">风险事件的处置队列与回执留痕 · 阻断 / 转人工 / 放行均有记录</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 合成数据</span>
        </div>
      </div>

      <div className="ad-kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 'var(--space-4)' }}>
        {incidentStats.map((s) => (
          <div className="ad-card" key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: statTones[s.tone], fontFamily: 'var(--ad-num-font)' }}>
              {s.v}
            </div>
            <div className="ad-kpi-label">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="ad-card">
        <div className="ad-card-title">
          处置队列
          <span className="sub">点击行查看处置回执</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>事件 ID</th>
                <th style={{ width: '56px' }}>等级</th>
                <th style={{ width: '100px' }}>类型</th>
                <th>命中规则</th>
                <th>关联任务</th>
                <th style={{ width: '64px' }}>时间</th>
                <th style={{ width: '80px' }}>状态</th>
                <th>处置动作</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {incidentEvents.map((e) => (
                <Fragment key={e.id}>
                  <tr
                    onClick={() => setExpanded(expanded === e.id ? null : e.id)}
                    style={{ cursor: 'pointer', background: expanded === e.id ? 'rgba(0,212,255,0.04)' : undefined }}
                  >
                    <td className="ad-num" style={{ color: 'var(--ad-cyan)' }}>{e.id}</td>
                    <td>{levelBadge(e.level)}</td>
                    <td>{e.type}</td>
                    <td style={{ color: 'var(--ad-muted)' }}>{e.rule}</td>
                    <td className="ad-num" style={{ color: 'var(--ad-muted)' }}>{e.task}</td>
                    <td className="ad-num">{e.time}</td>
                    <td>{statusBadge(e.status)}</td>
                    <td style={{ color: 'var(--ad-text)' }}>{e.action}</td>
                    <td style={{ color: 'var(--ad-muted)', textAlign: 'center' }}>{expanded === e.id ? '▲' : '▼'}</td>
                  </tr>
                  {expanded === e.id && (
                    <tr>
                      <td colSpan={9} style={{ background: 'rgba(0,212,255,0.04)', padding: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                          <span className="ad-badge ad-badge-cyan" style={{ flexShrink: 0 }}>处置回执</span>
                          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)', lineHeight: 1.6 }}>{e.receipt}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ad-card mt-4" style={{ background: 'rgba(245,158,11,0.05)', borderColor: 'rgba(245,158,11,0.25)' }}>
        <div className="ad-sb-note" style={{ color: '#ffd08a' }}>
          说明：每条风险事件的处置动作（阻断 / 转人工 / 放行）均生成回执并写入审计日志，处置人、时间、依据全程留痕，支持事后回查与问责。
        </div>
      </div>
    </div>
  )
}
