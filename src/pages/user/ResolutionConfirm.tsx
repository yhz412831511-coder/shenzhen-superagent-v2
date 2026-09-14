import { useState } from 'react'
import { meetings, tasks } from '../../data/fixtures'

const meeting = meetings[2]
const matterTasks = tasks.filter((t) => t.matterId === meeting.matterId)

const unitOptions = ['政数局', '人社局', '住建局', '发改委']

const statusLabel: Record<string, string> = {
  confirmed: '已确认',
  draft: '草稿',
  superseded: '已替代',
}

const taskStatusLabel: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  waiting: '待确认',
  completed: '已完成',
  overdue: '已逾期',
  blocked: '已阻塞',
}

const taskStatusBadge: Record<string, string> = {
  not_started: 'badge badge-muted',
  in_progress: 'badge badge-info',
  waiting: 'badge badge-warning',
  completed: 'badge badge-success',
  overdue: 'badge badge-danger',
  blocked: 'badge badge-danger',
}

const writeBackPreview = [
  { id: 'TASK-20260910-0086-01', title: '完成老系统只读查询账号开通', unit: '住建局', deadline: '2026-09-18' },
  { id: 'TASK-20260910-0086-02', title: '接口安全评审报告', unit: '政数局', deadline: '2026-09-20' },
  { id: 'TASK-20260910-0086-03', title: '一件事联调方案', unit: '政数局', deadline: '2026-09-22' },
  { id: 'TASK-20260910-0086-04', title: '确认项目72%数据口径', unit: '住建局', deadline: '2026-09-14' },
  { id: 'TASK-20260910-0086-05', title: '提交试点延期审批', unit: '政数局', deadline: '2026-09-16' },
  { id: 'TASK-20260910-0086-06', title: '形成督办任务清单', unit: '政数局', deadline: '2026-09-15' },
]

export default function ResolutionConfirm() {
  const [responsibleUnits, setResponsibleUnits] = useState<Record<string, string>>(
    Object.fromEntries(meeting.decisions.map((d) => [d.id, d.responsibleUnit.replace('市', '')]))
  )

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">决议确认与督办写回</h1>
        <p className="page-subtitle">
          {meeting.title} · {meeting.date} {meeting.time} · {meeting.source}
        </p>
      </div>

      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <h2 className="card-title" style={{ margin: 0 }}>决议确认台</h2>
          <span className="tag">{meeting.decisions.length} 条决议</span>
        </div>

        {meeting.decisions.map((dec) => {
          const isConflict = dec.id === 'DEC-003'
          return (
            <div
              key={dec.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-3)',
                background: isConflict ? 'var(--danger-soft)' : 'var(--card)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <span className="tag" style={{ fontFamily: 'var(--font-code)' }}>{dec.id}</span>
                    {isConflict && <span className="badge badge-danger">口径冲突-需确认</span>}
                    <span className={`badge ${dec.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                      {statusLabel[dec.status]}
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>{dec.content}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: 'var(--space-1)' }}>
                    来源锚点：{dec.source}
                  </div>
                </div>
              </div>

              <div className="divider" style={{ margin: 'var(--space-2) 0' }} />

              <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>责任单位</label>
                  <select
                    value={responsibleUnits[dec.id]}
                    onChange={(e) => setResponsibleUnits({ ...responsibleUnits, [dec.id]: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-base)',
                      background: 'var(--card)',
                    }}
                  >
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>截止时间</label>
                  <div
                    style={{
                      width: '100%',
                      padding: 'var(--space-2) var(--space-3)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-base)',
                      background: 'var(--card)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <span style={{ color: 'var(--muted-foreground)' }}>&#128197;</span>
                    <input
                      type="date"
                      defaultValue={dec.deadline}
                      style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 'var(--text-base)', color: 'var(--foreground)' }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>协同单位</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                    {dec.collaboratorUnits.map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>依赖项</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                    {dec.dependencies.map((d) => (
                      <span key={d} className="tag">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-2" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>交付物</label>
                  <div style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>{dec.deliverables}</div>
                </div>
                <div>
                  <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>判断标准</label>
                  <div style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>{dec.successCriteria}</div>
                </div>
              </div>

              {isConflict && dec.conflictWith && (
                <div
                  style={{
                    marginTop: 'var(--space-3)',
                    padding: 'var(--space-2) var(--space-3)',
                    background: 'var(--danger-soft)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}
                >
                  <span>&#9888;</span>
                  <span>冲突标记：{dec.conflictWith}</span>
                </div>
              )}
            </div>
          )
        })}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
          <button className="btn btn-primary">确认全部已核实决议</button>
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">督办写回预览</h2>

        <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
          <div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: '2px' }}>目标系统</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span className="badge badge-info">OA督办系统</span>
                <span className="tag">supervision.create_task</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: 'var(--space-2)' }}>拟写入内容（{writeBackPreview.length}条督办任务）</label>
              <pre
                style={{
                  background: 'var(--muted)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-3)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-code)',
                  overflow: 'auto',
                  maxHeight: '320px',
                  color: 'var(--foreground)',
                  lineHeight: 1.6,
                }}
              >
{writeBackPreview.map((t) => (
  `{\n  "id": "${t.id}",\n  "title": "${t.title}",\n  "assigneeUnit": "${t.unit}",\n  "deadline": "${t.deadline}",\n  "source": "MTG-20260910-01",\n  "status": "not_started"\n}`
)).join(',\n')}
              </pre>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', display: 'block', marginBottom: 'var(--space-2)' }}>写回前需确认项</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>确认人</div>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>李明 · 政数局</div>
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>确认时间</div>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>2026-09-14 14:30</div>
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>依据</div>
                <div style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>MTG-20260910-01 会议决议（3条已确认 + 1条口径冲突暂停）</div>
              </div>
              <div style={{ border: '1px solid var(--warning)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-3)', background: 'var(--warning-soft)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--warning)' }}>待确认</div>
                <div style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>DEC-003 口径冲突项不写入，待住建局确认后补充</div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary">预览写回内容</button>
          <button className="btn btn-primary">确认写回</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <h2 className="card-title" style={{ margin: 0 }}>督办任务列表</h2>
          <span className="tag">{matterTasks.length} 项任务</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>任务ID</th>
              <th>标题</th>
              <th>负责人/单位</th>
              <th>截止时间</th>
              <th>进度</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {matterTasks.map((t) => (
              <tr key={t.id}>
                <td style={{ fontFamily: 'var(--font-code)', fontSize: 'var(--text-xs)' }}>{t.id}</td>
                <td>{t.title}</td>
                <td>
                  <div style={{ fontSize: 'var(--text-sm)' }}>{t.assignee}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{t.assigneeUnit}</div>
                </td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{t.dueDate}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div style={{ width: '60px', height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${t.progress}%`, height: '100%', background: 'var(--primary)' }} />
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{t.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={taskStatusBadge[t.status]}>{taskStatusLabel[t.status]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
