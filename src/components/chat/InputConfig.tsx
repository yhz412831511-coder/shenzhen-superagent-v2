import { useEffect, useRef, useState } from 'react'
import {
  capabilityLevels,
  modelCatalog,
  partyPermissionLevels,
  partyTaskLaunch,
} from '../../data/fixtures-party'

interface InputConfigProps {
  modelChoice: string
  onModelChange: (v: string) => void
  permission: string
  onPermissionChange: (v: string) => void
}

function useOutsideClose(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])
  return ref
}

function ConfigButton({
  label,
  value,
  open,
  onClick,
}: {
  label: string
  value: string
  open: boolean
  onClick: () => void
}) {
  return (
    <button className={`cfg-btn ${open ? 'open' : ''}`} onClick={onClick}>
      <span className="cfg-btn-label">{label}</span>
      <span className="cfg-btn-value">{value}</span>
      <span className="cfg-btn-caret">▼</span>
    </button>
  )
}

function ModelPanel({ choice, onChoose }: { choice: string; onChoose: (v: string) => void }) {
  return (
    <div className="cfg-panel">
      <div className="cfg-panel-title">模型选择</div>
      <div className="cfg-panel-sub">
        任务级路由：发起时选择，执行回放可见。按步骤复杂度调度，而不是给整个任务永久贴一个等级。
      </div>

      <div className={`cfg-smart-card cfg-selectable ${choice === 'auto' ? 'active' : ''}`} onClick={() => onChoose('auto')}>
        <span className="cfg-radio" style={{ marginTop: 3 }} />
        <div>
          <div className="cfg-smart-head">
            <span className="cfg-smart-name">智能模式</span>
            <span className="cfg-rec-badge">推荐</span>
          </div>
          <div className="cfg-smart-desc">按步骤复杂度自动调度，每级含主力模型与备用模型，质量不足自动升级</div>
        </div>
      </div>

      <div className="cfg-levels">
        {capabilityLevels.map((l) => (
          <div className="cfg-level" key={l.level}>
            <span className="cfg-level-badge">{l.level}</span>
            <div>
              <div className="cfg-level-name">{l.name}</div>
              <div className="cfg-level-desc">{l.desc}</div>
              <div className="cfg-level-models">
                {l.primary === '—' ? '不调用模型' : `主力 ${l.primary} · 备用 ${l.backup}`}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" style={{ margin: 'var(--space-3) 0' }} />

      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--foreground)' }}>
        或选择固定模型
      </div>
      <div className="cfg-catalog">
        {modelCatalog.map((m) => (
          <div
            key={m.id}
            className={`cfg-model-item cfg-selectable ${choice === m.id ? 'active' : ''}`}
            onClick={() => onChoose(m.id)}
          >
            <span className="cfg-radio" />
            <div>
              <div className="cfg-model-name">{m.name}</div>
              <div className="cfg-model-meta">
                {m.vendor} · {m.capability} · {m.category}
              </div>
            </div>
            <span className="cfg-model-tier">{m.tier}</span>
          </div>
        ))}
      </div>

      <div className="cfg-note">
        固定模型后，生成步骤不会静默切换模型；失败或质量不足将暂停并询问，不会静默切换。
      </div>
    </div>
  )
}

function PermissionPanel({
  permission,
  onChoose,
}: {
  permission: string
  onChoose: (v: string) => void
}) {
  return (
    <div className="cfg-panel">
      <div className="cfg-panel-title">权限管理</div>
      <div className="cfg-panel-sub">安全管控：档位决定本次任务中系统访问与写操作的处理方式。</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {partyPermissionLevels.map((p) => (
          <div
            key={p.key}
            className={`cfg-perm-row cfg-selectable ${permission === p.key ? 'active' : ''}`}
            onClick={() => onChoose(p.key)}
          >
            <span className="cfg-radio" style={{ marginTop: 3 }} />
            <div>
              <div className="cfg-perm-name">
                {p.label}
                {p.key === 'confirm' && (
                  <span className="cfg-rec-badge" style={{ marginLeft: 'var(--space-2)' }}>默认</span>
                )}
              </div>
              <div className="cfg-perm-desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cfg-sys-title">本任务可访问系统（预览）</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {partyTaskLaunch.systems.map((s) => (
          <div className="cfg-sys-item" key={s.name}>
            <span className="badge badge-muted">{s.mode}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>

      <div className="cfg-note">
        不扩大来源系统原有权限 · 敏感字段自动脱敏 · 完全访问下，对外发送、正式提交和删除仍单独确认
      </div>
    </div>
  )
}

export function InputConfig({
  modelChoice,
  onModelChange,
  permission,
  onPermissionChange,
}: InputConfigProps) {
  const [open, setOpen] = useState<'model' | 'permission' | null>(null)

  const modelRef = useOutsideClose(() => setOpen((o) => (o === 'model' ? null : o)))
  const permRef = useOutsideClose(() => setOpen((o) => (o === 'permission' ? null : o)))

  const modelName =
    modelChoice === 'auto' ? '推荐' : modelCatalog.find((m) => m.id === modelChoice)?.name || '推荐'
  const permName = partyPermissionLevels.find((p) => p.key === permission)?.label || '逐项确认'

  return (
    <div className="cfg-row">
      <div className="cfg-wrap" ref={modelRef}>
        <ConfigButton
          label="智能模式"
          value={modelName}
          open={open === 'model'}
          onClick={() => setOpen((o) => (o === 'model' ? null : 'model'))}
        />
        {open === 'model' && <ModelPanel choice={modelChoice} onChoose={onModelChange} />}
      </div>
      <div className="cfg-wrap" ref={permRef}>
        <ConfigButton
          label="权限管理"
          value={permName}
          open={open === 'permission'}
          onClick={() => setOpen((o) => (o === 'permission' ? null : 'permission'))}
        />
        {open === 'permission' && (
          <PermissionPanel permission={permission} onChoose={onPermissionChange} />
        )}
      </div>
    </div>
  )
}
