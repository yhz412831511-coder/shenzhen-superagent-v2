import { Link } from 'react-router-dom'
import {
  matterAgentChain,
  matterAgentTimeline,
  managedAgents,
  matterAgentStats,
} from '../../data/fixtures-admin'

function agentStatusBadge(status: string) {
  if (status === '运行中') return <span className="ad-badge ad-badge-cyan">运行中</span>
  if (status === '静默') return <span className="ad-badge ad-badge-muted">静默</span>
  return <span className="ad-badge ad-badge-green">{status}</span>
}

export default function MattersAgents() {
  const chain = matterAgentChain

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">事项与智能体</div>
          <div className="ad-header-sub">事项 → 记忆 → 执行 → 审核 → 结果，链路与用户端故事线同源</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 1 条主线任务</span>
        </div>
      </div>

      {/* 聚合统计条 */}
      <div className="ad-card mb-4" style={{ padding: 'var(--space-4) var(--space-5)' }}>
        <div className="ad-metric-row">
          {matterAgentStats.map((s) => (
            <div className="ad-metric" key={s.k}>
              <span className="k">{s.k}</span>
              <span className="v">{s.v}</span>
            </div>
          ))}
          <span style={{ flex: 1 }} />
          <span className="ad-sb-note">业务量为演示样例，链路完整性优先</span>
        </div>
      </div>

      {/* 事项链路总览 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          事项链路总览 · {chain.title}
          <span className="sub">{chain.task} · {chain.owner}</span>
          <Link to={`/admin/task/${chain.task}`} className="ad-drill">查看单任务全链路 →</Link>
        </div>
        <div className="ad-flow">
          {chain.stages.map((s, i) => (
            <div className="ad-flow-node hot" key={s.label}>
              <div className="ad-flow-count" style={{ fontSize: 'var(--text-md)' }}>{s.value}</div>
              <div className="ad-flow-dot" />
              <div className="ad-flow-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="ad-grid-2" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-2)' }}>
          {chain.stages.map((s) => (
            <div key={s.label} style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-muted)', lineHeight: 1.5 }}>
              {s.detail}
            </div>
          ))}
        </div>
      </div>

      {/* 任务链路时间轴 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          任务链路（单任务视角）
          <span className="sub">含模型调度 · Token · 沙箱关联</span>
        </div>
        <div className="ad-tl">
          {matterAgentTimeline.map((row, i) => (
            <div className={`ad-tl-row ${i === 0 ? 'plain' : ''}`} key={row.time + row.node}>
              <span className="ad-tl-time">{row.time}</span>
              <span className="ad-tl-dot" />
              <div className="ad-tl-body">
                <div className="ad-tl-node">{row.node}</div>
                <div className="ad-tl-detail">{row.detail}</div>
                <div className="ad-tl-meta">
                  <span className="ad-tl-chip model">{row.model}</span>
                  <span className="ad-tl-chip token">{row.token}</span>
                  <span className="ad-tl-chip">{row.sandbox}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 智能体纳管列表 */}
      <div className="ad-card">
        <div className="ad-card-title">
          智能体纳管
          <span className="sub">今日调用 · 关联沙箱</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>名称</th>
                <th style={{ width: '70px' }}>版本</th>
                <th style={{ width: '80px' }}>状态</th>
                <th>所属单位</th>
                <th style={{ width: '90px' }}>今日调用</th>
                <th style={{ width: '110px' }}>关联沙箱</th>
                <th>职责范围</th>
              </tr>
            </thead>
            <tbody>
              {managedAgents.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-muted)' }}>{a.version}</td>
                  <td>{agentStatusBadge(a.status)}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{a.unit}</td>
                  <td className="ad-num">{a.calls}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-cyan)' }}>{a.sandbox}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{a.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
