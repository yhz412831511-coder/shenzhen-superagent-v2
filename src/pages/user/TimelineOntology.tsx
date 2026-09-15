import { partyOntologyObjects, partyOntologyRelations, partyImpactChain } from '../../data/fixtures-party'

const relationBadge: Record<string, string> = {
  '已确认': 'badge badge-success',
  '待确认': 'badge badge-warning',
  'AI推断': 'badge badge-info',
}

const impactTypeColor: Record<string, string> = {
  origin: 'var(--primary)',
  dependency: 'var(--warning)',
  action: 'var(--chart-3)',
  dependent: 'var(--success)',
  'impact-high': 'var(--danger)',
  'impact-medium': 'var(--warning)',
}

const impactLabel: Record<string, string> = {
  origin: '起源',
  dependency: '冲突',
  action: '动作',
  dependent: '被依赖',
  'impact-high': '高影响',
  'impact-medium': '中影响',
}

export default function TimelineOntology() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">本体关系</h1>
        <p className="page-subtitle">
          事项 MATTER-2026-0918 · 局党组第13次会议会前准备 · {partyOntologyObjects.length} 类对象 · {partyOntologyRelations.length} 条关系 · 演示样例
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">本体关系图</h2>

        <div className="grid" style={{ gridTemplateColumns: '320px 1fr', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              对象列表（{partyOntologyObjects.length}）
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {partyOntologyObjects.map((obj) => (
                <div
                  key={obj.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--card)',
                    transition: 'background 0.15s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--ui-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--card)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '2px',
                        flexShrink: 0,
                        background:
                          obj.type === '核心对象' ? 'var(--primary)' :
                          obj.type === '组织对象' ? 'var(--success)' :
                          obj.type === '规则对象' ? 'var(--warning)' :
                          obj.type === '技术对象' ? 'var(--chart-5)' :
                          obj.type === '能力对象' ? 'var(--chart-3)' :
                          obj.type === '记忆对象' ? 'var(--chart-1)' :
                          obj.type === '证据对象' ? 'var(--danger)' :
                          'var(--muted-foreground)',
                      }}
                    />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{obj.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
                    <span className="tag">{obj.type}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)' }}>{obj.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              关系链路图（{partyOntologyRelations.length}条关系）
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {partyOntologyRelations.map((rel, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--card)',
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--space-1) var(--space-3)',
                      border: '1px solid var(--primary)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--primary)',
                      background: 'var(--ui-brand-soft)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rel.from}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '20px', height: '2px', background: 'var(--border)' }} />
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--muted-foreground)' }} />
                      <div style={{ width: '20px', height: '2px', background: 'var(--border)' }} />
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)', marginTop: '2px' }}>
                      {rel.relation}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: 'var(--space-1) var(--space-3)',
                      border: '1px solid var(--success)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--success)',
                      background: 'var(--success-soft)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rel.to}
                  </div>
                  <div style={{ flex: 1 }} />
                  <span className={relationBadge[rel.type]}>{rel.type}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)' }}>x{rel.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">影响推演</h2>
        <div
          style={{
            padding: 'var(--space-3)',
            background: 'var(--ui-brand-soft)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--text-md)',
            color: 'var(--primary)',
            fontWeight: 500,
          }}
        >
          {partyImpactChain.question}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          {partyImpactChain.chain.map((c, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <div
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: `1px solid ${impactTypeColor[c.type] || 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--card)',
                }}
              >
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{impactLabel[c.type] || c.type}</div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--foreground)' }}>{c.node}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>{c.detail}</div>
              </div>
              {idx < partyImpactChain.chain.length - 1 && (
                <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-md)' }}>&rarr;</span>
              )}
            </div>
          ))}
        </div>

        <div className="divider" />

        <table>
          <thead>
            <tr>
              <th>受影响对象</th>
              <th>关系</th>
              <th>影响级别</th>
              <th>建议</th>
            </tr>
          </thead>
          <tbody>
            {partyImpactChain.impactTable.map((row, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500, color: 'var(--foreground)' }}>{row.object}</td>
                <td>{row.relation}</td>
                <td>
                  <span className={`badge ${row.level === '高' ? 'badge-danger' : 'badge-warning'}`}>{row.level}</span>
                </td>
                <td style={{ color: 'var(--muted-foreground)' }}>{row.suggestion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
