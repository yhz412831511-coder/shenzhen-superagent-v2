import { aiExecutionCards, tokenUsage } from '../../data/fixtures'

const cardKeys = ['why', 'used', 'did', 'controlled', 'trustworthy'] as const

const cardAccent: Record<string, { color: string; bg: string }> = {
  why: { color: 'var(--primary)', bg: 'var(--ui-brand-soft)' },
  used: { color: 'var(--success)', bg: 'var(--success-soft)' },
  did: { color: 'var(--warning)', bg: 'var(--warning-soft)' },
  controlled: { color: 'var(--danger)', bg: 'var(--danger-soft)' },
  trustworthy: { color: 'var(--chart-5)', bg: '#f3eeff' },
}

const stepColors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--chart-5)', 'var(--danger)', 'var(--chart-1)', 'var(--muted-foreground)']

const steps = tokenUsage.taskBreakdown.steps
const totals = steps.reduce(
  (acc, s) => ({
    input: acc.input + s.input,
    cached: acc.cached + s.cached,
    reasoning: acc.reasoning + s.reasoning,
    output: acc.output + s.output,
    tool: acc.tool + s.tool,
  }),
  { input: 0, cached: 0, reasoning: 0, output: 0, tool: 0 }
)
const grandTotal = totals.input + totals.cached + totals.reasoning + totals.output + totals.tool

const tokenCols = [
  { key: 'input', label: '输入Token', color: 'var(--primary)' },
  { key: 'cached', label: '缓存Token', color: 'var(--success)' },
  { key: 'reasoning', label: '推理Token', color: 'var(--warning)' },
  { key: 'output', label: '输出Token', color: 'var(--chart-5)' },
  { key: 'tool', label: '工具Token', color: 'var(--danger)' },
] as const

function fmtNum(n: number) {
  return n.toLocaleString()
}

export default function AIExecution() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI执行说明与完整回放</h1>
        <p className="page-subtitle">
          task_id=TASK-20260910-0086 · matter_id=MATTER-2026-0912 · trace_id=TRACE-20260914-0920-0086
        </p>
      </div>

      <div className="mb-4">
        <h2 className="card-title" style={{ marginBottom: 'var(--space-4)' }}>AI执行说明</h2>
        <div className="grid grid-3" style={{ gap: 'var(--space-4)' }}>
          {cardKeys.map((key) => {
            const card = aiExecutionCards[key]
            const accent = cardAccent[key]
            return (
              <div key={key} className="card" style={{ borderTop: `3px solid ${accent.color}` }}>
                <div
                  className="ai-card-title"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-md)',
                    fontWeight: 600,
                    color: accent.color,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-sm)',
                      background: accent.bg,
                      fontSize: 'var(--text-sm)',
                    }}
                  >
                    {key === 'why' ? '?' : key === 'used' ? '+' : key === 'did' ? '>' : key === 'controlled' ? '!' : '*'}
                  </span>
                  {card.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {card.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        padding: 'var(--space-2)',
                        background: 'var(--muted)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{item.label}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">完整回放</h2>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            padding: 'var(--space-3)',
            background: 'var(--muted)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-5)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--muted-foreground)' }}>task_id: </span>
            <span style={{ fontFamily: 'var(--font-code)', color: 'var(--primary)', fontWeight: 500 }}>TASK-20260910-0086</span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--muted-foreground)' }}>matter_id: </span>
            <span style={{ fontFamily: 'var(--font-code)', color: 'var(--success)', fontWeight: 500 }}>MATTER-2026-0912</span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--muted-foreground)' }}>trace_id: </span>
            <span style={{ fontFamily: 'var(--font-code)', color: 'var(--chart-5)', fontWeight: 500 }}>TRACE-20260914-0920-0086</span>
          </div>
        </div>

        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-4)' }}>
          任务轨迹时间线（{steps.length}个步骤）
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>步骤</th>
                {tokenCols.map((c) => (
                  <th key={c.key} style={{ textAlign: 'right', minWidth: '100px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c.color }} />
                      {c.label}
                    </span>
                  </th>
                ))}
                <th style={{ textAlign: 'right', minWidth: '100px' }}>小计</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((s, idx) => {
                const stepTotal = s.input + s.cached + s.reasoning + s.output + s.tool
                return (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: stepColors[idx % stepColors.length],
                            color: '#fff',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 500,
                            flexShrink: 0,
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{s.step}</span>
                      </div>
                    </td>
                    {tokenCols.map((c) => (
                      <td key={c.key} style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)' }}>
                        {s[c.key] > 0 ? (
                          <span style={{ color: c.color }}>{fmtNum(s[c.key])}</span>
                        ) : (
                          <span style={{ color: 'var(--muted-foreground)' }}>-</span>
                        )}
                      </td>
                    ))}
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--foreground)' }}>
                      {fmtNum(stepTotal)}
                    </td>
                  </tr>
                )
              })}
              <tr style={{ borderTop: '2px solid var(--border)' }}>
                <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>Token 总计</td>
                {tokenCols.map((c) => (
                  <td key={c.key} style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', fontWeight: 600, color: c.color }}>
                    {fmtNum(totals[c.key])}
                  </td>
                ))}
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--primary)' }}>
                  {fmtNum(grandTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="divider" />

        <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              Token 分布
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {tokenCols.map((c) => {
                const val = totals[c.key]
                const pct = grandTotal > 0 ? (val / grandTotal) * 100 : 0
                return (
                  <div key={c.key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{c.label}</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-code)', color: 'var(--foreground)' }}>
                        {fmtNum(val)} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--muted)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: c.color, borderRadius: '4px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              成本归集
            </div>
            <table>
              <thead>
                <tr>
                  <th>节省项</th>
                  <th style={{ textAlign: 'right' }}>基线</th>
                  <th style={{ textAlign: 'right' }}>实际</th>
                  <th style={{ textAlign: 'right' }}>开销</th>
                  <th style={{ textAlign: 'right' }}>节省</th>
                </tr>
              </thead>
              <tbody>
                {tokenUsage.savings.map((s, idx) => (
                  <tr key={idx}>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{s.type}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{fmtNum(s.baseline)}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--foreground)' }}>{fmtNum(s.actual)}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{fmtNum(s.overhead)}</td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--success)' }}>-{fmtNum(s.saved)}</td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid var(--border)' }}>
                  <td style={{ fontWeight: 600 }}>合计节省</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-code)', fontWeight: 700, color: 'var(--success)' }}>
                    -{fmtNum(tokenUsage.savings.reduce((a, s) => a + s.saved, 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
