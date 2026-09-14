import { riskEvents, dataRiskFlow } from '../../data/fixtures'

const chainColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--warning)',
  'var(--success)',
]

const chainIcons = ['◐', '⬚', '⊕', '→', '⚙', '⊘', '✓']

function statusBadge(status: string) {
  if (status === '已处置' || status === '已修复') return <span className="badge badge-success">{status}</span>
  if (status === '处置中') return <span className="badge badge-warning">{status}</span>
  return <span className="badge badge-danger">{status}</span>
}

const comboEvents = riskEvents.filter(r => r.involvingTool.includes('data.combine'))

const detailPanel = {
  dataCombination: '社保数据 + 住建数据',
  outputLabel: '疑似违规推导',
  hitRule: '跨部门数据组合推导个人敏感信息（B级）',
  confirmStatus: '待数据主管确认',
}

export default function DataRisk() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">数据风险流向<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">从谁发起 → AI读取了什么 → 组合后推导了什么 → 准备传给哪里 → 命中什么规则 → 如何处置 → 是否离开受控边界</div>
      </div>

      <div className="card mb-4">
        <div className="card-title">数据流向链路图</div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
          {dataRiskFlow.chain.map((node, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
              <div style={{
                width: '200px',
                minHeight: '120px',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--muted)',
                border: `2px solid ${chainColors[i]}`,
                borderLeft: `4px solid ${chainColors[i]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: chainColors[i],
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--foreground)' }}>{node.step}</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', marginTop: 'var(--space-1)', lineHeight: 1.5 }}>
                  {node.value}
                </div>
              </div>
              {i < dataRiskFlow.chain.length - 1 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted-foreground)',
                  fontSize: 'var(--text-xl)',
                  flexShrink: 0,
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-4)' }}>
        <div className="card">
          <div className="card-title">疑似违规推导列表</div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>应用</th>
                  <th>部门</th>
                  <th>Agent</th>
                  <th>行为</th>
                  <th>涉及数据</th>
                  <th>涉及工具</th>
                  <th>目的地</th>
                  <th>影响</th>
                  <th>处置</th>
                  <th>责任人</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {comboEvents.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{r.appName}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.department}</td>
                    <td style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)', fontFamily: 'var(--font-code)' }}>{r.agent}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.behavior}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.involvingData}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--warning)' }}>{r.involvingTool}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.destination}</td>
                    <td><span className="badge badge-danger">{r.impact}</span></td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.measure}</td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{r.responsiblePerson}</td>
                    <td>{statusBadge(r.status)}</td>
                  </tr>
                ))}
                {comboEvents.length === 0 && (
                  <tr>
                    <td colSpan={11} style={{ textAlign: 'center', color: 'var(--muted-foreground)', padding: 'var(--space-5)' }}>暂无疑似违规推导记录</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: '60px' }}>
          <div className="card-title">数据组合与输出标签</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ padding: 'var(--space-3)', background: 'var(--danger-soft)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>数据组合</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-md)', fontWeight: 600 }}>
                <span>社保数据</span>
                <span style={{ color: 'var(--danger)' }}>+</span>
                <span>住建数据</span>
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--warning-soft)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>输出标签</div>
              <span className="badge badge-danger" style={{ fontSize: 'var(--text-sm)' }}>{detailPanel.outputLabel}</span>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>命中规则</div>
              <div style={{ fontSize: 'var(--text-sm)' }}>{detailPanel.hitRule}</div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--ui-brand-soft)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>人工确认状态</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="badge badge-warning">待确认</span>
                <span style={{ fontSize: 'var(--text-sm)' }}>{detailPanel.confirmStatus}</span>
              </div>
            </div>

            <div className="divider" style={{ margin: 0 }} />

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
              该数据组合触发跨部门数据组合推导规则，AI在组合社保与住建数据后推导出个人敏感信息，被系统自动标记并阻断，转人工确认后方可继续。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
