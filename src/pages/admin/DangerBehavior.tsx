import { useState, Fragment } from 'react'
import { riskEvents } from '../../data/fixtures'

const stats = [
  { label: '本周阻断次数', value: 15, icon: '⊘', color: 'var(--danger)' },
  { label: '降级次数', value: 8, icon: '↓', color: 'var(--warning)' },
  { label: '转人工次数', value: 12, icon: '◐', color: 'var(--primary)' },
]

function statusBadge(status: string) {
  if (status === '已处置') return <span className="badge badge-success">{status}</span>
  if (status === '已修复') return <span className="badge badge-info">{status}</span>
  if (status === '处置中') return <span className="badge badge-warning">{status}</span>
  return <span className="badge badge-muted">{status}</span>
}

const rankedEvents = [...riskEvents].sort((a, b) => b.blocked - a.blocked)

export default function DangerBehavior() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (id: string) => {
    setExpandedRow(prev => (prev === id ? null : id))
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">危险AI行为排行榜<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">危险AI行为显示具体动作、结果和处置，不能只有风险分数</div>
      </div>

      <div className="grid grid-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: `${s.color}15`,
              color: s.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-xl)',
              flexShrink: 0,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">危险行为排行榜</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>排名</th>
                <th>应用名称</th>
                <th>部门</th>
                <th>Agent版本</th>
                <th>具体行为</th>
                <th style={{ width: '60px' }}>尝试</th>
                <th style={{ width: '60px' }}>阻断</th>
                <th style={{ width: '60px' }}>复核</th>
                <th>涉及数据</th>
                <th>涉及工具</th>
                <th>目的地</th>
                <th>影响</th>
                <th>处置措施</th>
                <th>责任人</th>
                <th>状态</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {rankedEvents.map((r, i) => (
                <Fragment key={r.id}>
                  <tr
                    onClick={() => toggleRow(r.id)}
                    style={{ cursor: 'pointer', background: expandedRow === r.id ? 'var(--muted)' : undefined }}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: i === 0 ? 'var(--danger)' : i === 1 ? 'var(--warning)' : 'var(--muted)',
                        color: i < 2 ? '#fff' : 'var(--muted-foreground)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                      }}>{i + 1}</span>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{r.appName}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.department}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--primary)' }}>{r.agent}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.behavior}</td>
                    <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>{r.attempts}</td>
                    <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center', fontWeight: 600, color: 'var(--danger)' }}>{r.blocked}</td>
                    <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>{r.humanReview}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.involvingData}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--warning)' }}>{r.involvingTool}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.destination}</td>
                    <td><span className="badge badge-danger">{r.impact}</span></td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.measure}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.responsiblePerson}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', textAlign: 'center' }}>
                      {expandedRow === r.id ? '▲' : '▼'}
                    </td>
                  </tr>
                  {expandedRow === r.id && (
                    <tr>
                      <td colSpan={16} style={{ background: 'var(--muted)', padding: 'var(--space-4)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>事件ID</div>
                            <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{r.id}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>阻断率</div>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--danger)' }}>
                              {((r.blocked / r.attempts) * 100).toFixed(0)}% ({r.blocked}/{r.attempts})
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>人工复核占比</div>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                              {((r.humanReview / r.attempts) * 100).toFixed(0)}% ({r.humanReview}/{r.attempts})
                            </div>
                          </div>
                          <div style={{ gridColumn: 'span 3' }}>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>处置详情</div>
                            <div style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                              <div style={{ marginBottom: 'var(--space-1)' }}>
                                <strong>触发行为：</strong>{r.behavior}
                              </div>
                              <div style={{ marginBottom: 'var(--space-1)' }}>
                                <strong>涉及数据：</strong>{r.involvingData}，通过工具 <code style={{ fontFamily: 'var(--font-code)', color: 'var(--warning)' }}>{r.involvingTool}</code> 尝试输出至 <strong>{r.destination}</strong>
                              </div>
                              <div style={{ marginBottom: 'var(--space-1)' }}>
                                <strong>实际影响：</strong>{r.impact}
                              </div>
                              <div style={{ marginBottom: 'var(--space-1)' }}>
                                <strong>处置措施：</strong>{r.measure}
                              </div>
                              <div>
                                <strong>责任人：</strong>{r.responsiblePerson} · 当前状态：
                                {r.status === '已处置' && <span className="badge badge-success" style={{ marginLeft: 'var(--space-1)' }}>已处置</span>}
                                {r.status === '已修复' && <span className="badge badge-info" style={{ marginLeft: 'var(--space-1)' }}>已修复</span>}
                                {r.status === '处置中' && <span className="badge badge-warning" style={{ marginLeft: 'var(--space-1)' }}>处置中</span>}
                              </div>
                            </div>
                          </div>
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

      <div className="card mt-4" style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>说明：</strong>危险AI行为显示具体动作、结果和处置，不能只有风险分数。每条记录包含具体行为描述、尝试次数、阻断次数、人工复核情况、涉及数据和工具、目的地、实际影响、处置措施、责任人及当前状态，确保每个危险行为可追溯、可问责、可改进。
        </div>
      </div>
    </div>
  )
}
