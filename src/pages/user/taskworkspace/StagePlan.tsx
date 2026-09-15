import { useEffect, useState } from 'react'
import { partyTaskLaunch, partySubTasks, partyExtraSubTask } from '../../../data/fixtures-party'
import { CollapsibleSection } from '../../../components/taskflow/CollapsibleSection'
import { AssistantSay } from './AssistantSay'
import type { StageProps } from './stage-props'
import { getStoryState, setStoryState } from '../../../utils/story-state'

export default function StagePlan({ readOnly, onGate }: StageProps) {
  const [added, setAdded] = useState(() => !!getStoryState().subtaskAdded)
  const [showAdd, setShowAdd] = useState(false)
  const [addText, setAddText] = useState('汇总各处室本周值班安排')

  const subtasks = added ? [...partySubTasks, partyExtraSubTask] : partySubTasks

  useEffect(() => {
    onGate({
      ready: true,
      label: '确认计划，开始执行',
      hint: `共 ${subtasks.length} 个分项任务 · 确认后进入白盒执行`,
    })
  }, [subtasks.length])

  const handleAdd = () => {
    setAdded(true)
    setShowAdd(false)
    setStoryState({ subtaskAdded: true })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <AssistantSay>
        已识别任务：<b>办会 · 会前准备</b>，关联事项「局党组第13次会议」（09-18 周五 09:00 · 局机关三楼党组会议室）。
        根据第 11/12 次党组会的办理经验，我拟定了 {subtasks.length} 个分项任务与系统访问范围，请您确认。
      </AssistantSay>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>任务启动卡</h2>
          <span className="badge badge-info">权限档位：{partyTaskLaunch.permissionLevel}</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <InfoRow label="任务目标" value={partyTaskLaunch.goal} />
          <InfoRow label="关联事项" value={partyTaskLaunch.matter} />
          <InfoRow label="经办人" value={partyTaskLaunch.owner} />
          <InfoRow label="计划输出" value={partyTaskLaunch.plannedOutputs} />
          <InfoRow label="记忆范围" value={partyTaskLaunch.memoryScope} />
        </div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <CollapsibleSection
            summary={
              <>
                <span className="badge badge-muted">按需下钻</span>
                需访问系统（{partyTaskLaunch.systems.length}）· 写入动作（{partyTaskLaunch.writeActions.length}）· Token 预算{' '}
                {partyTaskLaunch.tokenBudget.toLocaleString()}
              </>
            }
          >
            <div className="grid grid-2" style={{ gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>需访问系统</div>
                {partyTaskLaunch.systems.map((s) => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    <span className="badge badge-muted">{s.mode}</span>
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>写入动作</div>
                {partyTaskLaunch.writeActions.map((w) => (
                  <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    <span className="badge badge-warning">{w.mode}</span>
                    <span>{w.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>分项任务（{subtasks.length} 项）</h2>
          <span className="badge badge-muted">按过往经验生成</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {subtasks.map((t) => {
            const isExtra = t.id === partyExtraSubTask.id
            return (
              <div
                key={t.id}
                style={{
                  border: `1px solid ${isExtra ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  background: isExtra ? 'var(--ui-brand-soft)' : 'var(--card)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <span className="badge badge-info">{t.code}</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{t.title}</span>
                  {isExtra && <span className="badge badge-success">已新增</span>}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)', lineHeight: 1.6, marginBottom: 0 }}>
                  {t.summary}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {t.sourceSystems.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{t.experience}</span>
                </div>
              </div>
            )
          })}
        </div>

        {!readOnly && showAdd && (
          <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-4)', border: '1px dashed var(--primary)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>新增分项任务（示例已预填，可直接添加）</span>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                value={addText}
                onChange={(e) => setAddText(e.target.value)}
                style={{
                  flex: 1,
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--input)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: 'var(--text-md)',
                  color: 'var(--foreground)',
                  background: 'var(--card)',
                }}
              />
              <button className="btn btn-primary" onClick={handleAdd}>添加</button>
              <button className="btn btn-ghost" onClick={() => setShowAdd(false)}>取消</button>
            </div>
          </div>
        )}
        {!readOnly && !added && !showAdd && (
          <div style={{ marginTop: 'var(--space-3)' }}>
            <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => setShowAdd(true)}>
              ＋ 新增分项任务
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
      <span style={{ color: 'var(--muted-foreground)', minWidth: '72px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'var(--foreground)', lineHeight: 1.6 }}>{value}</span>
    </div>
  )
}
