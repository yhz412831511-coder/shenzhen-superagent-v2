import { ontologyObjects, ontologyRelations, impactChain } from '../../data/fixtures'

const timelineNodes = [
  {
    date: '2026-08-12',
    title: '重点任务专题调度会（第一次）',
    meetingId: 'MTG-20260812-01',
    known: '项目完成率口径暂未统一，数据口径暂未确认；老系统改造方向待定',
    decided: '确定推进政务服务一件事上线计划；老系统改造方向初步讨论',
    happened: '后续开展了8月25日第二次调度会，确定了老系统改造试点范围',
    valid: true,
    conflict: false,
  },
  {
    date: '2026-08-25',
    title: '重点任务专题调度会（第二次）',
    meetingId: 'MTG-20260825-01',
    known: '一件事上线进度正常推进；老系统改造范围已初步圈定',
    decided: '确定老系统改造试点范围；数据口径启动协调',
    happened: '试点范围已执行，MCP接口测试通过；9月10日发现口径冲突',
    valid: true,
    conflict: false,
  },
  {
    date: '2026-09-10',
    title: '重点任务专题调度会（第三次）',
    meetingId: 'MTG-20260910-01',
    known: '项目系统审核数据为72%；会议纪要记载85%为历史快照；存在口径冲突',
    decided: 'DEC-001 老系统AI接入试点（9/30）；DEC-002 一件事联调上线（9/25）；DEC-003 口径以项目系统为准（draft，口径冲突）',
    happened: '口径冲突待住建局确认；DEC-003标记为草稿状态',
    valid: true,
    conflict: true,
  },
]

const decisionsTimeline = [
  { id: 'DEC-001', content: '9月底前完成老系统项目查询能力AI接入试点', meeting: '9/10', status: 'valid', label: '有效' },
  { id: 'DEC-002', content: '政务服务一件事9月25日前完成联调上线', meeting: '9/10', status: 'valid', label: '有效' },
  { id: 'DEC-003', content: '项目数据口径以项目系统审核数据为准', meeting: '9/10', status: 'superseded', label: '被替代', conflict: true },
  { id: 'DEC-OLD-01', content: '项目完成率85%（历史快照口径）', meeting: '8/12', status: 'superseded', label: '被替代' },
  { id: 'DEC-OLD-02', content: '老系统改造方向确定', meeting: '8/25', status: 'valid', label: '有效' },
]

const relationBadge: Record<string, string> = {
  '已确认': 'badge badge-success',
  '待确认': 'badge badge-warning',
  'AI推断': 'badge badge-info',
}

const impactTypeColor: Record<string, string> = {
  origin: 'var(--primary)',
  dependency: 'var(--warning)',
  dependent: 'var(--success)',
  decision: 'var(--chart-5)',
  'impact-high': 'var(--danger)',
  'impact-medium': 'var(--warning)',
}

const impactLabel: Record<string, string> = {
  origin: '起源',
  dependency: '依赖',
  dependent: '被依赖',
  decision: '决议',
  'impact-high': '高影响',
  'impact-medium': '中影响',
}

export default function TimelineOntology() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">会议情景时间线与本体关系</h1>
        <p className="page-subtitle">事项 MATTER-2026-0912 · 3次调度会议 · 5条决议 · 12条本体关系</p>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">会议情景时间线</h2>

        <div style={{ position: 'relative', paddingLeft: 'var(--space-6)' }}>
          {timelineNodes.map((node, idx) => (
            <div
              key={node.meetingId}
              style={{
                position: 'relative',
                paddingBottom: idx === timelineNodes.length - 1 ? 0 : 'var(--space-6)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: node.conflict ? 'var(--danger)' : 'var(--primary)',
                  border: '2px solid var(--card)',
                  boxShadow: `0 0 0 2px ${node.conflict ? 'var(--danger)' : 'var(--primary)'}`,
                }}
              />
              {idx < timelineNodes.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '-23px',
                    top: '16px',
                    bottom: '0',
                    width: '2px',
                    background: 'var(--border)',
                  }}
                />
              )}

              <div
                style={{
                  border: `1px solid ${node.conflict ? 'var(--danger)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  background: node.conflict ? 'var(--danger-soft)' : 'var(--card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--foreground)' }}>{node.date}</span>
                    <span className="tag" style={{ fontFamily: 'var(--font-code)' }}>{node.meetingId}</span>
                    {node.conflict && <span className="badge badge-danger">口径冲突</span>}
                  </div>
                  {node.valid ? (
                    <span className="badge badge-success">当前有效</span>
                  ) : (
                    <span className="badge badge-muted">已归档</span>
                  )}
                </div>

                <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)', marginBottom: 'var(--space-3)' }}>
                  {node.title}
                </div>

                <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
                  <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '2px' }}>当时知道什么</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{node.known}</div>
                  </div>
                  <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--ui-brand-soft)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '2px' }}>做了什么决定</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{node.decided}</div>
                  </div>
                  <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--success-soft)', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '2px' }}>后来发生什么</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{node.happened}</div>
                  </div>
                  <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: '2px' }}>当前是否有效</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      {node.valid ? (
                        <span className="badge badge-success">有效</span>
                      ) : (
                        <span className="badge badge-muted">已归档</span>
                      )}
                      {node.conflict && <span className="badge badge-danger">需确认</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        <div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>决议有效性追踪</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {decisionsTimeline.map((d) => (
              <div
                key={d.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: d.conflict ? 'var(--danger-soft)' : 'var(--card)',
                }}
              >
                <span className="tag" style={{ fontFamily: 'var(--font-code)' }}>{d.id}</span>
                <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{d.content}</span>
                <span className="tag">{d.meeting}</span>
                {d.status === 'valid' ? (
                  <span className="badge badge-success">{d.label}</span>
                ) : (
                  <span className="badge badge-warning">{d.label}</span>
                )}
                {d.conflict && <span className="badge badge-danger">冲突</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">本体关系图</h2>

        <div className="grid" style={{ gridTemplateColumns: '300px 1fr', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              对象列表（{ontologyObjects.length}）
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {ontologyObjects.map((obj) => (
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '2px',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className="tag">{obj.type}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)' }}>{obj.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              关系链路图（{ontologyRelations.length}条关系）
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {ontologyRelations.map((rel, idx) => (
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
          {impactChain.question}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          {impactChain.chain.map((c, idx) => (
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
              {idx < impactChain.chain.length - 1 && (
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
            {impactChain.impactTable.map((row, idx) => (
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
