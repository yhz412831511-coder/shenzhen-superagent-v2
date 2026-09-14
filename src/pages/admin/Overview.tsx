import { Link } from 'react-router-dom'
import { tokenUsage, riskEvents } from '../../data/fixtures'

const metrics = [
  {
    question: '谁在用AI办什么',
    icon: '◐',
    value: '1,260名用户 · 510项事项 · 12个部门',
    items: [
      { label: '活跃用户', value: '1,260', tone: 'info' as const },
      { label: '在办事项', value: '510', tone: 'info' as const },
      { label: '覆盖部门', value: '12', tone: 'info' as const },
    ],
  },
  {
    question: '危险AI行为',
    icon: '⚑',
    value: '4个应用 · 20次阻断 · 3项处置中',
    items: [
      { label: '危险应用', value: '4', tone: 'danger' as const },
      { label: '累计阻断', value: '20', tone: 'danger' as const },
      { label: '处置中', value: '3', tone: 'danger' as const },
    ],
  },
  {
    question: '疑似违规推导',
    icon: '⚠',
    value: '5次 · 4次阻断 · 1次待确认',
    items: [
      { label: '触发次数', value: '5', tone: 'danger' as const },
      { label: '已阻断', value: '4', tone: 'danger' as const },
      { label: '待确认', value: '1', tone: 'danger' as const },
    ],
  },
  {
    question: '动作被阻断/降级/转人工',
    icon: '⊘',
    value: '15次阻断 · 8次降级 · 12次转人工',
    items: [
      { label: '阻断', value: '15', tone: 'danger' as const },
      { label: '降级', value: '8', tone: 'warning' as const },
      { label: '转人工', value: '12', tone: 'warning' as const },
    ],
  },
  {
    question: 'Token和算力',
    icon: '₮',
    value: '41.2M / 50M · 部门TOP3 · 节省3.3M',
    items: [
      { label: '已用Token', value: '41.2M', tone: 'info' as const },
      { label: '预算上限', value: '50M', tone: 'info' as const },
      { label: '节省Token', value: '3.3M', tone: 'success' as const },
    ],
  },
  {
    question: 'AI学会了什么',
    icon: '↗',
    value: '2个Skill · 1个试运行 · 0个待审批',
    items: [
      { label: '已发布Skill', value: '2', tone: 'success' as const },
      { label: '试运行', value: '1', tone: 'warning' as const },
      { label: '待审批', value: '0', tone: 'info' as const },
    ],
  },
]

const departmentMatters = [
  { name: '政数局', count: 42, percent: 100 },
  { name: '人社局', count: 18, percent: 43 },
  { name: '住建局', count: 12, percent: 29 },
  { name: '发改委', count: 8, percent: 19 },
  { name: '其他部门', count: 30, percent: 71 },
]

const recentEvents = [
  { time: '09:45', matter: '重点任务专题调度会', agent: '会议督办Agent@2.1', action: '读取项目台账进度', status: '正常' },
  { time: '09:42', matter: '老系统AI改造试点', agent: '系统改造Agent@1.2', action: 'MCP接口调用query_project', status: '正常' },
  { time: '09:38', matter: '重点任务专题调度会', agent: '会议督办Agent@2.1', action: '检测到口径冲突(85% vs 72%)', status: '预警' },
  { time: '09:35', matter: '一件事上线联调', agent: '政务服务Agent@1.5', action: '跨部门数据组合推导', status: '阻断' },
  { time: '09:30', matter: '省级专项督查报送', agent: '督查报送Agent@1.0', action: '收集5/7部门反馈', status: '正常' },
  { time: '09:25', matter: '重点任务专题调度会', agent: '会议督办Agent@2.1', action: '生成6项督办任务清单', status: '正常' },
  { time: '09:20', matter: '老系统AI改造试点', agent: '系统改造Agent@1.2', action: '批量导出被阻断', status: '阻断' },
  { time: '09:15', matter: '重点任务专题调度会', agent: '会议督办Agent@2.1', action: '历史纪要分段抽取', status: '正常' },
]

function statusBadge(status: string) {
  if (status === '正常') return <span className="badge badge-success">正常</span>
  if (status === '预警') return <span className="badge badge-warning">预警</span>
  if (status === '阻断') return <span className="badge badge-danger">阻断</span>
  return <span className="badge badge-muted">{status}</span>
}

function toneClass(tone: string) {
  if (tone === 'success') return 'badge-success'
  if (tone === 'warning') return 'badge-warning'
  if (tone === 'danger') return 'badge-danger'
  if (tone === 'info') return 'badge-info'
  return 'badge-muted'
}

export default function Overview() {
  const cityBudgetM = (tokenUsage.cityBudget / 1000000).toFixed(0)
  const cityUsedM = (tokenUsage.cityUsed / 1000000).toFixed(1)
  const usagePercent = ((tokenUsage.cityUsed / tokenUsage.cityBudget) * 100).toFixed(1)

  return (
    <div>
      <div className="page-header">
        <div className="page-title">全市AI运行与进化总览<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">回答领导关心的六个问题：谁在用AI办什么 · 危险AI行为 · 疑似违规推导 · 动作管控 · Token与算力 · AI学会了什么</div>
      </div>

      <div className="grid grid-3" style={{ marginBottom: 'var(--space-5)' }}>
        {metrics.map((m) => (
          <div key={m.question} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)' }}>{m.icon}</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{m.question}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {m.items.map((it) => (
                <div key={it.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--foreground)' }}>{it.value}</span>
                  <span className={`badge ${toneClass(it.tone)}`}>{it.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card">
          <div className="card-title">事项分布（部门维度）</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {departmentMatters.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ width: '80px', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', flexShrink: 0 }}>{d.name}</span>
                <div style={{ flex: 1, height: '20px', background: 'var(--muted)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${d.percent}%`,
                    height: '100%',
                    background: 'var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'width 0.3s',
                  }} />
                </div>
                <span style={{ width: '40px', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--foreground)', textAlign: 'right' }}>{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Token分布（模型类型）</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: `conic-gradient(
                var(--chart-1) 0% ${tokenUsage.models[0].percentage}%,
                var(--chart-2) ${tokenUsage.models[0].percentage}% ${tokenUsage.models[0].percentage + tokenUsage.models[1].percentage}%,
                var(--chart-3) ${tokenUsage.models[0].percentage + tokenUsage.models[1].percentage}% 100%
              )`,
              position: 'relative',
              flexShrink: 0,
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'var(--card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--foreground)' }}>{cityUsedM}M</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>已用Token</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {tokenUsage.models.map((m, i) => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: `var(--chart-${i + 1})` }} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{m.name}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--foreground)' }}>{m.percentage}%</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>({(m.tokens / 1000000).toFixed(1)}M)</span>
                </div>
              ))}
              <div className="divider" style={{ margin: 'var(--space-1) 0' }} />
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>预算</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}> {cityBudgetM}M</span>
                </div>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>使用率</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--warning)' }}> {usagePercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">全市运行 · 最近事件</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: '70px' }}>时间</th>
              <th>事项</th>
              <th>Agent</th>
              <th>动作</th>
              <th style={{ width: '80px' }}>状态</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((e, i) => (
              <tr key={i}>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{e.time}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{e.matter}</td>
                <td style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>{e.agent}</td>
                <td style={{ fontSize: 'var(--text-sm)' }}>{e.action}</td>
                <td>{statusBadge(e.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>深入查看单任务全链路</div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--space-1)' }}>
            从任务发起到写回，查看完整的工具调用、Token消耗、审批记录和证据链
          </div>
        </div>
        <Link to="/admin/task/TASK-20260910-0086" className="btn btn-primary">
          查看单任务全链路 →
        </Link>
      </div>
    </div>
  )
}
