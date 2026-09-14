import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { matters, meetings, tasks, memoryTypes, aiExecutionCards } from '../../data/fixtures'

const tabs = [
  '事项概览',
  'AI执行计划',
  '材料与证据',
  '会议与决议',
  '任务与督办',
  '系统操作',
  '使用的记忆',
  'Token与模型',
  '风险与审批',
  '完整回放',
]

const matterStatusMap: Record<string, { label: string; badge: string }> = {
  active: { label: '进行中', badge: 'badge-info' },
  pending: { label: '待处理', badge: 'badge-warning' },
  overdue: { label: '已超期', badge: 'badge-danger' },
  completed: { label: '已完成', badge: 'badge-success' },
}

const decisionStatusMap: Record<string, { label: string; badge: string }> = {
  draft: { label: '待确认', badge: 'badge-warning' },
  confirmed: { label: '已确认', badge: 'badge-success' },
  superseded: { label: '已替代', badge: 'badge-muted' },
}

const taskStatusMap: Record<string, { label: string; badge: string }> = {
  not_started: { label: '未开始', badge: 'badge-muted' },
  in_progress: { label: '进行中', badge: 'badge-info' },
  waiting: { label: '等待中', badge: 'badge-warning' },
  completed: { label: '已完成', badge: 'badge-success' },
  overdue: { label: '已超期', badge: 'badge-danger' },
  blocked: { label: '已阻塞', badge: 'badge-danger' },
}

const stepList = ['提取', '对齐本体', '完整性检查', '确认', '写回预览']

export default function MatterDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState(0)

  const matter = matters.find(m => m.id === id) || matters[0]
  const matterMeetings = meetings.filter(m => m.matterId === matter.id)
  const allDecisions = matterMeetings.flatMap(m => m.decisions)
  const matterTasks = tasks.filter(t => t.matterId === matter.id)
  const st = matterStatusMap[matter.status] || matterStatusMap.active
  const tokenPct = Math.round((matter.tokenUsed / matter.tokenBudget) * 100)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{matter.title}</h1>
        <p className="page-subtitle">{matter.id} · {matter.type} · {matter.description}</p>
      </div>

      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          overflowX: 'auto',
          marginBottom: 'var(--space-4)',
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--text-md)',
              color: activeTab === i ? 'var(--primary)' : 'var(--muted-foreground)',
              borderBottom: activeTab === i ? '2px solid var(--primary)' : '2px solid transparent',
              whiteSpace: 'nowrap',
              fontWeight: activeTab === i ? 600 : 400,
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="grid grid-2">
          <div className="card">
            <div className="card-title">事项基本信息</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{matter.title}</span>
                <span className="tag">{matter.type}</span>
                <span className={`badge ${st.badge}`}>{st.label}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {matter.participants.map(p => (
                  <span key={p} className="badge badge-muted">{p}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                <div><span style={{ color: 'var(--muted-foreground)' }}>创建时间 </span>{matter.createdAt}</div>
                <div><span style={{ color: 'var(--muted-foreground)' }}>截止时间 </span>{matter.dueDate}</div>
                <div><span style={{ color: 'var(--muted-foreground)' }}>更新时间 </span>{matter.updatedAt}</div>
                <div><span style={{ color: 'var(--muted-foreground)' }}>待确认 </span>{matter.pendingConfirmations} 项</div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>进度</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)' }}>{matter.progress}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${matter.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">AI执行计划摘要</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {aiExecutionCards.why.items.slice(0, 2).map(item => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{item.label}</span>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{item.value}</span>
                </div>
              ))}
              {aiExecutionCards.did.items.slice(0, 2).map(item => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{item.label}</span>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{item.value}</span>
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>Token预算</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{matter.tokenUsed.toLocaleString()} / {matter.tokenBudget.toLocaleString()}</span>
              </div>
              <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${tokenPct}%`, height: '100%', background: tokenPct > 80 ? 'var(--warning)' : 'var(--success)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card">
            <div className="card-title">任务启动卡</div>
            <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>目标</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{aiExecutionCards.why.items[0].value}</div>
              </div>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>关联事项</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{matter.title}</div>
              </div>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>计划输出</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{aiExecutionCards.did.items.map(i => i.value).join('；')}</div>
              </div>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>记忆范围</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{aiExecutionCards.used.items.map(i => `${i.label}: ${i.value}`).join('；')}</div>
              </div>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>系统</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{aiExecutionCards.used.items[0].value}</div>
              </div>
              <div style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>审批点</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{aiExecutionCards.controlled.items.map(i => i.value).join('；')}</div>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Token预算</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{matter.tokenUsed.toLocaleString()} / {matter.tokenBudget.toLocaleString()} ({tokenPct}%)</span>
              </div>
              <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${tokenPct}%`, height: '100%', background: tokenPct > 80 ? 'var(--warning)' : 'var(--success)', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">执行步骤</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {stepList.map((step, i) => {
                const done = i < 3
                const current = i === 3
                return (
                  <div
                    key={step}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                      paddingBottom: 'var(--space-3)',
                      borderBottom: i < stepList.length - 1 ? '1px solid var(--border)' : 'none',
                      marginBottom: i < stepList.length - 1 ? 'var(--space-3)' : '0',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        flexShrink: 0,
                        background: done ? 'var(--success)' : current ? 'var(--primary)' : 'var(--muted)',
                        color: done || current ? '#fff' : 'var(--muted-foreground)',
                      }}
                    >
                      {done ? '✓' : i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: done || current ? 'var(--foreground)' : 'var(--muted-foreground)' }}>{step}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                        {done ? '已完成' : current ? '进行中' : '待执行'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>更多详情将在后续版本中展示</p>
        </div>
      )}

      {activeTab === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {matterMeetings.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>暂无关联会议</p>
            </div>
          )}
          {matterMeetings.map(mtg => (
            <div key={mtg.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{mtg.title}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                    {mtg.date} {mtg.time} · {mtg.location} · {mtg.source}
                  </div>
                </div>
                <span className="badge badge-info">{mtg.status}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                {mtg.participants.map(p => (
                  <span key={p} className="badge badge-muted">{p}</span>
                ))}
              </div>
              {mtg.decisions.length > 0 && (
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>决议列表</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {mtg.decisions.map(dec => {
                      const ds = decisionStatusMap[dec.status] || decisionStatusMap.draft
                      return (
                        <div key={dec.id} style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                            <span className={`badge ${ds.badge}`}>{ds.label}</span>
                            {dec.conflictWith && <span className="badge badge-danger">口径冲突</span>}
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{dec.id}</span>
                          </div>
                          <div style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>{dec.content}</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                            <span>责任单位：{dec.responsibleUnit}</span>
                            <span>协办：{dec.collaboratorUnits.join('、')}</span>
                            <span>截止：{dec.deadline}</span>
                            <span>来源：{dec.source}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 4 && (
        <div className="card">
          <div className="card-title">任务与督办</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {matterTasks.map(task => {
              const ts = taskStatusMap[task.status] || taskStatusMap.in_progress
              return (
                <div key={task.id} style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--text-md)', fontWeight: 500 }}>{task.title}</span>
                      <span className={`badge ${ts.badge}`}>{ts.label}</span>
                      <span className="badge badge-muted">{task.priority}优先级</span>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{task.id}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-2)' }}>{task.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                    <span>执行：{task.assignee}</span>
                    <span>单位：{task.assigneeUnit}</span>
                    <span>系统：{task.relatedSystem}</span>
                    <span>创建：{task.createdAt}</span>
                    <span>截止：{task.dueDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                    <div style={{ flex: 1, height: '4px', background: 'var(--muted)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${task.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{task.progress}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 5 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>更多详情将在后续版本中展示</p>
        </div>
      )}

      {activeTab === 6 && (
        <div className="grid grid-3">
          {memoryTypes.map(mt => (
            <div key={mt.type} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{mt.type}</span>
                <span className="badge badge-info">{mt.count} 条</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>{mt.userLabel}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>{mt.example}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {mt.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 7 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>更多详情将在后续版本中展示</p>
        </div>
      )}

      {activeTab === 8 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>更多详情将在后续版本中展示</p>
        </div>
      )}

      {activeTab === 9 && (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--muted-foreground)' }}>更多详情将在后续版本中展示</p>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link to="/workbench" className="btn btn-secondary">返回工作台</Link>
      </div>
    </div>
  )
}
