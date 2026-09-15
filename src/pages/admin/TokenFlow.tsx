import { useState, Fragment } from 'react'
import { tokenUsage } from '../../data/fixtures'

const formatYi = (n: number) => (n / 100000000).toFixed(2) + ' 亿'

const kpiCards = [
  { label: '月度 Token 预算', value: '12.31 亿', subs: [{ text: '预算执行', value: '68.4%', cls: 'ok' as const }], icon: '₮', tone: 'cyan' },
  { label: '实际消耗', value: '8.42 亿', subs: [{ text: '无优化基线', value: '10.35 亿', cls: 'warn' as const }], icon: '◐', tone: 'blue' },
  { label: '本月避免消耗', value: '1.93 亿', subs: [{ text: '节省成本', value: '¥5.8 万', cls: 'ok' as const }], icon: '↓', tone: 'green' },
  { label: '本月任务总数', value: '1,605', subs: [{ text: '覆盖部门', value: '42', cls: 'ok' as const }], icon: '✓', tone: 'red' },
]

const resultColorMap: Record<string, string> = {
  success: 'var(--ad-green)',
  warning: 'var(--ad-amber)',
  danger: 'var(--ad-red)',
}

const savingsFormulas = [
  { type: '模型路由节省', formula: '强模型基准消耗 − 实际轻量模型消耗 − 路由判定开销', example: '22,000 − 14,880 − 800 = 6,320' },
  { type: '缓存节省', formula: '全量重算基准 − 实际缓存命中消耗 − 缓存维护开销', example: '16,400 − 2,800 − 200 = 13,400' },
  { type: '上下文节省', formula: '原始上下文基准 − 压缩后实际消耗 − 压缩处理开销', example: '18,000 − 12,400 − 400 = 5,200' },
  { type: '循环控制节省', formula: '无限制循环基准 − 实际受控循环消耗 − 控制判定开销', example: '8,000 − 0 − 0 = 8,000' },
]

export default function TokenFlow() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null)
  const breakdown = tokenUsage.taskBreakdown
  const departments = tokenUsage.departments as { name: string; budget?: number; used: number; percentage: number; tasks: number; matters: number }[]

  const totalTokens = breakdown.steps.reduce((sum, s) => sum + s.input + s.cached + s.reasoning + s.output + s.tool, 0)
  const colTotals = {
    input: breakdown.steps.reduce((s, r) => s + r.input, 0),
    cached: breakdown.steps.reduce((s, r) => s + r.cached, 0),
    reasoning: breakdown.steps.reduce((s, r) => s + r.reasoning, 0),
    output: breakdown.steps.reduce((s, r) => s + r.output, 0),
    tool: breakdown.steps.reduce((s, r) => s + r.tool, 0),
  }

  const savingsTotal = tokenUsage.savings.reduce((sum, s) => sum + s.saved, 0)
  const savingsBaseline = tokenUsage.savings.reduce((sum, s) => sum + s.baseline, 0)
  const savingsActual = tokenUsage.savings.reduce((sum, s) => sum + s.actual, 0)
  const savingsOverhead = tokenUsage.savings.reduce((sum, s) => sum + s.overhead, 0)

  const toggleDept = (name: string) => setExpandedDept((prev) => (prev === name ? null : name))

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">Token 与算力</div>
          <div className="ad-header-sub">预算 · 部门分布 · 模型分布 · 结果归因 · 单任务分解 · 节省口径</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 2026-09 月度</span>
        </div>
      </div>

      {/* KPI 四卡 */}
      <div className="ad-kpi-grid">
        {kpiCards.map((k) => (
          <div className="ad-card ad-kpi" key={k.label}>
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

      {/* 部门 Token 分布 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          部门 Token 分布
          <span className="sub">点击行展开部门明细</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>部门</th>
                <th style={{ width: '100px' }}>预算</th>
                <th style={{ width: '100px' }}>已用</th>
                <th style={{ width: '220px' }}>全市占比</th>
                <th style={{ width: '80px' }}>任务数</th>
                <th style={{ width: '80px' }}>事项数</th>
                <th style={{ width: '36px' }}></th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <Fragment key={d.name}>
                  <tr
                    onClick={() => toggleDept(d.name)}
                    style={{ cursor: 'pointer', background: expandedDept === d.name ? 'rgba(0,212,255,0.04)' : undefined }}
                  >
                    <td style={{ fontWeight: 500 }}>{d.name}</td>
                    <td className="ad-num" style={{ color: 'var(--ad-muted)' }}>{d.budget ? formatYi(d.budget) : '—'}</td>
                    <td className="ad-num">{formatYi(d.used)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(138,163,199,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${d.percentage}%`, height: '100%', background: 'linear-gradient(90deg, rgba(0,168,232,0.5), var(--ad-cyan))', borderRadius: '4px' }} />
                        </div>
                        <span className="ad-num" style={{ fontSize: 'var(--text-xs)', width: '36px', textAlign: 'right' }}>{d.percentage}%</span>
                      </div>
                    </td>
                    <td className="ad-num">{d.tasks}</td>
                    <td className="ad-num">{d.matters}</td>
                    <td style={{ color: 'var(--ad-muted)', textAlign: 'center' }}>{expandedDept === d.name ? '▲' : '▼'}</td>
                  </tr>
                  {expandedDept === d.name && (
                    <tr>
                      <td colSpan={7} style={{ background: 'rgba(0,212,255,0.04)', padding: 'var(--space-4)' }}>
                        <div className="ad-metric-row">
                          <div className="ad-metric">
                            <span className="k">部门预算</span>
                            <span className="v" style={{ fontSize: 'var(--text-md)' }}>{d.budget ? formatYi(d.budget) : '未分配'}</span>
                          </div>
                          <div className="ad-metric">
                            <span className="k">预算使用率</span>
                            <span className="v" style={{ fontSize: 'var(--text-md)', color: d.budget ? 'var(--ad-amber)' : 'var(--ad-muted)' }}>
                              {d.budget ? ((d.used / d.budget) * 100).toFixed(1) + '%' : '—'}
                            </span>
                          </div>
                          <div className="ad-metric">
                            <span className="k">平均 Token / 任务</span>
                            <span className="v" style={{ fontSize: 'var(--text-md)' }}>{Math.round(d.used / d.tasks).toLocaleString()}</span>
                          </div>
                          <div className="ad-metric">
                            <span className="k">全市占比</span>
                            <span className="v" style={{ fontSize: 'var(--text-md)', color: 'var(--ad-cyan)' }}>{d.percentage}%</span>
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

      {/* 模型分布 + 结果归因 */}
      <div className="ad-grid-2 mb-4">
        <div className="ad-card">
          <div className="ad-card-title">模型分布<span className="sub">本月 · 按 Token 用量</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', height: '32px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              {tokenUsage.models.map((m, i) => (
                <div key={m.name} style={{
                  width: `${m.percentage}%`,
                  background: ['var(--ad-cyan)', 'var(--ad-blue)', 'var(--ad-green)'][i],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#04121f',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                }}>{m.percentage}%</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {tokenUsage.models.map((m, i) => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: ['var(--ad-cyan)', 'var(--ad-blue)', 'var(--ad-green)'][i] }} />
                  <span style={{ fontSize: 'var(--text-sm)' }}>{m.name}</span>
                  <span className="ad-num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{m.percentage}%</span>
                  <span className="ad-num" style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-muted)' }}>({formatYi(m.tokens)})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">结果归因<span className="sub">消耗去向 · 本月</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {tokenUsage.resultAttribution.map((r) => (
              <div key={r.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{r.name}</span>
                  <span className="ad-num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: resultColorMap[r.color] }}>{r.percentage}%</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(138,163,199,0.12)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.percentage}%`, height: '100%', background: resultColorMap[r.color], borderRadius: '5px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 算力节省明细 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          算力节省明细
          <span className="sub">基线 10.35 亿 → 实际 8.42 亿 · 本月避免 1.93 亿</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>优化类型</th>
                <th style={{ width: '110px' }}>基准</th>
                <th style={{ width: '110px' }}>实际</th>
                <th style={{ width: '90px' }}>开销</th>
                <th style={{ width: '110px' }}>节省</th>
                <th style={{ width: '160px' }}>节省占比</th>
              </tr>
            </thead>
            <tbody>
              {tokenUsage.savings.map((s) => (
                <tr key={s.type}>
                  <td style={{ fontWeight: 500 }}>{s.type}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-muted)' }}>{formatYi(s.baseline)}</td>
                  <td className="ad-num">{formatYi(s.actual)}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-amber)' }}>{s.overhead.toLocaleString()}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-green)', fontWeight: 600 }}>{formatYi(s.saved)}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{ flex: 1, height: '6px', background: 'rgba(138,163,199,0.12)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(s.saved / s.baseline * 100).toFixed(0)}%`, height: '100%', background: 'var(--ad-green)' }} />
                      </div>
                      <span className="ad-num" style={{ fontSize: 'var(--text-xs)', width: '36px', textAlign: 'right' }}>{(s.saved / s.baseline * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600 }}>
                <td>合计</td>
                <td className="ad-num">{formatYi(savingsBaseline)}</td>
                <td className="ad-num">{formatYi(savingsActual)}</td>
                <td className="ad-num" style={{ color: 'var(--ad-amber)' }}>{savingsOverhead.toLocaleString()}</td>
                <td className="ad-num" style={{ color: 'var(--ad-green)' }}>{formatYi(savingsTotal)}</td>
                <td className="ad-num" style={{ color: 'var(--ad-green)' }}>{(savingsTotal / savingsBaseline * 100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 单任务 Token 分解 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          单任务 Token 分解 · {breakdown.taskId}
          <span className="sub">白盒口径 · 输入 / 缓存 / 推理 / 输出 / 工具</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>步骤</th>
                <th style={{ width: '100px' }}>输入</th>
                <th style={{ width: '100px' }}>缓存</th>
                <th style={{ width: '100px' }}>推理</th>
                <th style={{ width: '100px' }}>输出</th>
                <th style={{ width: '100px' }}>工具</th>
                <th style={{ width: '100px' }}>小计</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.steps.map((s, i) => {
                const rowTotal = s.input + s.cached + s.reasoning + s.output + s.tool
                return (
                  <tr key={i}>
                    <td>{s.step}</td>
                    <td className="ad-num">{s.input.toLocaleString()}</td>
                    <td className="ad-num" style={{ color: 'var(--ad-green)' }}>{s.cached.toLocaleString()}</td>
                    <td className="ad-num">{s.reasoning.toLocaleString()}</td>
                    <td className="ad-num">{s.output.toLocaleString()}</td>
                    <td className="ad-num">{s.tool.toLocaleString()}</td>
                    <td className="ad-num" style={{ fontWeight: 600 }}>{rowTotal.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600 }}>
                <td>合计</td>
                <td className="ad-num">{colTotals.input.toLocaleString()}</td>
                <td className="ad-num" style={{ color: 'var(--ad-green)' }}>{colTotals.cached.toLocaleString()}</td>
                <td className="ad-num">{colTotals.reasoning.toLocaleString()}</td>
                <td className="ad-num">{colTotals.output.toLocaleString()}</td>
                <td className="ad-num">{colTotals.tool.toLocaleString()}</td>
                <td className="ad-num">{totalTokens.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 节省口径说明 */}
      <div className="ad-card">
        <div className="ad-card-title">节省口径说明<span className="sub">每项节省 = 基准 − 实际 − 开销</span></div>
        <div className="ad-grid-2">
          {savingsFormulas.map((f) => (
            <div key={f.type} style={{
              padding: 'var(--space-3)',
              background: 'rgba(17, 27, 48, 0.6)',
              border: '1px solid var(--ad-border-soft)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ad-green)', marginBottom: 'var(--space-1)' }}>{f.type}</div>
              <div className="ad-sb-note">{f.formula}</div>
              <div className="ad-num" style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-text)', marginTop: 'var(--space-1)' }}>{f.example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
