import { useState, Fragment } from 'react'
import { riskEvents } from '../../data/fixtures'
import { securityStats, auditChain, adminDangerList } from '../../data/fixtures-admin'

const kpiToneMap: Record<string, string> = {
  red: 'red',
  amber: 'red',
  blue: 'blue',
  cyan: 'cyan',
}

function statusBadge(status: string) {
  if (status === '已处置') return <span className="ad-badge ad-badge-green">{status}</span>
  if (status === '已修复') return <span className="ad-badge ad-badge-cyan">{status}</span>
  if (status === '处置中') return <span className="ad-badge ad-badge-amber">{status}</span>
  return <span className="ad-badge ad-badge-muted">{status}</span>
}

const rankedEvents = [...riskEvents].sort((a, b) => b.blocked - a.blocked)

export default function Security() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const toggleRow = (id: string) => setExpandedRow((prev) => (prev === id ? null : id))

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">安全与审计</div>
          <div className="ad-header-sub">危险 AI 行为 · 处置留痕 · 全链路审计</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 合成数据</span>
        </div>
      </div>

      {/* KPI 四卡 */}
      <div className="ad-kpi-grid">
        {securityStats.map((s) => (
          <div className="ad-card ad-kpi" key={s.label}>
            <div className={`ad-kpi-icon ${kpiToneMap[s.tone]}`}>{s.icon}</div>
            <div>
              <div className="ad-kpi-label">{s.label}</div>
              <div className="ad-kpi-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 危险行为排行榜 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          危险行为排行榜
          <span className="sub">显示具体动作、结果和处置，不只给风险分数</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th style={{ width: '44px' }}>排名</th>
                <th>应用 / Agent</th>
                <th>具体行为</th>
                <th style={{ width: '56px' }}>尝试</th>
                <th style={{ width: '56px' }}>阻断</th>
                <th style={{ width: '56px' }}>复核</th>
                <th>涉及数据 / 工具</th>
                <th>处置措施</th>
                <th style={{ width: '76px' }}>状态</th>
                <th style={{ width: '36px' }}></th>
              </tr>
            </thead>
            <tbody>
              {rankedEvents.map((r, i) => (
                <Fragment key={r.id}>
                  <tr
                    onClick={() => toggleRow(r.id)}
                    style={{ cursor: 'pointer', background: expandedRow === r.id ? 'rgba(0,212,255,0.04)' : undefined }}
                  >
                    <td>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        background: i === 0 ? 'rgba(239,68,68,0.16)' : i === 1 ? 'rgba(245,158,11,0.16)' : 'rgba(138,163,199,0.12)',
                        color: i === 0 ? 'var(--ad-red)' : i === 1 ? 'var(--ad-amber)' : 'var(--ad-muted)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                      }} className="ad-num">{i + 1}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{r.appName}</div>
                      <div className="ad-num" style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-muted)' }}>{r.department} · {r.agent}</div>
                    </td>
                    <td style={{ color: 'var(--ad-text)' }}>{r.behavior}</td>
                    <td className="ad-num">{r.attempts}</td>
                    <td className="ad-num" style={{ color: 'var(--ad-red)', fontWeight: 600 }}>{r.blocked}</td>
                    <td className="ad-num">{r.humanReview}</td>
                    <td>
                      <div style={{ color: 'var(--ad-muted)' }}>{r.involvingData}</div>
                      <div className="ad-num" style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-amber)' }}>{r.involvingTool}</div>
                    </td>
                    <td style={{ color: 'var(--ad-text)' }}>{r.measure}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td style={{ color: 'var(--ad-muted)', textAlign: 'center' }}>{expandedRow === r.id ? '▲' : '▼'}</td>
                  </tr>
                  {expandedRow === r.id && (
                    <tr>
                      <td colSpan={10} style={{ background: 'rgba(0,212,255,0.04)', padding: 'var(--space-4)' }}>
                        <div className="ad-grid-3">
                          <div className="ad-metric">
                            <span className="k">事件 ID</span>
                            <span className="ad-num v" style={{ fontSize: 'var(--text-sm)' }}>{r.id}</span>
                          </div>
                          <div className="ad-metric">
                            <span className="k">阻断率</span>
                            <span className="v" style={{ color: 'var(--ad-red)' }}>
                              {((r.blocked / r.attempts) * 100).toFixed(0)}% ({r.blocked}/{r.attempts})
                            </span>
                          </div>
                          <div className="ad-metric">
                            <span className="k">责任人</span>
                            <span className="v" style={{ fontSize: 'var(--text-md)' }}>{r.responsiblePerson}</span>
                          </div>
                          <div style={{ gridColumn: 'span 3' }}>
                            <div className="ad-sb-note" style={{ marginBottom: 'var(--space-1)' }}>处置详情</div>
                            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)', lineHeight: 1.7 }}>
                              涉及数据 <b>{r.involvingData}</b>，通过工具 <b className="ad-num">{r.involvingTool}</b> 尝试输出至 <b>{r.destination}</b>；
                              实际影响：{r.impact}。处置措施：{r.measure}，责任人 {r.responsiblePerson}。
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

      {/* 今日高风险关注 + 审计链路 */}
      <div className="ad-grid-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="ad-card">
          <div className="ad-card-title">
            今日高风险关注
            <span className="sub">5 条 · 均已进入处置链路</span>
          </div>
          <div className="ad-risk-list">
            {adminDangerList.map((r) => (
              <div className="ad-risk-item" key={r.no}>
                <span className="ad-risk-no">{r.no}</span>
                <span className="ad-risk-title">{r.title}</span>
                <span className="ad-risk-meta">{r.meta}</span>
                {r.state === 'blocked' && <span className="ad-badge ad-badge-red">已阻断</span>}
                {r.state === 'review' && <span className="ad-badge ad-badge-amber">人工复核</span>}
                {r.state === 'allowed' && <span className="ad-badge ad-badge-green">已授权</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">
            全链路审计保障
            <span className="sub">每个行为可追溯、可问责、可改进</span>
          </div>
          <div className="ad-tl">
            {auditChain.map((a, i) => (
              <div className={`ad-tl-row ${i === 0 ? 'plain' : ''}`} key={a.label}>
                <span className="ad-tl-dot" />
                <div className="ad-tl-body">
                  <div className="ad-tl-node" style={{ fontSize: 'var(--text-sm)' }}>{a.label}</div>
                  <div className="ad-tl-detail">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
