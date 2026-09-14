import { useParams, Link } from 'react-router-dom'
import { tasks, tokenUsage } from '../../data/fixtures'

function statusBadge(status: string) {
  const map: Record<string, string> = {
    completed: 'badge-success',
    in_progress: 'badge-info',
    waiting: 'badge-warning',
    not_started: 'badge-muted',
    overdue: 'badge-danger',
    blocked: 'badge-danger',
  }
  const labelMap: Record<string, string> = {
    completed: '已完成',
    in_progress: '进行中',
    waiting: '等待中',
    not_started: '未开始',
    overdue: '已逾期',
    blocked: '已阻塞',
  }
  return <span className={`badge ${map[status] || 'badge-muted'}`}>{labelMap[status] || status}</span>
}

function priorityBadge(priority: string) {
  if (priority === '高') return <span className="badge badge-danger">高</span>
  if (priority === '中') return <span className="badge badge-warning">中</span>
  return <span className="badge badge-muted">低</span>
}

const relatedDataSources = [
  { name: '项目台账系统', type: 'MCP只读', detail: '读取项目基本信息和审核后最新进度（72%）', tool: 'query_project / get_project_progress' },
  { name: 'OA系统纪要', type: 'MCP只读', detail: '读取8月12日、8月25日会议纪要及决议状态', tool: 'oa_read_document' },
  { name: '会议情景记忆', type: '情景记忆', detail: '3次历史会议决议、承诺和口径冲突记录', tool: 'memory.episodic' },
]

const relatedMemory = [
  { type: '工作记忆', label: '当前事项状态', content: '会议督办任务进度60%、口径冲突待确认、一件事联调45%' },
  { type: '语义记忆', label: '有效口径与规则', content: '项目完成率定义=审核后数据、数据出域审批要求、一件事服务标准' },
  { type: '程序记忆', label: '办理方法', content: '会议决议转督办Skill V1.1、冲突数据协调流程、联调测试步骤' },
  { type: '情景记忆', label: '历史会议与案例', content: '8月12日首次调度会、8月25日确定试点、9月10日口径冲突' },
  { type: '前瞻记忆', label: '待办与承诺', content: '住建局9/18开通账号、政数局9/20安全评审、一件事9/25联调' },
  { type: '组织记忆', label: '职责与权限', content: '政数局主办一件事、住建局负责台账、安全运营审核外发' },
]

const toolCalls = [
  { tool: 'query_project', system: '项目台账系统', level: 'A', type: '只读', result: '返回3条项目记录，完成率72%', timestamp: '09:22:15' },
  { tool: 'get_project_progress', system: '项目台账系统', level: 'A', type: '只读', result: '返回审核后最新进度数据，口径=系统数据', timestamp: '09:22:30' },
  { tool: 'oa_read_document', system: 'OA系统', level: 'A', type: '只读', result: '读取2份历史会议纪要，提取决议8条', timestamp: '09:23:01' },
]

const evidenceItems = [
  { id: 'DEC-001', content: '9月底前完成老系统项目查询能力的AI接入试点', source: '会议记录 00:37:12—00:38:05', timestamp: '2026-09-10 14:38' },
  { id: 'DEC-002', content: '政务服务一件事于9月25日前完成联调上线', source: '会议记录 00:15:30—00:17:00', timestamp: '2026-09-10 14:17' },
  { id: 'DEC-003', content: '项目数据口径以项目系统审核数据为准（72%），会议纪要85%为历史快照', source: '会议记录 00:52:00—00:54:30', timestamp: '2026-09-10 14:54' },
]

export default function TaskTrace() {
  const { taskId } = useParams()
  const defaultId = 'TASK-20260910-0086'
  const id = taskId || defaultId

  const task = tasks.find(t => t.id === id) || tasks.find(t => t.id === defaultId)!
  const breakdown = tokenUsage.taskBreakdown

  const totalTokens = breakdown.steps.reduce((sum, s) => sum + s.input + s.cached + s.reasoning + s.output + s.tool, 0)

  return (
    <div>
      <div className="page-header">
        <div className="page-title">单任务全链路<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">从任务发起到写回，完整记录AI读取了什么、用了什么工具、消耗了多少Token、如何审批和证据来源</div>
      </div>

      <div className="card mb-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
        <div style={{ flex: '2 1 300px' }}>
          <div className="card-title" style={{ marginBottom: 'var(--space-4)' }}>{task.title}</div>
          <div className="grid grid-2" style={{ gap: 'var(--space-3)' }}>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>任务ID</span><div style={{ fontSize: 'var(--text-md)', fontWeight: 500 }}>{task.id}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>经办人</span><div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--primary)' }}>{task.assignee}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>经办单位</span><div style={{ fontSize: 'var(--text-md)' }}>{task.assigneeUnit}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>关联事项</span><div style={{ fontSize: 'var(--text-md)' }}>{task.matterId}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>状态</span><div style={{ marginTop: '2px' }}>{statusBadge(task.status)}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>优先级</span><div style={{ marginTop: '2px' }}>{priorityBadge(task.priority)}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>创建时间</span><div style={{ fontSize: 'var(--text-sm)' }}>{task.createdAt}</div></div>
            <div><span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>截止时间</span><div style={{ fontSize: 'var(--text-sm)' }}>{task.dueDate}</div></div>
          </div>
        </div>
        <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--muted)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>完成进度</span>
          <span style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--primary)' }}>{task.progress}%</span>
          <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${task.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">统一编号</div>
        <div className="grid grid-3" style={{ gap: 'var(--space-3)' }}>
          <div style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Task ID</div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, fontFamily: 'var(--font-code)' }}>{task.id}</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Matter ID</div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, fontFamily: 'var(--font-code)' }}>{task.matterId}</div>
          </div>
          <div style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>Trace ID</div>
            <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, fontFamily: 'var(--font-code)' }}>TRACE-20260914-0920</div>
          </div>
        </div>
      </div>

      <div className="grid grid-2 mb-4">
        <div className="card">
          <div className="card-title">关联数据</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {relatedDataSources.map((d) => (
              <div key={d.name} style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{d.name}</span>
                  <span className="badge badge-info">{d.type}</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{d.detail}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', marginTop: 'var(--space-1)', fontFamily: 'var(--font-code)' }}>{d.tool}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">关联记忆</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {relatedMemory.map((m) => (
              <div key={m.type} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2)', borderBottom: '1px solid var(--border)' }}>
                <span style={{ width: '90px', flexShrink: 0, fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)' }}>{m.type}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{m.label}</div>
                  <div style={{ fontSize: 'var(--text-sm)' }}>{m.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">工具调用记录（MCP）</div>
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>工具</th>
              <th>系统</th>
              <th>级别</th>
              <th>类型</th>
              <th>返回结果</th>
            </tr>
          </thead>
          <tbody>
            {toolCalls.map((c, i) => (
              <tr key={i}>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)' }}>{c.timestamp}</td>
                <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--primary)' }}>{c.tool}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{c.system}</td>
                <td><span className="badge badge-info">{c.level}</span></td>
                <td><span className={`badge ${c.type === '只读' ? 'badge-success' : 'badge-warning'}`}>{c.type}</span></td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{c.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb-4">
        <div className="card-title">Token消耗分布（按步骤）</div>
        <table>
          <thead>
            <tr>
              <th>步骤</th>
              <th style={{ width: '80px' }}>Input</th>
              <th style={{ width: '80px' }}>Cached</th>
              <th style={{ width: '80px' }}>Reasoning</th>
              <th style={{ width: '80px' }}>Output</th>
              <th style={{ width: '80px' }}>Tool</th>
              <th style={{ width: '80px' }}>合计</th>
              <th style={{ width: '120px' }}>占比</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.steps.map((s, i) => {
              const rowTotal = s.input + s.cached + s.reasoning + s.output + s.tool
              const pct = totalTokens > 0 ? ((rowTotal / totalTokens) * 100).toFixed(1) : '0'
              return (
                <tr key={i}>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{s.step}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.input.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--success)' }}>{s.cached.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.reasoning.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.output.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>{s.tool.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', fontWeight: 600 }}>{rowTotal.toLocaleString()}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--chart-1)' }} />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', width: '36px', textAlign: 'right' }}>{pct}%</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={{ fontWeight: 600, background: 'var(--muted)' }}>
              <td>合计</td>
              <td style={{ fontFamily: 'var(--font-code)' }}>{breakdown.steps.reduce((s, r) => s + r.input, 0).toLocaleString()}</td>
              <td style={{ fontFamily: 'var(--font-code)', color: 'var(--success)' }}>{breakdown.steps.reduce((s, r) => s + r.cached, 0).toLocaleString()}</td>
              <td style={{ fontFamily: 'var(--font-code)' }}>{breakdown.steps.reduce((s, r) => s + r.reasoning, 0).toLocaleString()}</td>
              <td style={{ fontFamily: 'var(--font-code)' }}>{breakdown.steps.reduce((s, r) => s + r.output, 0).toLocaleString()}</td>
              <td style={{ fontFamily: 'var(--font-code)' }}>{breakdown.steps.reduce((s, r) => s + r.tool, 0).toLocaleString()}</td>
              <td style={{ fontFamily: 'var(--font-code)' }}>{totalTokens.toLocaleString()}</td>
              <td>100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="grid grid-2 mb-4">
        <div className="card">
          <div className="card-title">审批记录</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>写回预览</span>
              <span style={{ flex: 1, fontSize: 'var(--text-sm)' }}>{task.writeBackPreview || '—'}</span>
            </div>
            <div className="divider" style={{ margin: 0 }} />
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>确认人</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{task.confirmedBy || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>确认时间</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{task.confirmedAt || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>审批依据</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>会议决议转督办Skill V1.1 · 写回前预览确认流程</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>审批状态</span>
              <span className="badge badge-success">已确认</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">证据链</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {evidenceItems.map((e) => (
              <div key={e.id} style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', fontFamily: 'var(--font-code)' }}>{e.id}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{e.timestamp}</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)' }}>{e.content}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--success)' }}>⚓ 原文锚点</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', fontFamily: 'var(--font-code)' }}>{e.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>与用户端互查</div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--space-1)' }}>
            在用户端查看此任务的办理界面和AI执行说明
          </div>
        </div>
        <Link to={`/ai-execution/${task.id}`} className="btn btn-secondary">
          在用户端查看此任务 →
        </Link>
      </div>
    </div>
  )
}
