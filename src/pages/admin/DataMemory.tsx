import { useState } from 'react'
import { riskEvents, dataRiskFlow, memoryTypes } from '../../data/fixtures'
import { memoryGovernance } from '../../data/fixtures-admin'

const chainTones = [
  'var(--ad-cyan)',
  'var(--ad-blue)',
  'var(--ad-amber)',
  'var(--ad-cyan-2)',
  'var(--ad-red)',
  'var(--ad-green)',
  'var(--ad-muted)',
]

function statusBadge(status: string) {
  if (status === '已处置' || status === '已修复') return <span className="ad-badge ad-badge-green">{status}</span>
  if (status === '处置中') return <span className="ad-badge ad-badge-amber">{status}</span>
  return <span className="ad-badge ad-badge-muted">{status}</span>
}

export default function DataMemory() {
  const [switches, setSwitches] = useState<Record<string, boolean>>(
    Object.fromEntries(memoryGovernance.policies.map((p) => [p.label, p.on]))
  )

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">数据与记忆</div>
          <div className="ad-header-sub">六类记忆治理 · 数据资产流向 · 组合推导审查</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 合成数据</span>
        </div>
      </div>

      {/* 聚合统计条 */}
      <div className="ad-card mb-4" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div className="ad-metric-row">
          {memoryGovernance.stats.map((s) => (
            <div className="ad-metric" key={s.k}>
              <span className="k">{s.k}</span>
              <span className="v">{s.v}</span>
            </div>
          ))}
          <span style={{ flex: 1 }} />
          <span className="ad-sb-note">记忆进入实际办理过程 · 使用率 64.3%</span>
        </div>
      </div>

      {/* 数据资产与流向 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          数据资产与流向
          <span className="sub">从谁发起 → 读取什么 → 组合推导 → 传给哪里 → 命中规则 → 如何处置 → 是否出域</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
          {dataRiskFlow.chain.map((node, i) => (
            <div key={node.step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
              <div style={{
                width: '230px',
                minHeight: '112px',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(17, 27, 48, 0.6)',
                border: `1px solid ${chainTones[i]}55`,
                borderLeft: `3px solid ${chainTones[i]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="ad-num" style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: `${chainTones[i]}22`,
                    color: chainTones[i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{node.step}</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-muted)', lineHeight: 1.6 }}>{node.value}</div>
              </div>
              {i < dataRiskFlow.chain.length - 1 && (
                <span style={{ color: 'var(--ad-muted)', fontSize: 'var(--text-md)', flexShrink: 0 }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 数据治理事件 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          数据治理事件
          <span className="sub">组合推导 · 批量导出 · 未确认写入，全部进入处置链路</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>事件 ID</th>
                <th>应用 / Agent</th>
                <th>触发行为</th>
                <th>涉及数据</th>
                <th>工具</th>
                <th>目的地</th>
                <th>处置</th>
                <th style={{ width: '80px' }}>状态</th>
              </tr>
            </thead>
            <tbody>
              {riskEvents.map((r) => (
                <tr key={r.id}>
                  <td className="ad-num" style={{ color: 'var(--ad-cyan)' }}>{r.id}</td>
                  <td>
                    <div>{r.appName}</div>
                    <div className="ad-num" style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-muted)' }}>{r.agent}</div>
                  </td>
                  <td style={{ color: 'var(--ad-text)' }}>{r.behavior}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{r.involvingData}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-amber)' }}>{r.involvingTool}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{r.destination}</td>
                  <td style={{ color: 'var(--ad-text)' }}>{r.measure}</td>
                  <td>{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 记忆治理 */}
      <div className="ad-grid-2" style={{ gridTemplateColumns: '1fr 380px' }}>
        <div className="ad-card">
          <div className="ad-card-title">
            六类记忆台账
            <span className="sub">全市口径 · 条目数与示例</span>
          </div>
          <table className="ad-table">
            <thead>
              <tr>
                <th>记忆类型</th>
                <th>用户视角</th>
                <th style={{ width: '70px' }}>条目</th>
                <th>典型内容</th>
              </tr>
            </thead>
            <tbody>
              {memoryTypes.map((m) => (
                <tr key={m.type}>
                  <td style={{ fontWeight: 500 }}>{m.type}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{m.userLabel}</td>
                  <td className="ad-num">{m.count}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{m.items[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">
            记忆治理策略
            <span className="sub">默认全开 · 演示可切换</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {memoryGovernance.policies.map((p) => (
              <div key={p.label}>
                <div
                  className={`ad-switch ${switches[p.label] ? 'on' : ''}`}
                  onClick={() => setSwitches({ ...switches, [p.label]: !switches[p.label] })}
                >
                  <span className="track"><i /></span>
                  <span className="lbl">{p.label}</span>
                </div>
                <div className="ad-sb-note" style={{ marginLeft: '48px', marginTop: '2px' }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div className="ad-sb-note" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--ad-border-soft)' }}>
            跨部门数据组合推导个人敏感信息时自动标记并阻断，转数据主管确认后方可继续。
          </div>
        </div>
      </div>
    </div>
  )
}
