import { Link, useLocation } from 'react-router-dom'
import { matters, memoryTypes, experiences, mcpTools, sdkApps, tasks } from '../../data/fixtures'

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

function TodayView() {
  return (
    <div>
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

const confirmQueue = [
  {
    id: 'CF-001',
    type: '口径冲突',
    level: 'danger',
    levelLabel: '紧急 · 今日截止',
    title: '项目数据口径冲突确认',
    desc: '会议纪要记载85%，项目系统审核数据72%，需确认以哪个口径为准，并通知住建局',
    matter: '重点任务专题调度会',
    matterId: 'MATTER-2026-0912',
    source: '9月10日第三次调度会 · 会议记录 00:52:00',
  },
  {
    id: 'CF-002',
    type: '要素不全',
    level: 'warning',
    levelLabel: '等待中',
    title: '试点延期审批提交',
    desc: '责任人未明确、期限未明确，AI已标记模糊要素，需指定责任人并确认截止时间后提交',
    matter: '重点任务专题调度会',
    matterId: 'MATTER-2026-0912',
    source: 'AI完整性检查 · 2026-09-14 09:30',
  },
  {
    id: 'CF-003',
    type: '方案确认',
    level: 'warning',
    levelLabel: '等待中',
    title: '一件事联调方案确认',
    desc: '政数局提交跨部门联调方案，涉及人社局、住建局协同时间表，距9月25日上线还有11天',
    matter: '重点任务专题调度会',
    matterId: 'MATTER-2026-0912',
    source: '联调方案草案 · 2026-09-12',
  },
  {
    id: 'CF-004',
    type: '催办确认',
    level: 'warning',
    levelLabel: '明日17:00截止',
    title: '督查报送缺2部门反馈',
    desc: '省级专项督查报送5/7部门已回复，剩余2个部门未回复，AI建议以督办函形式催办',
    matter: '省级专项督查报送',
    matterId: 'MATTER-2026-0820',
    source: '督查报送Agent · 2026-09-14 08:00',
  },
  {
    id: 'CF-005',
    type: '写入审批',
    level: 'info',
    levelLabel: '已预览待确认',
    title: '督办系统写入确认',
    desc: 'AI拟在督办系统创建6项子任务并写入OA会议纪要，写入内容已生成预览，等待人工确认',
    matter: '重点任务专题调度会',
    matterId: 'MATTER-2026-0912',
    source: 'TASK-20260910-0086 · 写回预览',
  },
]

function PendingView() {
  const stats = [
    { label: '待确认总数', value: '5 项', hint: '较昨日 +2' },
    { label: '紧急事项', value: '1 项', hint: '今日截止' },
    { label: '即将超时', value: '1 项', hint: '明日17:00' },
    { label: '已确认(本周)', value: '12 项', hint: '平均确认用时 6 分钟' },
  ]
  return (
    <div>
      <div className="grid grid-4 mb-4">
        {stats.map(s => (
          <div key={s.label} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{s.label}</span>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--foreground)' }}>{s.value}</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{s.hint}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">确认队列</div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
          AI不代替你做确认。所有高风险动作（写入、提交、对外发送）在执行前都会进入此队列等待人工确认，确认记录自动写入组织记忆。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {confirmQueue.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid var(--${item.level})`,
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span className={`badge badge-${item.level}`}>{item.levelLabel}</span>
                <span className="tag">{item.type}</span>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{item.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                    来源：{item.source} · 所属事项：
                    <Link to={`/matter/${item.matterId}`} style={{ color: 'var(--primary)' }}>{item.matter}</Link>
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {item.id === 'CF-001' && (
                    <Link to="/resolution-confirm" className="btn btn-primary">去确认</Link>
                  )}
                  {item.id === 'CF-005' && (
                    <Link to="/ai-execution" className="btn btn-primary">查看预览</Link>
                  )}
                  <Link to={`/matter/${item.matterId}`} className="btn btn-secondary">查看事项</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MemoryView() {
  return (
    <div>
      <div className="card mb-4">
        <div className="card-title">六类工作记忆</div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          AI在办理事项的过程中积累的六类记忆，全部内容可查、来源可追溯。记忆按事项归集，在事项中按需出现；
          跨事项复用需明确授权，删除随时生效。以下为演示样例数据。
        </p>
        <div className="grid grid-2 mt-4">
          {memoryTypes.map(mt => (
            <div
              key={mt.type}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--foreground)' }}>{mt.type}</span>
                  <span className="tag">{mt.userLabel}</span>
                </div>
                <span className="badge badge-muted">{mt.count} 条</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>关注点：{mt.example}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {mt.items.map(item => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      background: 'var(--muted)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--foreground)',
                    }}
                  >
                    <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)' }}>●</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">记忆使用规则</div>
        <div className="grid grid-3">
          {[
            { title: '来源可追溯', desc: '每条记忆记录来源事项、会议和系统，可回查原始证据' },
            { title: '按事项归集', desc: '记忆服务于事项办理，在对应事项中按需出现，不做全局广播' },
            { title: '跨事项复用需授权', desc: '将A事项记忆用于B事项时，明确提示并需人工授权' },
            { title: '删除随时生效', desc: '删除记忆立即生效，正在进行的任务同步失效该条记忆' },
            { title: '敏感数据不出域', desc: '涉密和敏感数据不进入个人记忆，仅在受控会话内使用' },
            { title: '记忆与权限一致', desc: '组织记忆随权限变化更新，权限回收后相关记忆不可见' },
          ].map(rule => (
            <div
              key={rule.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                padding: 'var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{rule.title}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{rule.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AbilityView() {
  const agentMap = new Map<string, { task: string; matter: string; matterId: string; status: string; priority: string }>()
  tasks.forEach(t => {
    if (t.assignee.includes('Agent')) {
      const [name] = t.assignee.split('@')
      if (!agentMap.has(name)) {
        const matter = matters.find(m => m.id === t.matterId)
        agentMap.set(name, {
          task: t.title,
          matter: matter?.title || t.matterId,
          matterId: t.matterId,
          status: t.status,
          priority: t.priority,
        })
      }
    }
  })
  const agents = Array.from(agentMap.entries()).map(([name, info]) => ({ name, ...info }))

  const agentAbilityMap: Record<string, string> = {
    '会议督办Agent': '核验会议决议、生成督办建议、跟踪任务执行',
    '政务服务Agent': '一件事联调测试、跨部门流程验证',
    '系统改造Agent': '老系统MCP接口测试、AI能力接入验证',
    '督查报送Agent': '收集部门反馈、催办提醒、汇总报送',
  }

  return (
    <div>
      <div className="card mb-4">
        <div className="card-title">在用智能体</div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
          专业能力不作为菜单入口，而是在事项办理中按需调用。每个Agent的执行过程、数据来源和管控点全程可查。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {agents.map(agent => (
            <div
              key={agent.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{agent.name}</span>
                  <span className={`badge ${agent.status === 'in_progress' ? 'badge-info' : 'badge-success'}`}>
                    {agent.status === 'in_progress' ? '执行中' : '已完成'}
                  </span>
                  <span className="tag">{agent.priority}优先</span>
                </div>
                <Link to={`/matter/${agent.matterId}`} style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)' }}>
                  所属事项：{agent.matter} →
                </Link>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                {agentAbilityMap[agent.name] || '事项办理辅助'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                <span>当前任务：{agent.task}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">在用Skill与工作流</div>
        <div className="grid grid-2">
          {experiences.map(exp => {
            const isSkill = exp.pattern.includes('会议决议')
            const title = isSkill ? `会议决议转督办任务 ${exp.version}` : `会议督办工作流 · 轻量分段抽取 ${exp.version}`
            return (
              <div
                key={exp.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-4)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{title}</span>
                  <span className={`badge ${exp.status === '已发布' ? 'badge-success' : 'badge-info'}`}>{exp.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', flexWrap: 'wrap', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                  {exp.sequence.map((step, i) => (
                    <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      {i > 0 && <span style={{ color: 'var(--muted-foreground)' }}>→</span>}
                      <span className="tag">{step}</span>
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  触发条件：{exp.trigger}。{exp.improvements}
                </p>
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
  )
}

function SystemView() {
  return (
    <div>
      <div className="card mb-4">
        <div className="card-title">已连接系统</div>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
          通过MCP协议连接的政务系统。A类核心系统直连，只读工具默认开放，写入工具一律需人工确认。
        </p>
        <div className="grid grid-3">
          {sdkApps.map(app => (
            <div
              key={app.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{app.name}</span>
                <span className={`badge ${app.status === '活跃' ? 'badge-success' : 'badge-info'}`}>{app.status}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                <span>单位：{app.unit}</span>
                <span>环境：{app.env} · SDK {app.sdk}</span>
                <span>会话 {app.sessions} · 调用 {app.calls} 次</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">MCP工具清单</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {mcpTools.map(tool => (
            <div
              key={tool.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)', minWidth: '180px' }}>{tool.name}</span>
              <span className="tag">{tool.system}</span>
              <span className={`badge ${tool.type === '只读' ? 'badge-muted' : 'badge-warning'}`}>{tool.type}</span>
              <span className="badge badge-info">风险{tool.risk}</span>
              <span className="badge badge-muted">{tool.status}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', flex: 1, minWidth: '200px' }}>{tool.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">连接权限说明</div>
        <div className="grid grid-3">
          {[
            { title: '只读默认开放', desc: '查询类工具经安全评审后默认可用，敏感字段自动脱敏' },
            { title: '写入需人工确认', desc: '所有写入操作生成预览并等待确认，确认记录留痕' },
            { title: '权限随人随岗', desc: '工具权限与经办人岗位绑定，调岗自动回收' },
          ].map(rule => (
            <div
              key={rule.title}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                padding: 'var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{rule.title}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{rule.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const tabViewMap: Record<string, () => JSX.Element> = {
  pending: PendingView,
  memory: MemoryView,
  ability: AbilityView,
  system: SystemView,
}

const tabHeaderMap: Record<string, { title: string; subtitle: string }> = {
  pending: { title: '等我确认', subtitle: '高风险动作执行前的人工确认队列 · AI不代替你做确认' },
  memory: { title: '工作记忆', subtitle: '六类工作记忆 · 内容可查 · 来源可追溯 · 删除随时生效' },
  ability: { title: '专业能力', subtitle: '在用智能体与Skill · 在事项中按需调用 · 过程全程可查' },
  system: { title: '系统连接', subtitle: 'MCP连接的政务系统 · 只读默认开放 · 写入需人工确认' },
}

export default function Workbench() {
  const location = useLocation()
  const tab = new URLSearchParams(location.search).get('tab') || ''
  const View = tabViewMap[tab]
  const header = tabHeaderMap[tab]

  if (View && header) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">{header.title}</h1>
          <p className="page-subtitle">{header.subtitle} · 演示样例</p>
        </div>
        <View />
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">政务事项工作台</h1>
        <p className="page-subtitle">2026年9月14日 · 政数局 · 李明</p>
      </div>
      <TodayView />
    </div>
  )
}
