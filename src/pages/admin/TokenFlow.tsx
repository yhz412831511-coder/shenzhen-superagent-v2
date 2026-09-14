import { useState, Fragment } from 'react'
import { tokenUsage } from '../../data/fixtures'

const formatM = (n: number) => (n / 1000000).toFixed(1) + 'M'

const statCards = [
  { label: '全市Token预算', value: '50M', sub: '年度总额', icon: '₮', color: 'var(--primary)' },
  { label: '已用Token', value: '41.2M', sub: '占比 82.4%', icon: '◐', color: 'var(--warning)' },
  { label: '算力节省', value: '3.3M', sub: '模型路由+缓存+上下文+循环', icon: '↓', color: 'var(--success)' },
  { label: '任务总数', value: '1,605', sub: '覆盖12个部门', icon: '✓', color: 'var(--chart-5)' },
]

const colorMap: Record<string, string> = {
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
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
  const departments = tokenUsage.departments as any[]

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

  const toggleDept = (name: string) => {
    setExpandedDept(prev => prev === name ? null : name)
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Token流向与算力效能<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">全市Token预算与消耗 · 部门分布 · 模型分布 · 结果归因 · 单任务分解 · 算力节省明细</div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 'var(--space-5)' }}>
        {statCards.map((s) => (
          <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '44px',
              height: '44px',
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
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">部门Token分布</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>部门</th>
                <th>预算</th>
                <th>已用</th>
                <th style={{ width: '200px' }}>占比</th>
                <th>任务数</th>
                <th>事项数</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <Fragment key={d.name}>
                  <tr
                    onClick={() => toggleDept(d.name)}
                    style={{ cursor: 'pointer', background: expandedDept === d.name ? 'var(--muted)' : undefined }}
                  >
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{d.name}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{d.budget ? formatM(d.budget) : '—'}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{formatM(d.used)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div style={{ flex: 1, height: '8px', background: 'var(--muted)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${d.percentage}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
                        </div>
                        <span style={{ fontSize: 'var(--text-xs)', width: '36px', textAlign: 'right' }}>{d.percentage}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>{d.tasks}</td>
                    <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>{d.matters}</td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', textAlign: 'center' }}>
                      {expandedDept === d.name ? '▲' : '▼'}
                    </td>
                  </tr>
                  {expandedDept === d.name && (
                    <tr>
                      <td colSpan={7} style={{ background: 'var(--muted)', padding: 'var(--space-4)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>部门预算</div>
                            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{d.budget ? formatM(d.budget) : '未分配'}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>预算使用率</div>
                            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: d.budget ? 'var(--warning)' : 'var(--muted-foreground)' }}>
                              {d.budget ? ((d.used / d.budget) * 100).toFixed(1) + '%' : '—'}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>平均Token/任务</div>
                            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{Math.round(d.used / d.tasks).toLocaleString()}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>全市占比</div>
                            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{d.percentage}%</div>
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

      <div className="grid grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card">
          <div className="card-title">模型分布</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', height: '32px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              {tokenUsage.models.map((m, i) => (
                <div key={m.name} style={{
                  width: `${m.percentage}%`,
                  background: `var(--chart-${i + 1})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                }}>{m.percentage}%</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {tokenUsage.models.map((m, i) => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: `var(--chart-${i + 1})` }} />
                  <span style={{ fontSize: 'var(--text-sm)' }}>{m.name}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{m.percentage}%</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>({formatM(m.tokens)})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">结果归因</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {tokenUsage.resultAttribution.map((r) => (
              <div key={r.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{r.name}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: colorMap[r.color] }}>{r.percentage}%</span>
                </div>
                <div style={{ height: '10px', background: 'var(--muted)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${r.percentage}%`, height: '100%', background: colorMap[r.color], borderRadius: '5px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">单任务Token分解 · {breakdown.taskId}</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>步骤</th>
                <th style={{ width: '90px' }}>输入Token</th>
                <th style={{ width: '90px' }}>缓存Token</th>
                <th style={{ width: '90px' }}>推理Token</th>
                <th style={{ width: '90px' }}>输出Token</th>
                <th style={{ width: '90px' }}>工具Token</th>
                <th style={{ width: '90px' }}>小计</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.steps.map((s, i) => {
                const rowTotal = s.input + s.cached + s.reasoning + s.output + s.tool
                return (
                  <tr key={i}>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{s.step}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.input.toLocaleString()}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--success)' }}>{s.cached.toLocaleString()}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.reasoning.toLocaleString()}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.output.toLocaleString()}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.tool.toLocaleString()}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', fontWeight: 600 }}>{rowTotal.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600, background: 'var(--muted)' }}>
                <td>合计</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{colTotals.input.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)', color: 'var(--success)' }}>{colTotals.cached.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{colTotals.reasoning.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{colTotals.output.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{colTotals.tool.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{totalTokens.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">算力节省明细</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>类型</th>
                <th style={{ width: '100px' }}>基准</th>
                <th style={{ width: '100px' }}>实际</th>
                <th style={{ width: '100px' }}>开销</th>
                <th style={{ width: '100px' }}>节省</th>
                <th style={{ width: '140px' }}>节省占比</th>
              </tr>
            </thead>
            <tbody>
              {tokenUsage.savings.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{s.type}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.baseline.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.actual.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--warning)' }}>{s.overhead.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', fontWeight: 600, color: 'var(--success)' }}>{s.saved.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(s.saved / s.baseline * 100).toFixed(0)}%`, height: '100%', background: 'var(--success)' }} />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', width: '36px', textAlign: 'right' }}>{(s.saved / s.baseline * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ fontWeight: 600, background: 'var(--muted)' }}>
                <td>合计</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{savingsBaseline.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)' }}>{savingsActual.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)', color: 'var(--warning)' }}>{savingsOverhead.toLocaleString()}</td>
                <td style={{ fontFamily: 'var(--font-code)', color: 'var(--success)' }}>{savingsTotal.toLocaleString()}</td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--success)' }}>{(savingsTotal / savingsBaseline * 100).toFixed(1)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--muted)' }}>
        <div className="card-title">节省口径说明</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
          {savingsFormulas.map((f) => (
            <div key={f.type} style={{ padding: 'var(--space-3)', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--success)', marginBottom: 'var(--space-1)' }}>{f.type}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>{f.formula}</div>
              <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-code)', color: 'var(--foreground)' }}>{f.example}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
