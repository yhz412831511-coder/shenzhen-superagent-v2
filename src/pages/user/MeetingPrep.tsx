import { useParams, Link } from 'react-router-dom'
import { meetings, matters } from '../../data/fixtures'

const decisionStatusMap: Record<string, { label: string; badge: string }> = {
  draft: { label: '待确认', badge: 'badge-warning' },
  confirmed: { label: '已确认', badge: 'badge-success' },
  superseded: { label: '已替代', badge: 'badge-muted' },
}

const actionStatusMap: Record<string, { label: string; badge: string }> = {
  not_started: { label: '未开始', badge: 'badge-muted' },
  in_progress: { label: '进行中', badge: 'badge-info' },
  waiting: { label: '等待中', badge: 'badge-warning' },
  completed: { label: '已完成', badge: 'badge-success' },
  draft: { label: '待确认', badge: 'badge-warning' },
}

const crossDeps = [
  { dept: '住建局', task: '开通老系统只读查询账号', deadline: '9月18日', status: 'in_progress' },
  { dept: '政数局', task: '接口安全评审报告', deadline: '9月20日', status: 'not_started' },
  { dept: '人社局', task: '一件事联调配合', deadline: '9月22日', status: 'in_progress' },
]

const suggestedAgenda = [
  { topic: '一件事上线联调进度通报', owner: '政数局', duration: '5分钟' },
  { topic: '老系统改造接口试点进展', owner: '住建局', duration: '5分钟' },
  { topic: '项目数据口径冲突确认', owner: '住建局+政数局', duration: '10分钟' },
  { topic: '各部门未完成任务督办通报', owner: '政数局', duration: '10分钟' },
  { topic: '下一步工作部署', owner: '张副市长', duration: '5分钟' },
]

export default function MeetingPrep() {
  const { matterId } = useParams()
  const targetMatterId = matterId || 'MATTER-2026-0912'
  const matter = matters.find(m => m.id === targetMatterId) || matters[0]
  const matterMeetings = meetings.filter(m => m.matterId === targetMatterId)
  const lastMeeting = matterMeetings[matterMeetings.length - 1] || meetings[meetings.length - 1]

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">会前智能准备</h1>
        <p className="page-subtitle">{matter.title} · {matter.id}</p>
      </div>

      <div className="grid grid-2 mb-4">
        <div className="card">
          <div className="card-title">会议信息</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>重点任务专题调度会（第四次）</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              <div><span style={{ color: 'var(--muted-foreground)' }}>日期 </span>2026-09-15</div>
              <div><span style={{ color: 'var(--muted-foreground)' }}>时间 </span>14:00</div>
              <div><span style={{ color: 'var(--muted-foreground)' }}>地点 </span>市政府会议室</div>
              <div><span style={{ color: 'var(--muted-foreground)' }}>来源 </span>正式纪要</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>参会人员</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {['张副市长（主持）', '政数局王局', '人社局李处', '住建局赵处', '发改委钱处'].map(p => (
                  <span key={p} className="badge badge-info">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '3px solid var(--danger)' }}>
          <div className="card-title" style={{ color: 'var(--danger)' }}>系统最新数据</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>项目台账系统（MCP读取）</div>
                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--danger)' }}>72%</div>
              </div>
              <span className="badge badge-danger">最新审核数据</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>上次会议纪要记载</div>
                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--muted-foreground)' }}>85%</div>
              </div>
              <span className="badge badge-muted">历史快照</span>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--danger-soft)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <span className="badge badge-danger">口径冲突</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--danger)' }}>需本次会议确认</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>会议纪要85%为历史快照，系统数据72%为最新审核结果，以哪个为准需住建局确认。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">上次会议决议状态追踪</div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
          {lastMeeting.title} · {lastMeeting.date}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {lastMeeting.decisions.map(dec => {
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
                  <span>截止：{dec.deadline}</span>
                  <span>交付物：{dec.deliverables}</span>
                  <span>来源：{dec.source}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">未完成任务清单</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {lastMeeting.actionItems.map(item => {
            const as = actionStatusMap[item.status] || actionStatusMap.not_started
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <span className={`badge ${as.badge}`}>{as.label}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)' }}>{item.content}</div>
                  <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                    {item.responsibleUnit && <span>责任单位：{item.responsibleUnit}</span>}
                    {item.responsiblePerson && <span>责任人：{item.responsiblePerson}</span>}
                    {item.deadline && <span>截止：{item.deadline}</span>}
                  </div>
                </div>
                {item.unclear && (
                  <span className="badge badge-danger">责任/期限不明</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-2 mb-4">
        <div className="card">
          <div className="card-title">跨部门依赖</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {crossDeps.map(dep => {
              const as = actionStatusMap[dep.status] || actionStatusMap.not_started
              return (
                <div key={dep.dept} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <span className="badge badge-info">{dep.dept}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--text-sm)' }}>{dep.task}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>截止 {dep.deadline}</div>
                  </div>
                  <span className={`badge ${as.badge}`}>{as.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-title">AI建议议程</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {suggestedAgenda.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-2) 0',
                  borderBottom: i < suggestedAgenda.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)' }}>{item.topic}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{item.owner} · {item.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Link to={`/matter/${targetMatterId}`} className="btn btn-secondary">返回事项详情</Link>
        <Link to="/workbench" className="btn btn-ghost" style={{ marginLeft: 'var(--space-2)' }}>返回工作台</Link>
      </div>
    </div>
  )
}
