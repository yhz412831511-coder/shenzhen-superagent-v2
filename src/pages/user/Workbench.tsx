import { Link } from 'react-router-dom'
import { matters, memoryTypes, experiences } from '../../data/fixtures'

const quickStarts = [
  { label: '准备会议', path: '/meeting-prep/MATTER-2026-0912' },
  { label: '处理来文', path: '/matter/MATTER-2026-0820' },
  { label: '跟踪督办', path: '/matter/MATTER-2026-0912' },
  { label: '核验项目', path: '/matter/MATTER-2026-0901' },
  { label: '专业审查', path: '/matter/MATTER-2026-0912' },
]

const alerts = [
  { type: 'danger', title: '口径冲突待确认', desc: '会议纪要85% vs 系统数据72%，需住建局确认', matterId: 'MATTER-2026-0912' },
  { type: 'warning', title: '一件事联调进度', desc: '联调测试45%，距9月25日上线还有11天', matterId: 'MATTER-2026-0912' },
  { type: 'warning', title: '部门反馈缺2个', desc: '省级督查报送5/7部门已回复，明日17:00截止', matterId: 'MATTER-2026-0820' },
]

const pendingConfirms = [
  { title: '项目数据口径冲突确认', desc: '会议纪要85% vs 系统数据72%，以哪个为准？', matterId: 'MATTER-2026-0912' },
  { title: '试点延期审批提交', desc: '责任人未明确，期限未明确，需指定责任人并确认截止', matterId: 'MATTER-2026-0912' },
  { title: '一件事联调方案确认', desc: '政数局提交联调方案，需确认跨部门协同时间表', matterId: 'MATTER-2026-0912' },
]

const matterStatusMap: Record<string, { label: string; badge: string }> = {
  active: { label: '进行中', badge: 'badge-info' },
  pending: { label: '待处理', badge: 'badge-warning' },
  overdue: { label: '已超期', badge: 'badge-danger' },
  completed: { label: '已完成', badge: 'badge-success' },
}

export default function Workbench() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">政务事项工作台</h1>
        <p className="page-subtitle">2026年9月14日 · 政数局 · 李明</p>
      </div>

      <div className="card mb-4" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <input
          defaultValue="准备明天下午的重点任务专题调度会"
          style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            fontSize: 'var(--text-lg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            color: 'var(--foreground)',
            background: 'var(--card)',
          }}
        />
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {quickStarts.map(qs => (
            <Link key={qs.label} to={qs.path} className="btn btn-secondary">{qs.label}</Link>
          ))}
        </div>
      </div>

      <div className="grid grid-3 mb-4">
        {alerts.map(alert => (
          <Link
            key={alert.title}
            to={`/matter/${alert.matterId}`}
            className="card"
            style={{
              borderLeft: `3px solid var(--${alert.type})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className={`badge badge-${alert.type}`}>{alert.type === 'danger' ? '紧急' : '提醒'}</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{alert.title}</span>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{alert.desc}</p>
          </Link>
        ))}
      </div>

      <div className="card mb-4">
        <div className="card-title">进行中的事项</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {matters.map(matter => {
            const st = matterStatusMap[matter.status] || matterStatusMap.active
            return (
              <Link
                key={matter.id}
                to={`/matter/${matter.id}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{matter.title}</span>
                    <span className="tag">{matter.type}</span>
                    <span className={`badge ${st.badge}`}>{st.label}</span>
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>更新于 {matter.updatedAt}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ flex: 1, height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${matter.progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', minWidth: '36px' }}>{matter.progress}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                  <span>参与：{matter.participants.join('、')}</span>
                  {matter.pendingConfirmations > 0 && (
                    <span style={{ color: 'var(--warning)' }}>待确认 {matter.pendingConfirmations} 项</span>
                  )}
                  <span>截止 {matter.dueDate}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title">等我确认</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {pendingConfirms.map(item => (
              <Link
                key={item.title}
                to={`/matter/${item.matterId}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  padding: 'var(--space-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="badge badge-warning">待确认</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">AI最近学会了什么</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {experiences.map(exp => {
              const isSkill = exp.pattern.includes('会议决议')
              const title = isSkill ? `会议决议转督办Skill ${exp.version}` : `轻量模型分段抽取${exp.version}`
              return (
                <div
                  key={exp.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-1)',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{title}</span>
                    <span className={`badge ${exp.status === '已发布' ? 'badge-success' : 'badge-info'}`}>{exp.status}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{exp.improvements}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                    <span>样本 {exp.samples} 次</span>
                    <span>失败 {exp.failures} 次</span>
                    <span>置信度 {(exp.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-title">工作记忆概览</div>
        <div className="grid grid-3">
          {memoryTypes.map(mt => (
            <div
              key={mt.type}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                padding: 'var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{mt.type}</span>
                <span className="badge badge-muted">{mt.count} 条</span>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{mt.userLabel}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{mt.example}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
