import { useEffect, useState } from 'react'
import {
  partyCaseA,
  partyCaseB,
  partyCaseASteps,
  partyCaseBSteps,
  type PartyExecStep,
} from '../../../data/fixtures-party'
import { ExecStep } from '../../../components/chat/ExecStep'
import { InlineAskCard } from '../../../components/taskflow/InlineAskCard'
import { AssistantSay } from './AssistantSay'
import type { StageProps } from './stage-props'
import { getStoryState, setStoryState } from '../../../utils/story-state'

const summaryCards = [
  {
    title: 'T1 上次任务核查',
    stat: '5 项',
    detail: '已完成 2 · 进行中 2 · 待验证 1',
    source: '会议系统 + 任务跟踪',
  },
  {
    title: 'T2 处室议题征集',
    stat: '5 / 6',
    detail: '政策法规处未提交',
    source: 'OA系统',
  },
  {
    title: 'T3 督办执行情况',
    stat: '6 项',
    detail: '1 项进度描述过简',
    source: '督办系统',
  },
]

export default function StageDecide({ readOnly, onGate }: StageProps) {
  const initial = getStoryState()
  const [caseA, setCaseA] = useState<boolean | null>(() =>
    readOnly ? (initial.caseAAllowed ?? true) : (initial.caseAAllowed ?? null)
  )
  const [caseB, setCaseB] = useState<boolean | null>(() =>
    readOnly ? (initial.caseBSent ?? true) : (initial.caseBSent ?? null)
  )
  const both = caseA !== null && caseB !== null

  const supplementSteps: PartyExecStep[] = [
    ...(caseA ? partyCaseASteps : []),
    ...(caseB ? partyCaseBSteps : []),
  ]
  const [supRevealed, setSupRevealed] = useState(readOnly ? supplementSteps.length : 0)
  const supDone = readOnly || !both || supRevealed >= supplementSteps.length

  useEffect(() => {
    if (readOnly || !both || supRevealed >= supplementSteps.length) return
    const timer = setTimeout(() => setSupRevealed((n) => n + 1), 1100)
    return () => clearTimeout(timer)
  }, [both, supRevealed, supplementSteps.length, readOnly])

  useEffect(() => {
    if (readOnly) return
    if (!both) {
      onGate({ ready: false, label: '等待 2 项请示确认', hint: '请对案例 A、B 做出决定后继续' })
    } else if (!supDone) {
      onGate({ ready: false, label: `补充执行中（${supRevealed}/${supplementSteps.length} 步）…` })
    } else {
      onGate({ ready: true, label: '查看产出物', hint: '会前材料 3 份 + 会议通知待确认' })
    }
  }, [readOnly, both, supDone, supRevealed, supplementSteps.length])

  const chooseA = (yes: boolean) => {
    setCaseA(yes)
    setStoryState({ caseAAllowed: yes })
  }
  const chooseB = (yes: boolean) => {
    setCaseB(yes)
    setStoryState({ caseBSent: yes })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <AssistantSay>
        三个分项执行完毕。交叉验证发现 <b>2 处信息缺口</b>——一处处事督办描述过简（情景记忆提示这是领导重点关注事项），
        一处督办状态与支撑公文不一致。需要您拍板后我才能继续。
      </AssistantSay>

      <div className="grid grid-3">
        {summaryCards.map((c) => (
          <div key={c.title} className="card" style={{ borderTop: '3px solid var(--primary)', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{c.title}</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--foreground)', margin: 'var(--space-1) 0' }}>{c.stat}</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>{c.detail}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)' }}>来源：{c.source}</div>
          </div>
        ))}
      </div>

      <InlineAskCard card={partyCaseA} decision={caseA} onChoose={chooseA} readOnly={readOnly} />
      <InlineAskCard card={partyCaseB} decision={caseB} onChoose={chooseB} readOnly={readOnly} />

      {both && supplementSteps.length > 0 && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>补充执行（经您允许后执行）</h2>
            {supDone ? <span className="badge badge-success">已完成</span> : <span className="badge badge-warning">执行中</span>}
          </div>
          <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {supplementSteps.slice(0, supRevealed).map((step, idx) => (
              <ExecStep key={step.id} step={step} status={idx < supRevealed - 1 || supDone ? 'done' : 'running'} />
            ))}
          </div>
        </div>
      )}

      {both && supplementSteps.length === 0 && (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="badge badge-muted">无需补充执行</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
            两项请示均选择暂不执行，汇报材料将沿用系统现有描述，缺口在产出物中保留提示。
          </span>
        </div>
      )}
    </div>
  )
}
