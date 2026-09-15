import { useEffect, useState } from 'react'
import {
  partyOutputCompleted,
  partyOutputNeedHelp,
  partyMaterials,
  partyNoticeDraft,
  type PartyOutputItem,
} from '../../../data/fixtures-party'
import { MaterialPreviewCard } from '../../../components/taskflow/MaterialPreviewCard'
import { AssistantSay } from './AssistantSay'
import type { StageProps } from './stage-props'
import { getStoryState, setStoryState } from '../../../utils/story-state'

export default function StageOutput({ readOnly, onGate }: StageProps) {
  const initial = getStoryState()
  const caseA = readOnly ? (initial.caseAAllowed ?? true) : initial.caseAAllowed
  const caseB = readOnly ? (initial.caseBSent ?? true) : initial.caseBSent

  const [memoryRecorded, setMemoryRecorded] = useState(readOnly ? (initial.memoryRecorded ?? true) : !!initial.memoryRecorded)
  const [memoryText, setMemoryText] = useState('关键信息必须多系统交叉验证')
  const [noticePublished, setNoticePublished] = useState(readOnly ? (initial.noticePublished ?? true) : !!initial.noticePublished)

  useEffect(() => {
    if (noticePublished) {
      onGate({ ready: true, label: '进入记忆收尾', hint: '4 条新记忆待确认学习' })
    } else {
      onGate({ ready: false, label: '发布会议通知后继续', hint: '通知为对外写操作，需您确认发布' })
    }
  }, [noticePublished])

  const completed: PartyOutputItem[] = [
    ...partyOutputCompleted,
    ...(caseA
      ? [{ id: 'out-4', title: 'CODES 补充：政务信息系统管理详情', detail: '立项批复、6条里程碑、验收材料清单、责任处室已并入汇报材料', source: '深圳市一体化数字资源管理系统（CODES）· 经授权' }]
      : []),
    ...(caseB
      ? [{ id: 'out-5', title: 'OA 提醒已发送', detail: '数字基础设施处 · 要求09-17前回补《政务算力建设情况说明》', source: 'OA系统 · 写操作经确认' }]
      : []),
  ]

  const needHelp = partyOutputNeedHelp.map((h) =>
    h.id === 'help-2' && !caseB
      ? { ...h, detail: '建议线下催报或由办公室电话沟通，确保09-17前回补' }
      : h
  )

  const handleRecordMemory = () => {
    setMemoryRecorded(true)
    setStoryState({ memoryRecorded: true })
  }

  const handlePublish = () => {
    setNoticePublished(true)
    setStoryState({ noticePublished: true })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <AssistantSay>
        缺口已处理完毕。我完成了 <b>3 份会前材料</b>与<b>会议通知草稿</b>，材料可展开预览；
        会议通知为对外写操作，需您确认后才会发布。
      </AssistantSay>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>已完成</h2>
            <span className="badge badge-success">{completed.length} 项</span>
          </div>
          <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {completed.map((c) => (
              <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="exec-check">✓</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>{c.title}</span>
                </div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', paddingLeft: '24px' }}>{c.detail}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', paddingLeft: '24px' }}>来源：{c.source}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>需要您协助</h2>
            <span className="badge badge-warning">{needHelp.length} 项</span>
          </div>
          <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {needHelp.map((h) => (
              <div key={h.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className="badge badge-warning">待协助</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 500, color: 'var(--foreground)' }}>{h.title}</span>
                </div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', paddingLeft: '4px' }}>{h.detail}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', paddingLeft: '4px' }}>来源：{h.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">沉淀执行标准（程序记忆）</h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start', marginBottom: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <span style={{ width: '22px', height: '22px', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', flexShrink: 0 }}>政</span>
          <span style={{ fontSize: 'var(--text-md)', color: 'var(--foreground)', lineHeight: 1.6 }}>
            本次任务中 2 处信息缺口均由多系统交叉验证识别。是否沉淀本次的执行标准，作为程序记忆用于类似任务？
          </span>
        </div>
        {memoryRecorded ? (
          <div style={{ padding: 'var(--space-4)', border: '1px solid var(--primary)', background: 'var(--ui-brand-soft)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span className="badge badge-info">程序记忆</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{memoryText}</span>
              <span className="badge badge-success">已记录</span>
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <span>适用范围：类似会前准备任务</span>
              <span>来源：用户口述 · 2026-09-15</span>
              <span>将在记忆收尾环节由您确认学习</span>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <input
              value={memoryText}
              onChange={(e) => setMemoryText(e.target.value)}
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
            <button className="btn btn-primary" onClick={handleRecordMemory}>发送</button>
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>会前材料预览（3 份）</h2>
          <span className="demo-label">演示样例</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          {partyMaterials.map((mat) => (
            <MaterialPreviewCard key={mat.id} material={mat} />
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">会议通知</h2>
        <div style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--muted)', marginTop: 'var(--space-3)' }}>
          <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)', marginBottom: 'var(--space-2)' }}>
            {partyNoticeDraft.title}
          </div>
          {partyNoticeDraft.body.map((line, i) => (
            <div key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {line}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
          <span style={{ width: '22px', height: '22px', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', flexShrink: 0 }}>政</span>
          <span style={{ fontSize: 'var(--text-md)', color: 'var(--foreground)', lineHeight: 1.6 }}>
            是否在粤政易「{partyNoticeDraft.group}」发布会议通知？
          </span>
        </div>
        {noticePublished ? (
          <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-4)', border: '1px solid var(--success)', background: 'var(--success-soft)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span className="badge badge-success">已发布</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>发布回执</span>
              <span className="demo-label">模拟发布 · 演示样例</span>
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
              {partyNoticeDraft.group} · 2026-09-15 10:42 · 通知已送达群成员
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', paddingLeft: '30px' }}>
            <button className="btn btn-primary" onClick={handlePublish}>发布通知</button>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', alignSelf: 'center' }}>写操作 · 将触发确认留痕</span>
          </div>
        )}
      </div>
    </div>
  )
}
