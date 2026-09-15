import { useMemo, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  partyPresetCategories,
  partyOpeningPrompt,
  partyContextChips,
  partyTodos,
  partyDoneMatters,
  partyRecentUsedMemories,
  partyRecentLearnedMemories,
  partyTaskId,
} from '../../data/fixtures-party'
import { ChatFlow } from '../../components/chat/ChatFlow'
import { InputConfig } from '../../components/chat/InputConfig'
import type { ScriptMessage } from '../../components/chat/useChatScript'
import { partyTaskFlow } from '../../config/task-flows'
import { getStoryState, resetStoryState, setStoryState } from '../../utils/story-state'

const heroSteps = [
  { label: '识别新建或续办' },
  { label: '连通授权记忆与系统' },
  { label: '沟通人机协商确认' },
  { label: '全过程可追踪' },
]

const quickCards = [
  { icon: '📅', title: '准备会议', sub: '党组会 / 办公会 · 会前材料', prompt: partyOpeningPrompt, bg: 'rgba(31, 94, 255, 0.10)', color: 'var(--primary)' },
  { icon: '🗎', title: '处理来文', sub: '上级来文 · 转办与拟复', prompt: '帮我办理市政府办转来的这份专项督查来文', bg: 'rgba(0, 169, 114, 0.10)', color: 'var(--success)' },
  { icon: '⧉', title: '发起督办', sub: '任务分解 · 跟踪与催办', prompt: '帮我跟进近期重点督办任务的执行情况', bg: 'rgba(255, 140, 0, 0.10)', color: 'var(--warning)' },
  { icon: '⚙', title: '专业核验', sub: '口径一致性 · 交叉验证', prompt: '帮我核验这份报告里各处数据的口径一致性', bg: 'rgba(139, 92, 246, 0.10)', color: '#8b5cf6' },
]

const prioColors: Record<string, string> = {
  danger: 'var(--danger)',
  warning: 'var(--warning)',
  info: 'var(--primary)',
  muted: 'var(--muted-foreground)',
}

export default function Workbench() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [story, setStory] = useState(() => getStoryState())

  const [input, setInput] = useState(partyOpeningPrompt)
  const [sentText, setSentText] = useState('')
  const [sent, setSent] = useState(false)
  const [modelChoice, setModelChoice] = useState(() => getStoryState().modelChoice || 'auto')
  const [permission, setPermission] = useState('confirm')
  const [chips, setChips] = useState(partyContextChips)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const [chosenAction, setChosenAction] = useState<string>()

  const script: ScriptMessage[] = useMemo(
    () => [
      { id: 'm1', role: 'user', text: sentText },
      {
        id: 'm2',
        role: 'assistant',
        text: '已识别任务类型：办会 · 会前准备。\n关联事项：局党组第13次会议（2026-09-18 周五 09:00 · 局机关三楼党组会议室）。',
      },
      {
        id: 'm3',
        role: 'assistant',
        text: '根据过往经验（第11/12次党组会会前准备），此类任务通常包含 3 个分项：\n① 上次党组会任务及处理情况核查\n② 本次会议各处室议题征集\n③ 近期重要督办任务执行情况汇报',
      },
      {
        id: 'm4',
        role: 'assistant',
        text: '我已生成任务计划，包含 3 个分项任务、需访问的系统范围与写入动作。已为您打开任务工作区，请在专属页面中确认并推进。',
        actions: [{ id: 'enter-task', label: '进入任务工作区', primary: true }],
      },
    ],
    [sentText]
  )

  const handleSend = () => {
    if (!input.trim() || sent) return
    setSentText(input.trim())
    setSent(true)
    setStoryState({ modelChoice })
  }

  const handleAction = (id: string) => {
    setChosenAction(id)
    if (id === 'enter-task') {
      setStoryState({ stage: 1 })
      navigate(`/task/${partyTaskId}`)
    }
  }

  const handleReset = () => {
    resetStoryState()
    setStory({})
    setSent(false)
    setSentText('')
    setInput(partyOpeningPrompt)
    setModelChoice('auto')
    setPermission('confirm')
    setChips(partyContextChips)
    setExpandedCat(null)
    setChosenAction(undefined)
  }

  const handleQuickCard = (prompt: string) => {
    setInput(prompt)
    setSent(false)
    inputRef.current?.focus()
  }

  const inProgress = (sent || story.stage != null) && !story.storyFinished
  const activeStageIndex = story.stage != null ? Math.max(1, story.stage) : 1
  const activeStage = partyTaskFlow.stages[activeStageIndex]
  const progressPct = Math.round(((activeStageIndex + 1) / partyTaskFlow.stages.length) * 100)

  const stepDone = [
    sent || story.stage != null,
    story.stage != null,
    story.storyFinished || (story.stage != null && story.stage >= 4),
    story.storyFinished,
  ]
  const activeStep = stepDone.findIndex((d) => !d)

  const todos = story.storyFinished
    ? [
        { id: 'todo-new', type: '会议', typeBadge: 'danger' as const, title: '向会议纪要系统提交本次党组会纪要', due: '09-19', action: '' },
        ...partyTodos.slice(0, 3),
      ]
    : partyTodos

  const learnedMemories = story.storyFinished
    ? [
        { id: 'mrl-new', type: '程序记忆', title: '关键信息必须多系统交叉验证（用户口述）', time: '09-15' },
        ...partyRecentLearnedMemories,
      ]
    : partyRecentLearnedMemories

  return (
    <div>
      {/* ① Hero 区 */}
      <div className="hero">
        <div>
          <div className="hero-kicker">
            <span>你的政务工作智能体</span>
            <span className="sep">·</span>
            <span>2026年9月15日 · 政数局办公室 · 陈静</span>
          </div>
          <h1 className="hero-title">今天想推进什么工作？</h1>
          <p className="hero-sub">
            直接说目标，SuperAgent 会找回相关会议、规则、承诺和历史办理，再为你生成
            <b>可确认的执行计划</b>。
          </p>
        </div>
        <button className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)', flexShrink: 0 }} onClick={handleReset}>
          重新演示
        </button>
      </div>

      {story.storyFinished && (
        <div className="card mb-4" style={{ borderTop: '3px solid var(--success)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="badge badge-success">任务完成</span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--foreground)' }}>
            局党组第13次会议会前准备已完成：3 份会前材料就绪，会议通知已发布（模拟）。新学习的记忆与纪要待办已同步至下方。
          </span>
        </div>
      )}

      {/* ② 输入卡 */}
      <div className="card hero-card mb-4">
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            rows={2}
            disabled={sent}
            placeholder="描述你要办理的事项，例如：帮我准备下一次局内党组会的准备工作"
            style={{
              flex: 1,
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-lg)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              color: 'var(--foreground)',
              background: 'var(--card)',
              resize: 'none',
              lineHeight: 1.6,
            }}
          />
          <button className="btn btn-primary" style={{ padding: 'var(--space-3) var(--space-5)' }} onClick={handleSend} disabled={sent}>
            开始工作 →
          </button>
        </div>

        <div className="hero-tags">
          <button className="hero-tag" title="演示样例"><i>+</i> 上传材料</button>
          <button className="hero-tag" title="演示样例"><i>+</i> 关联已有事项</button>
          <button className="hero-tag" title="演示样例">选择记忆范围</button>
          <button className="hero-tag" title="演示样例">选择输出形式</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
          <InputConfig
            modelChoice={modelChoice}
            onModelChange={(v) => {
              setModelChoice(v)
              setStoryState({ modelChoice: v })
            }}
            permission={permission}
            onPermissionChange={setPermission}
          />
          <span style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {chips.map((chip) => (
              <span key={chip.id} className="context-chip">
                {chip.label}
                <button
                  className="context-chip-x"
                  onClick={() => setChips(chips.filter((c) => c.id !== chip.id))}
                  title="移除"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {partyPresetCategories.map((cat) => (
            <button
              key={cat.key}
              className="btn btn-secondary"
              style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }}
              onClick={() => setExpandedCat(expandedCat === cat.key ? null : cat.key)}
            >
              <span style={{ marginRight: 'var(--space-1)' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
        {expandedCat && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
            {partyPresetCategories
              .find((c) => c.key === expandedCat)
              ?.scenarios.map((sc) => (
                <button
                  key={sc.label}
                  className="scenario-chip"
                  onClick={() => {
                    setInput(sc.prompt)
                    setSent(false)
                  }}
                >
                  {sc.label}
                </button>
              ))}
          </div>
        )}

        {sent && (
          <>
            <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
            <ChatFlow script={script} autoStart onAction={handleAction} chosenId={chosenAction} maxHeight={280} />
          </>
        )}
      </div>

      {/* ③ 四步流程指示器 */}
      <div className="steps-flow">
        {heroSteps.map((s, i) => (
          <div key={s.label} className={`step-item ${stepDone[i] ? 'done' : ''} ${activeStep === i ? 'active' : ''}`}>
            <span className="step-dot">{stepDone[i] ? '✓' : i + 1}</span>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ④ 快捷功能卡 */}
      <div className="quick-grid">
        {quickCards.map((c) => (
          <button key={c.title} className="quick-card" onClick={() => handleQuickCard(c.prompt)}>
            <span className="quick-card-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</span>
            <span>
              <span className="quick-card-title">{c.title}</span>
              <div className="quick-card-sub">{c.sub}</div>
            </span>
          </button>
        ))}
      </div>

      {/* ⑤ 双栏：继续最近的工作 / 需要你处理 */}
      <div className="grid grid-2 mb-4" style={{ alignItems: 'start' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>继续最近的工作</h2>
            {inProgress && <span className="badge badge-info">进行中</span>}
            <span style={{ flex: 1 }} />
            <Link to="/matters" className="card-head-link">全部事项 →</Link>
          </div>
          <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
          {inProgress ? (
            <div style={{ padding: 'var(--space-3)', border: '1px solid rgba(111, 150, 255, 0.5)', borderRadius: 'var(--radius-md)', background: 'var(--ui-brand-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{partyTaskFlow.title}</span>
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-code)', color: 'var(--muted-foreground)' }}>{partyTaskFlow.taskId}</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 'var(--space-2) 0' }}>
                当前环节：<b style={{ color: 'var(--primary)' }}>{activeStage.label}</b>（第 {activeStageIndex + 1} 步 / 共 {partyTaskFlow.stages.length} 步）
              </div>
              <div className="work-progress"><i style={{ width: `${progressPct}%` }} /></div>
              <button
                className="btn btn-primary"
                style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)', width: '100%' }}
                onClick={() => navigate(activeStage.path(partyTaskFlow.taskId))}
              >
                回到任务
              </button>
            </div>
          ) : story.storyFinished ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--success)', borderRadius: 'var(--radius-md)', background: 'var(--success-soft)' }}>
              <span className="exec-check">✓</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--foreground)' }}>{partyTaskFlow.title}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>已完成 · 3 份材料 + 1 份通知 · 4 条新记忆</div>
              </div>
              <span className="badge badge-success">已闭环</span>
            </div>
          ) : (
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6, padding: 'var(--space-2) 0' }}>
              暂无进行中的任务。在上方输入目标，或点击快捷卡开始。
            </div>
          )}
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
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--foreground)' }}>{m.title}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>关联材料：{m.material}</span>
                </div>
                <span style={{ color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{m.completedAt} 完成</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <h2 className="card-title" style={{ marginBottom: 0 }}>需要你处理</h2>
            <span className="badge badge-warning">{todos.length} 条 · 含待确认</span>
            <span style={{ flex: 1 }} />
            <Link to="/todos" className="card-head-link">全部待确认 →</Link>
          </div>
          <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {todos.map((todo) => (
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
                <span className="prio-dot" style={{ background: prioColors[todo.typeBadge] || 'var(--muted-foreground)' }} />
                <span className={`badge badge-${todo.typeBadge}`}>{todo.type}</span>
                <span style={{ flex: 1, color: 'var(--foreground)' }}>{todo.title}</span>
                <span style={{ color: todo.due.includes('今日') ? 'var(--danger)' : 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                  {todo.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⑥ 记忆区域 */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <h2 className="card-title" style={{ marginBottom: 0 }}>工作记忆</h2>
          <span className="badge badge-muted">内容可查 · 来源可追溯</span>
        </div>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div className="grid grid-2">
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-2)' }}>
              最近使用的记忆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {partyRecentUsedMemories.map((m) => (
                <MemoryRow key={m.id} mem={m} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--muted-foreground)', marginBottom: 'var(--space-2)' }}>
              最近新学的记忆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {learnedMemories.length === 0 ? (
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>暂无新记忆</span>
              ) : (
                learnedMemories.map((m) => <MemoryRow key={m.id} mem={m} highlight />)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ⑦ AI Memory 常驻状态条 */}
      <div className="memory-strip">
        <span className="ms-badge"><i />AI Memory</span>
        <span>正在持续观察你的工作：识别重点待办、整理做了什么、下一步该做什么。</span>
        <span style={{ flex: 1 }} />
        <Link to="/memory" className="card-head-link">查看记忆中心 →</Link>
      </div>
    </div>
  )
}

function MemoryRow({ mem, highlight }: { mem: { id: string; type: string; title: string; time: string }; highlight?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-3)',
        border: `1px solid ${highlight ? 'var(--success)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        background: highlight ? 'var(--success-soft)' : 'var(--card)',
        fontSize: 'var(--text-sm)',
      }}
    >
      <span className="badge badge-info">{mem.type}</span>
      <span style={{ flex: 1, color: 'var(--foreground)', lineHeight: 1.5 }}>{mem.title}</span>
      <span style={{ color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{mem.time}</span>
    </div>
  )
}
