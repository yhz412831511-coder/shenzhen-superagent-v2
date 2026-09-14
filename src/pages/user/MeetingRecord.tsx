import { useParams, Link } from 'react-router-dom'
import { meetings } from '../../data/fixtures'

const transcript = [
  {
    time: '00:03:20',
    speaker: '张副市长（主持）',
    text: '今天召开第三次重点任务专题调度会，主要讨论三件事：一件事上线联调情况、老系统改造接口进展、项目数据口径冲突协调。请大家先汇报各自进展。',
  },
  {
    time: '00:15:30',
    speaker: '政数局王局',
    text: '关于政务服务一件事，目前联调进度45%，人社局和住建局的接口已经对接完成，但老系统查询接口还没开通，影响了端到端测试。我们计划9月25日前完成联调上线，端到端测试通过后用户可办。',
  },
  {
    time: '00:28:45',
    speaker: '住建局赵处',
    text: '老系统改造方面，3个MCP工具已经测试通过，包括query_project、get_project_progress和submit_progress_draft。只读查询账号正在开通中，预计9月18日前完成。接口安全评审报告预计9月20日出。',
  },
  {
    time: '00:37:12',
    speaker: '张副市长',
    text: '那我们就定下来，9月底前完成老系统项目查询能力的AI接入试点。政数局牵头，住建局和系统承建方配合。先开通只读查询账号，完成接口安全评审。交付物是3个可用MCP工具和接入测试报告，验收标准是查询成功率、权限继承和日志完整率。',
  },
  {
    time: '00:52:00',
    speaker: '住建局赵处',
    text: '关于项目完成率，我们系统里审核后的最新数据是72%，但上次会议纪要里记的是85%。经过核实，85%是历史快照数据，72%是系统最新审核数据。建议以项目系统审核数据为准，会议纪要中的85%标注为历史快照。',
  },
  {
    time: '00:58:30',
    speaker: '张副市长',
    text: '今天的会就到这里。住建局9月18日前开通账号，政数局9月20日前完成安全评审，一件事9月25日前联调上线。口径问题今天先确认，住建局出统一口径确认单，双方签字。另外，试点如果要延期需要提交审批，具体谁来提交、什么时候提交，请政数局落实。',
  },
]

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

function extractTimestamp(source: string): string {
  const match = source.match(/\d{2}:\d{2}:\d{2}/)
  return match ? match[0] : source
}

export default function MeetingRecord() {
  const { matterId } = useParams()
  const targetMatterId = matterId || 'MATTER-2026-0912'
  const matterMeetings = meetings.filter(m => m.matterId === targetMatterId)
  const meeting = matterMeetings[matterMeetings.length - 1] || meetings[meetings.length - 1]
  const decisions = meeting.decisions
  const actionItems = meeting.actionItems
  const disagreements = meeting.disagreements

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">会议记录与候选对象</h1>
        <p className="page-subtitle">{meeting.title} · {meeting.date} {meeting.time}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div className="card" style={{ padding: 'var(--space-4)', maxHeight: '720px', overflowY: 'auto' }}>
          <div className="card-title">会议记录（转写文本）</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {transcript.map((seg, i) => (
              <div key={i} id={`ts-${seg.time}`} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--primary)',
                      background: 'var(--secondary)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                    }}
                  >
                    {seg.time}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{seg.speaker}</span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', lineHeight: 1.7, paddingLeft: 'var(--space-2)', borderLeft: '2px solid var(--border)' }}>
                  {seg.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxHeight: '720px', overflowY: 'auto' }}>
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>候选决议</span>
              <span className="badge badge-info">{decisions.length} 条</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {decisions.map(dec => {
                const ds = decisionStatusMap[dec.status] || decisionStatusMap.draft
                const ts = extractTimestamp(dec.source)
                return (
                  <div key={dec.id} style={{ padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <span className={`badge ${ds.badge}`}>{ds.label}</span>
                      {dec.conflictWith && <span className="badge badge-danger">冲突</span>}
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{dec.content}</p>
                    <a
                      href={`#ts-${ts}`}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      原文锚点 {ts}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>候选待办</span>
              <span className="badge badge-info">{actionItems.length} 条</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {actionItems.map(item => {
                const as = actionStatusMap[item.status] || actionStatusMap.not_started
                const unclear = item.unclear || (!item.responsiblePerson && !item.responsibleUnit) || !item.deadline
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: 'var(--space-3)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: unclear ? '3px solid var(--danger)' : '3px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                      <span className={`badge ${as.badge}`}>{as.label}</span>
                      {unclear && <span className="badge badge-danger">责任/期限不明</span>}
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>{item.content}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                      {item.responsibleUnit && <span>责任单位：{item.responsibleUnit}</span>}
                      {item.responsiblePerson && <span>责任人：{item.responsiblePerson}</span>}
                      {item.deadline && <span>截止：{item.deadline}</span>}
                      {!item.responsibleUnit && !item.responsiblePerson && (
                        <span style={{ color: 'var(--danger)' }}>责任人未指定</span>
                      )}
                      {!item.deadline && <span style={{ color: 'var(--danger)' }}>截止日期未明确</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', borderLeft: '3px solid var(--danger)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <span className="badge badge-danger">争议</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>发现的争议</span>
            </div>
            {disagreements.map((dg, i) => (
              <div key={i} style={{ padding: 'var(--space-3)', background: 'var(--danger-soft)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>{dg}</p>
                <a
                  href="#ts-00:52:00"
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--primary)',
                    display: 'inline-flex',
                    marginTop: 'var(--space-1)',
                    cursor: 'pointer',
                  }}
                >
                  原文锚点 00:52:00
                </a>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 'var(--space-4)', borderLeft: '3px solid var(--warning)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <span className="badge badge-warning">待确认</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>候选规则</span>
            </div>
            <div style={{ padding: 'var(--space-3)', background: 'var(--warning-soft)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--warning)', marginBottom: 'var(--space-1)' }}>
                新口径待确认：项目数据口径以项目系统审核数据为准，会议纪要中的85%标注为历史快照
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                <span>来源：DEC-003</span>
                <span>需确认方：住建局 + 政数局</span>
              </div>
              <a
                href="#ts-00:52:00"
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--primary)',
                  display: 'inline-flex',
                  marginTop: 'var(--space-1)',
                  cursor: 'pointer',
                }}
              >
                原文锚点 00:52:00
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link to={`/matter/${targetMatterId}`} className="btn btn-secondary">返回事项详情</Link>
        <Link to="/workbench" className="btn btn-ghost" style={{ marginLeft: 'var(--space-2)' }}>返回工作台</Link>
      </div>
    </div>
  )
}
