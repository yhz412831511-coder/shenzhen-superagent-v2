import { useNavigate } from 'react-router-dom'
import { partyNewMemories, partyMemoryTypes, partyTaskId } from '../../data/fixtures-party'
import { selfEvolvedMemories } from '../../data/fixtures-nav'
import { getStoryState } from '../../utils/story-state'

export default function MemoryCenter() {
  const navigate = useNavigate()
  const story = getStoryState()
  const learned = !!story.memoriesLearned
  const total = partyMemoryTypes.reduce((n, t) => n + t.count, 0)
  const pendingCount = learned ? 0 : partyNewMemories.length

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title">记忆中心</h1>
          <p className="page-subtitle">
            六类记忆统一管理 · 共 {total} 条 · {pendingCount > 0 ? `${pendingCount} 条待确认` : '无待确认'} · 演示样例
          </p>
        </div>
        <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => navigate('/ontology')}>
          本体关系网络
        </button>
      </div>

      {/* ① 六大类记忆 */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>六类记忆</h2>
          <span className="badge badge-muted">内容可查 · 来源可追溯</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div className="grid grid-3">
          {partyMemoryTypes.map((mt) => (
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
                <span className="badge badge-muted">
                  {mt.count} 条{mt.delta > 0 ? ` · +${mt.delta}` : ''}
                </span>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>
                {mt.userLabel} · {mt.example}
              </span>
              {mt.items.slice(0, 2).map((item) => (
                <span key={item} style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', paddingLeft: 'var(--space-2)' }}>
                  ● {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ② 新增待确认 */}
      <div className="card mb-4" style={{ borderTop: pendingCount > 0 ? '3px solid var(--warning)' : '3px solid var(--success)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>新增待确认</h2>
          {pendingCount > 0 ? (
            <span className="badge badge-warning">{pendingCount} 条待确认</span>
          ) : (
            <span className="badge badge-success">已归集</span>
          )}
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        {pendingCount > 0 ? (
          <>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
              本次任务执行过程中形成的新记忆，确认学习后将按事项归集、按需调用。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {partyNewMemories.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    border: '1px solid var(--warning)',
                    background: 'var(--warning-soft)',
                    borderRadius: 'var(--radius-md)',
                    flexWrap: 'wrap',
                  }}
                >
                  <span className={`badge ${m.typeBadge}`}>{m.type}</span>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.6 }}>{m.content}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>来源：{m.origin}</div>
                  </div>
                  <span className="badge badge-warning">待确认</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }} onClick={() => navigate(`/task/${partyTaskId}`)}>
              去确认
            </button>
          </>
        ) : (
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
            {learned
              ? '本次任务的新记忆已确认学习并归集至六类记忆，可在上方各类别中查看。'
              : '当前没有新增待确认的记忆。发起任务后，任务执行过程形成的新记忆将在这里等待确认。'}
          </p>
        )}
      </div>

      {/* ③ 自进化提炼 */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>自进化提炼</h2>
          <span className="badge badge-info">经验池 · 已审核</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-3)' }}>
          由经验池从大量任务执行中提炼、经管理端审核后沉淀的规律性记忆。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {selfEvolvedMemories.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                flexWrap: 'wrap',
              }}
            >
              <span className="badge badge-info">{m.type}</span>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.6 }}>{m.content}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>
                  来源：{m.origin} · {m.time}
                </div>
              </div>
              <span className="badge badge-success">已沉淀</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
