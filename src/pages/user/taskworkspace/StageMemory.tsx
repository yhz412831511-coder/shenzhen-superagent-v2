import { useEffect, useState } from 'react'
import { partyNewMemories, partyMemoryTypes, partyFollowUpTodo } from '../../../data/fixtures-party'
import { CollapsibleSection } from '../../../components/taskflow/CollapsibleSection'
import { AssistantSay } from './AssistantSay'
import type { StageProps } from './stage-props'

export default function StageMemory({ readOnly, onGate }: StageProps) {
  const [decided, setDecided] = useState<Record<string, 'learn' | 'skip'>>(() =>
    readOnly
      ? Object.fromEntries(partyNewMemories.map((m) => [m.id, 'learn' as const]))
      : {}
  )

  const decidedCount = Object.keys(decided).length
  const learnedCount = Object.values(decided).filter((v) => v === 'learn').length
  const allDecided = partyNewMemories.every((m) => decided[m.id])

  useEffect(() => {
    if (allDecided) {
      onGate({ ready: true, label: '完成任务，返回工作台', hint: '任务闭环：材料已就绪，记忆已归集' })
    } else {
      onGate({ ready: false, label: `请确认新记忆（${decidedCount}/${partyNewMemories.length}）` })
    }
  }, [allDecided, decidedCount])

  const handleDecide = (id: string, learn: boolean) => {
    setDecided((prev) => ({ ...prev, [id]: learn ? 'learn' : 'skip' }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <AssistantSay>
        任务收尾。本次执行形成了 <b>{partyNewMemories.length} 条新记忆</b>，请逐条确认学习或忽略；
        学习后相关记忆按事项归集、按需调用，来源全程可追溯。
      </AssistantSay>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>新记忆清单</h2>
          <span className="badge badge-info">
            {allDecided ? `已确认 · ${learnedCount}/${partyNewMemories.length} 条学习` : `${partyNewMemories.length} 条待确认`}
          </span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {partyNewMemories.map((m) => {
            const decision = decided[m.id]
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  border: `1px solid ${decision === 'learn' ? 'var(--success)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  background: decision === 'learn' ? 'var(--success-soft)' : 'var(--card)',
                  flexWrap: 'wrap',
                }}
              >
                <span className={`badge ${m.typeBadge}`}>{m.type}</span>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.6 }}>{m.content}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px' }}>来源：{m.origin}</div>
                </div>
                {decision ? (
                  <span className={`badge ${decision === 'learn' ? 'badge-success' : 'badge-muted'}`}>
                    {decision === 'learn' ? '已学习记录' : '已忽略'}
                  </span>
                ) : (
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-primary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => handleDecide(m.id, true)}>
                      学习并记录
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => handleDecide(m.id, false)}>
                      忽略
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>待办跟踪任务</h2>
          <span className="badge badge-info">收尾自动生成</span>
        </div>
        <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span className="badge badge-info">会议</span>
            <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{partyFollowUpTodo.title}</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', flexWrap: 'wrap' }}>
            <span>负责人：{partyFollowUpTodo.owner}</span>
            <span>截止：{partyFollowUpTodo.due}</span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', lineHeight: 1.6, margin: 0 }}>{partyFollowUpTodo.note}</p>
        </div>
      </div>

      <CollapsibleSection
        summary={
          <>
            <span className="badge badge-muted">按需下钻</span>
            六类工作记忆概览（更新后）
          </>
        }
      >
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
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{mt.userLabel} · {mt.example}</span>
              {mt.items.slice(0, 2).map((item) => (
                <span key={item} style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)', paddingLeft: 'var(--space-2)' }}>
                  ● {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  )
}
