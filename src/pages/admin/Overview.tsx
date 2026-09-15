import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  adminKpis,
  adminFunnel,
  adminDangerList,
  adminTokenWaterfall,
  adminMemoryEvolution,
  sandboxStatus,
  sandboxInstances,
} from '../../data/fixtures-admin'

function Ring({ value, label, color = 'var(--ad-cyan)', trackColor = 'rgba(138,163,199,0.15)' }: { value: number; label: string; color?: string; trackColor?: string }) {
  const r = 44
  const c = 2 * Math.PI * r
  const off = c * (1 - value / 100)
  return (
    <div className="ad-ring">
      <svg width="120" height="120" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke={trackColor} strokeWidth="9" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      </svg>
      <div className="ad-ring-inner">
        <div className="ad-ring-value">{value}%</div>
        <div className="ad-ring-label">{label}</div>
      </div>
    </div>
  )
}

const sbToneMap: Record<string, string> = { run: 'run', idle: 'idle', err: 'err', iso: 'iso' }
const sbStatusBadge: Record<string, string> = {
  运行中: 'ad-badge-cyan',
  闲置: 'ad-badge-muted',
  异常: 'ad-badge-amber',
  已隔离: 'ad-badge-red',
}

export default function AdminOverview() {
  const [sbFilter, setSbFilter] = useState<string | null>(null)

  const maxScene = Math.max(...adminFunnel.scenes.map((s) => s.value))
  const wfMax = adminTokenWaterfall.baseline
  const filteredInstances = sbFilter
    ? sandboxInstances.filter((i) => i.status === sandboxStatus.counts.find((c) => c.key === sbFilter)?.label)
    : sandboxInstances

  const tlPoints = adminMemoryEvolution.evolutionPoints
  const tlPath = tlPoints
    .map((p, i) => {
      const x = 16 + (i / (tlPoints.length - 1)) * 268
      const y = 70 - ((p.rate - 44) / 24) * 56
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">全市 AI 运行与进化中枢</div>
          <div className="ad-header-sub">运行、风险、成本、进化一屏掌握</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />测试环境 · 合成数据</span>
          <span className="ad-env-time">2026-09-15 10:36:25</span>
        </div>
      </div>

      {/* KPI 四卡 */}
      <div className="ad-kpi-grid">
        {adminKpis.map((k) => (
          <div className="ad-card ad-kpi" key={k.key}>
            <div className={`ad-kpi-icon ${k.tone}`}>{k.icon}</div>
            <div style={{ minWidth: 0 }}>
              <div className="ad-kpi-label">{k.label}</div>
              <div className="ad-kpi-value">{k.value}</div>
              <div className="ad-kpi-subs">
                {k.subs.map((s) => (
                  <span key={s.text} className={`ad-kpi-sub ${s.cls}`}>
                    <b className="ad-num">{s.value}</b> {s.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 全市 AI 事项运行态势 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          全市 AI 事项运行态势
          <span className="sub">今日 · 全市 42 个部门</span>
          <Link to="/admin/matters-agents" className="ad-drill">进入事项与智能体 →</Link>
        </div>
        <div className="ad-flow">
          {adminFunnel.stages.map((s, i) => {
            const loss = i > 0 ? adminFunnel.stages[i - 1].count - s.count : 0
            return (
              <div className="ad-flow-node hot" key={s.label}>
                <div className="ad-flow-count">{s.count.toLocaleString()}</div>
                <div className="ad-flow-dot" />
                <div className="ad-flow-label">{s.label}</div>
                {i > 0 && <div className="ad-flow-loss">−{loss}</div>}
              </div>
            )
          })}
        </div>
        <div className="ad-grid-2" style={{ gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 'var(--space-5)' }}>
          <div>
            <div className="ad-alert" style={{ marginBottom: 'var(--space-4)' }}>
              <span>⚠</span>
              <span><b>24</b> 项触发治理 · <b>37</b> 待确认 · <b>8</b> 高风险</span>
              <span style={{ flex: 1 }} />
              <Link to="/admin/incidents" className="ad-drill" style={{ color: '#ffd08a' }}>进入事件处置 →</Link>
            </div>
            <div className="ad-bars">
              {adminFunnel.scenes.map((s) => (
                <div className="ad-bar-row" key={s.label}>
                  <span className="ad-bar-label">{s.label}</span>
                  <div className="ad-bar-track">
                    <div className="ad-bar-fill" style={{ width: `${(s.value / maxScene) * 100}%` }} />
                  </div>
                  <span className="ad-bar-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Ring value={adminFunnel.closureRate} label="已闭环" />
            <div className="ad-metric-row" style={{ gap: 'var(--space-4)' }}>
              {adminFunnel.closureSubs.map((s) => (
                <div className="ad-metric" key={s.k}>
                  <span className="k">{s.k}</span>
                  <span className="v">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 沙箱状态管理 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          沙箱状态
          <span className="sub">任务在独立沙箱内运行 · 成果保存在个人空间</span>
          <button
            className="ad-drill"
            onClick={() => setSbFilter(null)}
            style={{ color: sbFilter ? 'var(--ad-cyan)' : 'var(--ad-muted)', fontSize: 'var(--text-xs)' }}
          >
            全部环境 {sandboxStatus.total} 个
          </button>
        </div>
        <div className="ad-sandbox-grid">
          {sandboxStatus.counts.map((c) => (
            <button
              key={c.key}
              className={`ad-sb-tile ${sbToneMap[c.key]} ${sbFilter === c.key ? 'active' : ''}`}
              style={sbFilter === c.key ? { outline: '1px solid var(--ad-cyan)' } : undefined}
              onClick={() => setSbFilter(sbFilter === c.key ? null : c.key)}
            >
              <div className="num">{c.value}</div>
              <div className="lbl">沙箱 · {c.label}</div>
            </button>
          ))}
        </div>
        <div className="ad-sb-note">{sandboxStatus.note}</div>
        <div className="ad-sb-pools">
          {sandboxStatus.pools.map((p) => (
            <span className="ad-sb-pool" key={p.label} title={p.detail}>
              <i style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ad-blue)', display: 'inline-block' }} />
              {p.label}
            </span>
          ))}
        </div>
        <div className="ad-sb-list">
          {filteredInstances.map((ins) => (
            <div className="ad-sb-row" key={ins.id}>
              <span className="ad-sb-id">{ins.id}</span>
              <span className="ad-sb-name">{ins.name}</span>
              <span className={`ad-badge ${sbStatusBadge[ins.status]}`}>{ins.status}</span>
              <span className="ad-sb-meta ad-num">{ins.task}</span>
              <span className="ad-sb-meta">{ins.network}</span>
              <span className="ad-sb-meta">{ins.template.split(' / ')[0]} · {ins.cpu} / {ins.memory}</span>
            </div>
          ))}
          <div className="ad-sb-note" style={{ marginTop: 'var(--space-2)' }}>
            共 {sandboxStatus.total} 个环境 · 上方展示运行样例 {sandboxInstances.length} 条，点击状态格可筛选
          </div>
        </div>
      </div>

      {/* 危险 AI 行为 */}
      <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: '300px 1fr' }}>
        <div className="ad-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div className="ad-card-title" style={{ alignSelf: 'stretch' }}>危险 AI 行为</div>
          <Ring value={8} label="高风险" color="var(--ad-red)" />
          <span className="ad-badge ad-badge-green">风险均已进入处置链路</span>
        </div>
        <div className="ad-card">
          <div className="ad-card-title">
            高风险行为列表
            <span className="sub">今日 · 5 条</span>
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
          <Link to="/admin/security" className="ad-drill" style={{ marginTop: 'var(--space-3)' }}>进入安全与审计 →</Link>
        </div>
      </div>

      {/* Token 预算与节省 */}
      <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: '1fr 300px' }}>
        <div className="ad-card">
          <div className="ad-card-title">
            Token 预算与节省
            <span className="sub">本月 · 单位：亿 Token</span>
          </div>
          <div className="ad-waterfall">
            <div className="ad-wf-col base">
              <div className="ad-wf-bar" style={{ height: `${(adminTokenWaterfall.baseline / wfMax) * 100}%` }} />
              <span className="ad-wf-val">{adminTokenWaterfall.baseline}亿</span>
              <div className="ad-wf-label">无优化基线</div>
            </div>
            {adminTokenWaterfall.cuts.map((c) => (
              <div className="ad-wf-col cut" key={c.label}>
                <div className="ad-wf-bar" style={{ height: `${Math.max((c.value / wfMax) * 100, 8)}%` }} />
                <span className="ad-wf-val">−{c.value}</span>
                <div className="ad-wf-label">{c.label}</div>
              </div>
            ))}
            <div className="ad-wf-col final">
              <div className="ad-wf-bar" style={{ height: `${(adminTokenWaterfall.actual / wfMax) * 100}%` }} />
              <span className="ad-wf-val">{adminTokenWaterfall.actual}亿</span>
              <div className="ad-wf-label">实际消耗</div>
            </div>
          </div>
        </div>
        <div className="ad-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div className="ad-card-title" style={{ alignSelf: 'stretch' }}>预算执行</div>
          <Ring value={adminTokenWaterfall.budgetRate} label="月度预算" color="var(--ad-blue)" />
          <span className="ad-badge ad-badge-green">{adminTokenWaterfall.avoidNote}</span>
          <Link to="/admin/token" className="ad-drill">进入 Token 驾驶舱 →</Link>
        </div>
      </div>

      {/* 记忆使用与能力进化 */}
      <div className="ad-card">
        <div className="ad-card-title">
          记忆使用与能力进化
          <span className="sub">近 6 期 · 演示样例</span>
          <span style={{ display: 'inline-flex', gap: 'var(--space-3)' }}>
            <Link to="/admin/data-memory" className="ad-drill">进入数据与记忆 →</Link>
            <Link to="/admin/evolution" className="ad-drill">进入经验与进化 →</Link>
          </span>
        </div>
        <div className="ad-grid-3" style={{ gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Ring value={adminMemoryEvolution.memoryRate} label="记忆使用" color="var(--ad-green)" />
            <span className="ad-sb-note">{adminMemoryEvolution.memoryNote}</span>
          </div>
          <div>
            <svg className="ad-timeline" viewBox="0 0 300 84" preserveAspectRatio="none" style={{ maxHeight: 96 }}>
              <line x1="16" y1="70" x2="284" y2="70" stroke="var(--ad-border)" strokeWidth="1" />
              <path d={tlPath} fill="none" stroke="var(--ad-cyan)" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.5))' }} />
              {tlPoints.map((p, i) => {
                const x = 16 + (i / (tlPoints.length - 1)) * 268
                const y = 70 - ((p.rate - 44) / 24) * 56
                return (
                  <g key={p.period}>
                    <circle cx={x} cy={y} r="3" fill="var(--ad-card)" stroke="var(--ad-cyan)" strokeWidth="1.5" />
                    <text x={x} y="82" textAnchor="middle" fontSize="8" fill="var(--ad-muted)">{p.period}</text>
                  </g>
                )
              })}
            </svg>
            <div className="ad-metric-row" style={{ marginTop: 'var(--space-3)' }}>
              {adminMemoryEvolution.deltas.map((d) => (
                <div className="ad-metric" key={d.label}>
                  <span className="k">{d.label}</span>
                  <span className="v" style={{ color: 'var(--ad-green)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ad-card" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid var(--ad-border-soft)', padding: 'var(--space-4)' }}>
            <div className="ad-metric">
              <span className="k">{adminMemoryEvolution.metric.k}</span>
              <span className="v">{adminMemoryEvolution.metric.v}</span>
              <span className="ad-sb-note">{adminMemoryEvolution.metric.note}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
