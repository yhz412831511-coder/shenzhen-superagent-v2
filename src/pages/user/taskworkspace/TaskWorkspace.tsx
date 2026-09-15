import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { partyTaskFlow } from '../../../config/task-flows'
import { getStoryState, resetStoryState, setStoryState, type PartyStoryState } from '../../../utils/story-state'
import StagePlan from './StagePlan'
import StageExec from './StageExec'
import StageDecide from './StageDecide'
import StageOutput from './StageOutput'
import StageMemory from './StageMemory'
import type { StageGate } from './stage-props'

const LAST_STAGE = 5

export default function TaskWorkspace() {
  const { taskId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [story, setStory] = useState<PartyStoryState>(() => getStoryState())
  const forceReplay = searchParams.get('replay') === '1'
  const readOnly = forceReplay || !!story.storyFinished

  const currentStage = readOnly
    ? LAST_STAGE
    : story.stage != null
      ? Math.min(Math.max(story.stage, 1), LAST_STAGE)
      : 1

  const [viewStage, setViewStage] = useState(() => (readOnly ? 4 : currentStage))
  const [gates, setGates] = useState<Record<number, StageGate>>({})
  const prevStageRef = useRef(viewStage)

  useEffect(() => {
    if (prevStageRef.current !== viewStage) {
      const prev = prevStageRef.current
      prevStageRef.current = viewStage
      setGates((g) => {
        const next = { ...g }
        delete next[prev]
        return next
      })
    }
  }, [viewStage])

  const stage = partyTaskFlow.stages[viewStage]
  const gate = gates[viewStage]
  const reviewing = !readOnly && viewStage < currentStage

  const handleAdvance = () => {
    if (readOnly || reviewing) return
    if (viewStage >= LAST_STAGE) {
      setStoryState({ storyFinished: true, memoriesLearned: true })
      navigate('/workbench')
      return
    }
    const next = viewStage + 1
    setStoryState({ stage: next })
    setStory((s) => ({ ...s, stage: next }))
    setViewStage(next)
  }

  const handleBottom = () => {
    if (gate?.action) {
      gate.action()
      return
    }
    handleAdvance()
  }

  const handleReset = () => {
    resetStoryState()
    navigate('/workbench')
  }

  const progressSegments = (readOnly ? LAST_STAGE : currentStage) / LAST_STAGE

  return (
    <div>
      <div className="tw-header">
        <div className="tw-bar">
          <span className={`tw-bar-tag ${readOnly ? 'done' : ''}`}>{readOnly ? '办会 · 已完成' : '办会 · 进行中'}</span>
          <span className="tw-bar-title">{partyTaskFlow.title}</span>
          <span className="tw-bar-id">{taskId}</span>
          <button className="btn btn-ghost tw-bar-back" onClick={() => navigate('/workbench')}>
            返回工作台
          </button>
        </div>

        <div className="tw-rail-track">
          <div className="tw-rail-line" />
          <div className="tw-rail-progress" style={{ width: `${progressSegments * 83.3333}%` }} />
          {partyTaskFlow.stages.map((s, i) => {
            const state = i === 0 || readOnly || i < currentStage ? 'done' : i === currentStage ? 'current' : 'locked'
            const clickable = i === 0 || readOnly || i <= currentStage
            return (
              <div key={s.key} className={`tw-node-wrap ${state}`}>
                <button
                  className={`tw-node ${state} ${i === viewStage && state !== 'current' ? 'viewing' : ''}`}
                  disabled={!clickable}
                  title={s.railHint}
                  onClick={() => {
                    if (i === 0) navigate('/workbench')
                    else if (clickable) setViewStage(i)
                  }}
                >
                  {state === 'done' ? '✓' : i}
                </button>
                <span className="tw-node-label">{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {readOnly && (
        <div className="tw-replay-tip">
          <span className="badge badge-success">任务已完成</span>
          <span>只读回放模式 · 点击上方任一环节可回看执行过程</span>
        </div>
      )}

      {reviewing && (
        <div className="tw-review-tip">
          <span className="badge badge-warning">回看</span>
          <span>您正在回看「{stage.label}」已完成的内容</span>
          <button className="btn btn-secondary" style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', padding: 'var(--space-1) var(--space-3)' }} onClick={() => setViewStage(currentStage)}>
            回到当前环节
          </button>
        </div>
      )}

      <div className="tw-stage" key={viewStage}>
        {viewStage === 1 && <StagePlan readOnly={readOnly || reviewing} onGate={(g) => setGates((prev) => ({ ...prev, [1]: g }))} />}
        {viewStage === 2 && <StageExec readOnly={readOnly || reviewing} onGate={(g) => setGates((prev) => ({ ...prev, [2]: g }))} />}
        {viewStage === 3 && <StageDecide readOnly={readOnly || reviewing} onGate={(g) => setGates((prev) => ({ ...prev, [3]: g }))} />}
        {viewStage === 4 && <StageOutput readOnly={readOnly || reviewing} onGate={(g) => setGates((prev) => ({ ...prev, [4]: g }))} />}
        {viewStage === 5 && <StageMemory readOnly={readOnly || reviewing} onGate={(g) => setGates((prev) => ({ ...prev, [5]: g }))} />}
      </div>

      <div className="tw-bottom">
        {readOnly ? (
          <>
            <span className="tw-bottom-hint">只读回放 · 全程手动推进的执行记录</span>
            <span style={{ flex: 1 }} />
            {story.storyFinished && (
              <button className="btn btn-ghost" onClick={handleReset}>重新演示</button>
            )}
          </>
        ) : reviewing ? (
          <>
            <span className="tw-bottom-hint">回看模式 · 推进已锁定</span>
            <span style={{ flex: 1 }} />
            <button className="btn btn-secondary" onClick={() => setViewStage(currentStage)}>回到当前环节</button>
          </>
        ) : (
          <>
            <span className="tw-bottom-hint">{gate?.hint ?? `当前环节 · ${stage.railHint}`}</span>
            <span style={{ flex: 1 }} />
            <button className="btn btn-primary" disabled={!gate?.ready} onClick={handleBottom}>
              {gate?.label ?? '下一步'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
