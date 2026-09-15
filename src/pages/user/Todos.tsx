import { useNavigate } from 'react-router-dom'
import { partyTodos, partyDoneMatters, partyTaskId } from '../../data/fixtures-party'
import { partyTaskFlow } from '../../config/task-flows'
import { getStoryState } from '../../utils/story-state'

export default function Todos() {
  const navigate = useNavigate()
  const story = getStoryState()
  const inProgress = story.stage != null && !story.storyFinished

  const activeStageIndex = story.stage != null ? Math.max(1, story.stage) : 1
  const activeStage = partyTaskFlow.stages[activeStageIndex]

  const casePending =
    inProgress &&
    story.stage != null &&
    story.stage >= 3 &&
    (story.caseAAllowed == null || story.caseBSent == null)

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">待办任务</h1>
        <p className="page-subtitle">我需要处理和确认的任务汇总 · 演示样例</p>
      </div>

      {/* ① 进行中的任务 */}
      <div className="card mb-4" style={{ borderTop: inProgress ? '3px solid var(--primary)' : '3px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>进行中的任务</h2>
          <span className="badge badge-info">1 个</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        {inProgress ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', padding: 'var(--space-2) 0' }}>
            <span className="badge badge-info">办会</span>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{partyTaskFlow.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                {partyTaskFlow.taskId} · 发起于 09-15 10:30 · 当前阶段：{activeStage.label}（第 {activeStageIndex + 1} 步 / 共 {partyTaskFlow.stages.length} 步）
              </div>
            </div>
            <button className="btn btn-primary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => navigate(`/task/${partyTaskId}`)}>
              回到任务
            </button>
          </div>
        ) : story.storyFinished ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', padding: 'var(--space-2) 0' }}>
            <span className="badge badge-success">已完成</span>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{partyTaskFlow.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                {partyTaskFlow.taskId} · 09-15 完成 · 会前材料 3 份就绪，会议通知已发布（模拟）
              </div>
            </div>
            <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => navigate(`/task/${partyTaskId}?replay=1`)}>
              查看任务回放
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2) 0' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>当前没有进行中的任务</span>
            <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => navigate('/workbench')}>
              从今日工作发起任务
            </button>
          </div>
        )}
      </div>

      {/* ② 待我处理/确认 */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>待我处理 / 确认</h2>
          <span className="badge badge-muted">{partyTodos.length + (casePending ? 1 : 0)} 条</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {casePending && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3)',
                border: '1px solid var(--primary)',
                background: 'var(--ui-brand-soft)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
              }}
            >
              <span className="badge badge-info">智能体请示</span>
              <span style={{ flex: 1, color: 'var(--foreground)' }}>办会任务发现 2 处缺口，等待您确认（CODES 取数授权 / OA 提醒发送）</span>
              <button className="btn btn-primary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => navigate(`/task/${partyTaskId}`)}>
                去确认
              </button>
            </div>
          )}
          {partyTodos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
              }}
            >
              <span className={`badge badge-${todo.typeBadge}`}>{todo.type}</span>
              <span style={{ flex: 1, color: 'var(--foreground)' }}>{todo.title}</span>
              <span style={{ color: todo.due.includes('今日') ? 'var(--danger)' : 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                {todo.due}
              </span>
              <span className="demo-label">{todo.action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ③ 已完成近期事项 */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>已完成 · 近期事项</h2>
          <button className="btn btn-ghost" style={{ fontSize: 'var(--text-sm)', marginLeft: 'auto' }} onClick={() => navigate('/matters')}>
            进入事项中心
          </button>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {partyDoneMatters.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
              }}
            >
              <span className="exec-check">✓</span>
              <span style={{ flex: 1, color: 'var(--foreground)' }}>{m.title}</span>
              <span style={{ color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{m.completedAt} 完成</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
