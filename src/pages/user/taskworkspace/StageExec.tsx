import { useEffect, useState, type ReactNode } from 'react'
import {
  partyExecBlocks,
  partyExtraSubTask,
  partyTokenUsage,
  partyModelRouting,
  lastPartyMeetingTasks,
  agendaSubmissions,
  supervisionItems,
  type PartyExecStep,
  type PartySubTask,
} from '../../../data/fixtures-party'
import { ExecStep } from '../../../components/chat/ExecStep'
import { StageSummaryRow } from '../../../components/taskflow/StageSummaryRow'
import { CollapsibleSection } from '../../../components/taskflow/CollapsibleSection'
import { AssistantSay } from './AssistantSay'
import type { StageProps } from './stage-props'
import { getStoryState } from '../../../utils/story-state'
import { taskRoutingLine } from '../../../utils/model-routing'

interface ExecBlock {
  subtask: PartySubTask
  steps: PartyExecStep[]
}

const t4Steps: PartyExecStep[] = [
  {
    id: 's-t4',
    node: '读取OA系统，获取各处室本周值班安排',
    system: 'OA系统',
    security: '鉴权通过',
    securityLevel: 'ok',
    result: '6 份值班表',
    toolName: 'OA系统 · doc.search',
    toolParams: '类型 = 处室值班安排 · 周期 = 本周',
    toolResult: '返回 6 个处室值班表',
    authNote: '只读检索，按岗位权限自动继承',
  },
]

const blockResultText: Record<string, string> = {
  'pt-1': '5 项任务：已完成 2 · 进行中 2 · 待验证 1',
  'pt-2': '6 处室：已交 5 · 未交 1（政策法规处）',
  'pt-3': '6 项督办：1 项描述过简',
  'pt-4': '6 份值班表已收录',
}

const statusBadge: Record<string, string> = {
  已完成: 'badge badge-success',
  进行中: 'badge badge-info',
  待验证: 'badge badge-warning',
}

export default function StageExec({ readOnly, onGate }: StageProps) {
  const subtaskAdded = !!getStoryState().subtaskAdded
  const blocks: ExecBlock[] = [
    ...partyExecBlocks,
    ...(subtaskAdded ? [{ subtask: partyExtraSubTask, steps: t4Steps }] : []),
  ]
  const total = blocks.reduce((n, b) => n + b.steps.length, 0)

  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>(readOnly ? 'done' : 'idle')
  const [revealed, setRevealed] = useState(readOnly ? total : 0)

  useEffect(() => {
    if (readOnly || phase !== 'running') return
    if (revealed >= total) {
      setPhase('done')
      return
    }
    const timer = setTimeout(() => setRevealed((n) => n + 1), 900)
    return () => clearTimeout(timer)
  }, [phase, revealed, total, readOnly])

  useEffect(() => {
    if (readOnly) return
    if (phase === 'idle') {
      onGate({
        ready: true,
        label: '开始执行',
        hint: '白盒执行 · 每步工具调用、鉴权与脱敏留痕逐步呈现',
        action: () => setPhase('running'),
      })
    } else if (phase === 'running') {
      onGate({ ready: false, label: `正在执行（${Math.min(revealed, total)}/${total} 步）…` })
    } else {
      onGate({ ready: true, label: '进入产物确认', hint: '交叉验证发现 2 处缺口，需您拍板' })
    }
  }, [phase, revealed, total, readOnly])

  let cursor = 0
  const ranges = blocks.map((b) => {
    const start = cursor
    cursor += b.steps.length
    return { start, end: cursor }
  })

  const tokenTotals = partyTokenUsage.steps.reduce(
    (acc, s) => ({
      input: acc.input + s.input,
      cached: acc.cached + s.cached,
      reasoning: acc.reasoning + s.reasoning,
      output: acc.output + s.output,
      tool: acc.tool + s.tool,
    }),
    { input: 0, cached: 0, reasoning: 0, output: 0, tool: 0 }
  )
  const grandTotal = Object.values(tokenTotals).reduce((a, b) => a + b, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <AssistantSay>
        {phase === 'idle'
          ? '计划已确认。点击下方「开始执行」开始白盒执行——每一步工具调用、鉴权与脱敏留痕都会呈现，可随时展开核查。'
          : phase === 'running'
            ? '正在执行中，当前分项的步骤逐步呈现；已完成的分项收起为摘要，可展开查看留痕。'
            : `${blocks.length} 个分项任务全部执行完成，摘要如下——展开任意分项可查看工具调用、鉴权与返回结果。`}
      </AssistantSay>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {blocks.map((block, i) => {
          const range = ranges[i]
          const visible = Math.max(0, Math.min(revealed - range.start, block.steps.length))
          const status: 'pending' | 'running' | 'done' =
            phase === 'done' || readOnly
              ? 'done'
              : revealed >= range.end
                ? 'done'
                : revealed > range.start
                  ? 'running'
                  : 'pending'
          return (
            <StageSummaryRow
              key={`${block.subtask.id}-${status}`}
              status={status}
              code={block.subtask.code}
              title={block.subtask.title}
              result={status === 'pending' ? undefined : blockResultText[block.subtask.id]}
              meta={block.subtask.sourceSystems.join(' + ')}
              defaultOpen={status === 'running'}
              detailLabel="执行留痕"
            >
              {visible > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {block.steps.slice(0, visible).map((step, idx) => (
                    <ExecStep key={step.id} step={step} status={idx < visible - 1 || status === 'done' ? 'done' : 'running'} />
                  ))}
                  {status === 'done' && <ResultBlock subtaskId={block.subtask.id} />}
                </div>
              ) : undefined}
            </StageSummaryRow>
          )
        })}
      </div>

      {(phase === 'done' || readOnly) && (
        <CollapsibleSection
          summary={
            <>
              <span className="badge badge-muted">按需下钻</span>
              本任务 Token 与模型用量 · 合计 {grandTotal.toLocaleString()} / {partyTokenUsage.budget.toLocaleString()} tokens
              <span className="demo-label">演示样例</span>
            </>
          }
        >
          <div className="grid grid-2" style={{ gap: 'var(--space-4)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { label: '输入 Token', value: tokenTotals.input, color: 'var(--primary)' },
                { label: '缓存 Token', value: tokenTotals.cached, color: 'var(--success)' },
                { label: '推理 Token', value: tokenTotals.reasoning, color: 'var(--warning)' },
                { label: '输出 Token', value: tokenTotals.output, color: 'var(--chart-5)' },
                { label: '工具 Token', value: tokenTotals.tool, color: 'var(--danger)' },
              ].map((r) => {
                const pct = grandTotal > 0 ? (r.value / grandTotal) * 100 : 0
                return (
                  <div key={r.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>{r.label}</span>
                      <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-code)', color: 'var(--foreground)' }}>
                        {r.value.toLocaleString()} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: r.color, borderRadius: '3px' }} />
                    </div>
                  </div>
                )
              })}
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)' }}>
                实际用量占预算 {((grandTotal / partyTokenUsage.budget) * 100).toFixed(0)}% · 缓存与路由调度共节省约 18,000 tokens
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 'var(--space-2)', padding: 'var(--space-1) var(--space-2)', background: 'var(--ui-brand-soft)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 500 }}>
                {taskRoutingLine()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {partyModelRouting.map((m) => (
                  <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ minWidth: '72px', fontWeight: 500, color: 'var(--foreground)' }}>{m.name}</span>
                    <div style={{ flex: 1, height: '6px', background: 'var(--muted)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${m.percentage}%`, height: '100%', background: 'var(--primary)' }} />
                    </div>
                    <span style={{ minWidth: '36px', textAlign: 'right', fontFamily: 'var(--font-code)', color: 'var(--primary)' }}>{m.percentage}%</span>
                    <span style={{ minWidth: '150px', color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>{m.used}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}
    </div>
  )
}

function ResultBlock({ subtaskId }: { subtaskId: string }) {
  if (subtaskId === 'pt-1') return <T1Result />
  if (subtaskId === 'pt-2') return <T2Result />
  if (subtaskId === 'pt-3') return <T3Result />
  if (subtaskId === 'pt-4') return <T4Result />
  return null
}

function ResultPanel({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div style={{ padding: 'var(--space-4)', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{title}</div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: '2px', marginBottom: 'var(--space-3)' }}>{hint}</p>
      {children}
    </div>
  )
}

function T1Result() {
  return (
    <ResultPanel title="上次党组会（第12次 · 09-04）任务核查结果" hint="5 项任务：已完成 2 · 进行中 2 · 待验证 1 · 来源：会议系统 + 任务跟踪系统">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {lastPartyMeetingTasks.map((t) => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', flexWrap: 'wrap' }}>
            <span className={statusBadge[t.status]}>{t.status}</span>
            <span style={{ fontWeight: 500, color: 'var(--foreground)' }}>{t.title}</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>{t.owner} · {t.detail}</span>
          </div>
        ))}
      </div>
    </ResultPanel>
  )
}

function T2Result() {
  return (
    <ResultPanel title="处室议题提交情况" hint="6 个处室：已交 5 · 未交 1 · 来源：OA系统">
      <div className="grid grid-2">
        {agendaSubmissions.map((a) => (
          <div key={a.office} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <span className={a.submitted ? 'badge badge-success' : 'badge badge-danger'}>{a.submitted ? '已交' : '未交'}</span>
            <span style={{ fontWeight: 500, color: 'var(--foreground)' }}>{a.office}</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>{a.title} · {a.date}</span>
          </div>
        ))}
      </div>
    </ResultPanel>
  )
}

function T3Result() {
  return (
    <ResultPanel title="近期重要督办任务执行情况" hint="6 项重要督办任务 · 来源：督办系统">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {supervisionItems.map((s) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', flexWrap: 'wrap' }}>
            <span className={s.status === '已完成' ? 'badge badge-success' : 'badge badge-info'}>{s.progress}</span>
            <span style={{ fontWeight: 500, color: 'var(--foreground)' }}>{s.title}</span>
            <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-xs)' }}>{s.owner}</span>
            {s.brief && (
              <span className="badge badge-warning" title="该条目进度描述过于简略">描述过简</span>
            )}
          </div>
        ))}
      </div>
    </ResultPanel>
  )
}

function T4Result() {
  return (
    <ResultPanel title="处室值班安排汇总" hint="已生成值班安排汇总表，纳入会前材料附件">
      <div className="grid grid-3">
        {['数据资源处', '数字基础设施处', '政务服务处', '网络安全处', '规划财务处', '政策法规处'].map((o) => (
          <span key={o} style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>● {o} · 本周值班表已收录</span>
        ))}
      </div>
    </ResultPanel>
  )
}
