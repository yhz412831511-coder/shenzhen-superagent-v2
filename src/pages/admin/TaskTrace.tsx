import { useParams, Link } from 'react-router-dom'
import {
  matterAgentChain,
  matterAgentTimeline,
} from '../../data/fixtures-admin'
import {
  partyTaskId,
  partyTaskLaunch,
  partyTokenUsage,
  partyNewMemories,
  partyModelRouting,
  partyOutputCompleted,
  partyNoticeDraft,
  partyFollowUpTodo,
} from '../../data/fixtures-party'

const recalledMemories = [
  { type: '情景记忆', title: '第12次党组会：领导对政务信息系统管理提出强烈关注' },
  { type: '程序记忆', title: '党组会会前准备标准流程（3个分项）' },
  { type: '组织记忆', title: '党组会议题征集责任处室清单' },
  { type: '工作记忆', title: '近期重要督办任务状态' },
]

const approvals = [
  {
    time: '10:12',
    title: '请示 ① · CODES 授权',
    detail: '情景记忆发现领导关注事项，申请从深圳市一体化数字资源管理系统（CODES）补充详情',
    result: '用户允许 · 临时授权，任务结束自动回收',
    tone: 'cyan',
  },
  {
    time: '10:31',
    title: '请示 ② · OA 提醒',
    detail: '交叉验证发现政务算力建设「已完成」但支撑公文缺失，申请向数字基础设施处发送 OA 提醒',
    result: '用户确认 · 写操作留痕可查',
    tone: 'amber',
  },
]

const savingsTotal = partyTokenUsage.savings.reduce((a, s) => a + s.saved, 0)
const actualTokens = 19900
const baselineTokens = actualTokens + savingsTotal

export default function TaskTrace() {
  const { taskId } = useParams()
  const isPartyTask = !taskId || taskId === partyTaskId

  if (!isPartyTask) {
    return (
      <div className="ad-page">
        <div className="ad-header">
          <div>
            <div className="ad-header-title">单任务全链路</div>
            <div className="ad-header-sub">任务 {taskId} 未收录演示链路</div>
          </div>
        </div>
        <div className="ad-card" style={{ padding: 'var(--space-8) var(--space-5)', textAlign: 'center' }}>
          <div className="ad-kpi-label" style={{ marginBottom: 'var(--space-2)' }}>当前演示样例仅收录 1 条主线任务</div>
          <Link to={`/admin/task/${partyTaskId}`} className="ad-drill">查看 TASK-PARTY-001 全链路 →</Link>
        </div>
      </div>
    )
  }

  const chain = matterAgentChain

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">单任务全链路</div>
          <div className="ad-header-sub">
            {chain.task} · {chain.title} · 与用户端故事线同源
          </div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />TRACE-20260915-1030-0001</span>
        </div>
      </div>

      {/* 任务概览 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          任务概览
          <span className="sub">{chain.owner}</span>
          <Link to={`/task/${partyTaskId}`} className="ad-drill">在用户端查看此任务 →</Link>
        </div>
        <div className="ad-metric-row">
          <div className="ad-metric">
            <span className="k">关联事项</span>
            <span className="v" style={{ fontSize: 'var(--text-md)' }}>{chain.matter}</span>
          </div>
          <div className="ad-metric">
            <span className="k">状态</span>
            <span className="ad-badge ad-badge-green">已完成</span>
          </div>
          <div className="ad-metric">
            <span className="k">权限档位</span>
            <span className="ad-badge ad-badge-cyan">{partyTaskLaunch.permissionLevel}</span>
          </div>
          <div className="ad-metric">
            <span className="k">沙箱</span>
            <span className="ad-num v" style={{ fontSize: 'var(--text-md)', color: 'var(--ad-cyan)' }}>BOX-01 · 已回收</span>
          </div>
          <div className="ad-metric">
            <span className="k">Token 预算 / 实际</span>
            <span className="ad-num v" style={{ fontSize: 'var(--text-md)' }}>
              20,000 / 19,900
            </span>
          </div>
        </div>
        <div className="ad-flow" style={{ marginTop: 'var(--space-4)' }}>
          {chain.stages.map((s) => (
            <div className="ad-flow-node hot" key={s.label}>
              <div className="ad-flow-count" style={{ fontSize: 'var(--text-sm)' }}>{s.value}</div>
              <div className="ad-flow-dot" />
              <div className="ad-flow-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 全链路时间轴 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          全链路时间轴
          <span className="sub">含模型调度 · Token · 沙箱关联 · 人工确认节点</span>
        </div>
        <div className="ad-tl">
          {matterAgentTimeline.map((row, i) => (
            <div className={`ad-tl-row ${i === 0 ? 'plain' : ''}`} key={row.time + row.node}>
              <span className="ad-tl-time">{row.time}</span>
              <span className="ad-tl-dot" />
              <div className="ad-tl-body">
                <div className="ad-tl-node">{row.node}</div>
                <div className="ad-tl-detail">{row.detail}</div>
                <div className="ad-tl-meta">
                  <span className="ad-tl-chip model">{row.model}</span>
                  <span className="ad-tl-chip token">{row.token}</span>
                  <span className="ad-tl-chip">{row.sandbox}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 关联记忆 + 关联系统 */}
      <div className="ad-grid-2 mb-4">
        <div className="ad-card">
          <div className="ad-card-title">
            关联记忆
            <span className="sub">召回 4 条 · 新学习 4 条（经确认）</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {recalledMemories.map((m) => (
              <div key={m.title} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                <span className="ad-badge ad-badge-blue" style={{ flexShrink: 0 }}>{m.type}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)' }}>{m.title}</span>
              </div>
            ))}
          </div>
          <div className="ad-kpi-label" style={{ marginBottom: 'var(--space-2)' }}>新学习记忆（任务收尾经用户确认）</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {partyNewMemories.map((m) => (
              <div key={m.id} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                <span className="ad-badge ad-badge-green" style={{ flexShrink: 0 }}>{m.type}</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)' }}>{m.content}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">
            关联系统与写操作
            <span className="sub">读取 5 系统 · 写操作 2 项均经确认</span>
          </div>
          <table className="ad-table">
            <thead>
              <tr>
                <th>系统</th>
                <th style={{ width: '110px' }}>访问方式</th>
              </tr>
            </thead>
            <tbody>
              {partyTaskLaunch.systems.map((s) => (
                <tr key={s.name}>
                  <td>{s.name}</td>
                  <td>
                    {s.mode === '只读'
                      ? <span className="ad-badge ad-badge-green">只读</span>
                      : <span className="ad-badge ad-badge-amber">{s.mode}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ad-kpi-label" style={{ margin: 'var(--space-4) 0 var(--space-2)' }}>写操作（需确认）</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {partyTaskLaunch.writeActions.map((w) => (
              <div key={w.name} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                <span className="ad-badge ad-badge-red" style={{ flexShrink: 0 }}>写</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)' }}>{w.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 请示与审批 + Token */}
      <div className="ad-grid-2 mb-4">
        <div className="ad-card">
          <div className="ad-card-title">
            请示与人工确认
            <span className="sub">2 项关键决策均由用户拍板</span>
          </div>
          <div className="ad-tl">
            {approvals.map((a) => (
              <div className="ad-tl-row" key={a.title}>
                <span className="ad-tl-time">{a.time}</span>
                <span className="ad-tl-dot" />
                <div className="ad-tl-body">
                  <div className="ad-tl-node" style={{ fontSize: 'var(--text-sm)' }}>{a.title}</div>
                  <div className="ad-tl-detail">{a.detail}</div>
                  <div className="ad-tl-meta">
                    <span className={`ad-badge ${a.tone === 'cyan' ? 'ad-badge-cyan' : 'ad-badge-amber'}`}>{a.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ad-card">
          <div className="ad-card-title">
            Token 与模型调度
            <span className="sub">预算内完成 · 白盒口径</span>
          </div>
          <div className="ad-metric-row" style={{ marginBottom: 'var(--space-4)' }}>
            <div className="ad-metric">
              <span className="k">无优化基线</span>
              <span className="v">{baselineTokens.toLocaleString()}</span>
            </div>
            <div className="ad-metric">
              <span className="k">调度节省</span>
              <span className="v" style={{ color: 'var(--ad-green)' }}>−{savingsTotal.toLocaleString()}</span>
            </div>
            <div className="ad-metric">
              <span className="k">实际消耗</span>
              <span className="v" style={{ color: 'var(--ad-cyan)' }}>{actualTokens.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {partyModelRouting.map((m, i) => (
              <div key={m.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: 'var(--text-sm)' }}>{m.name}<span style={{ color: 'var(--ad-muted)', fontSize: 'var(--text-xs)' }}> · {m.used}</span></span>
                  <span className="ad-num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{m.percentage}%</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(138,163,199,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${m.percentage}%`, height: '100%', background: ['var(--ad-cyan)', 'var(--ad-blue)', 'var(--ad-green)'][i], borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="ad-sb-note" style={{ marginTop: 'var(--space-4)' }}>
            节省构成：{partyTokenUsage.savings.map((s) => `${s.type} ${s.saved.toLocaleString()}`).join(' · ')}
          </div>
        </div>
      </div>

      {/* 产出物 */}
      <div className="ad-card">
        <div className="ad-card-title">
          产出物
          <span className="sub">3 份材料 · 1 份通知 · 1 项后续待办</span>
        </div>
        <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
          {partyOutputCompleted.map((o) => (
            <div key={o.id} style={{
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(17, 27, 48, 0.6)',
              border: '1px solid var(--ad-border-soft)',
            }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff', marginBottom: 'var(--space-1)' }}>{o.title}</div>
              <div className="ad-sb-note">{o.detail}</div>
              <div className="ad-kpi-label" style={{ marginTop: 'var(--space-1)' }}>来源：{o.source}</div>
            </div>
          ))}
        </div>
        <div className="ad-grid-2">
          <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', background: 'rgba(0, 212, 255, 0.05)', border: '1px solid var(--ad-border-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
              <span className="ad-badge ad-badge-cyan">会议通知</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{partyNoticeDraft.title}</span>
            </div>
            <div className="ad-sb-note">发布至 {partyNoticeDraft.group} · 经用户确认后发布</div>
          </div>
          <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--ad-border-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
              <span className="ad-badge ad-badge-green">后续待办</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{partyFollowUpTodo.title}</span>
            </div>
            <div className="ad-sb-note">责任人 {partyFollowUpTodo.owner} · 截止 {partyFollowUpTodo.due}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
