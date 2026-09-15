import { useState } from 'react'
import { automations } from '../../data/fixtures-nav'

interface LocalAutomation {
  id: string
  name: string
  schedule: string
  action: string
  lastRun: string
  enabled: boolean
  story?: boolean
  isNew?: boolean
}

export default function Automation() {
  const [items, setItems] = useState<LocalAutomation[]>(automations)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [schedule, setSchedule] = useState('每周一 08:00')
  const [action, setAction] = useState('')

  const toggle = (id: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)))
  }

  const handleCreate = () => {
    if (!name.trim()) return
    setItems((prev) => [
      {
        id: `au-new-${prev.length}`,
        name: name.trim(),
        schedule,
        action: action.trim() || '按配置执行',
        lastRun: '尚未运行',
        enabled: true,
        isNew: true,
      },
      ...prev,
    ])
    setName('')
    setAction('')
    setShowForm(false)
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div>
          <h1 className="page-title">自动化</h1>
          <p className="page-subtitle">定时任务配置 · {items.length} 个 · 演示样例</p>
        </div>
        <button className="btn btn-primary" style={{ fontSize: 'var(--text-sm)' }} onClick={() => setShowForm((s) => !s)}>
          新建自动化
        </button>
      </div>

      {showForm && (
        <div className="card mb-4" style={{ border: '1px dashed var(--primary)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>新建定时任务（演示态 · 提交后加入列表）</span>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="任务名称，如：季度数据质量检查"
                style={{
                  flex: 2,
                  minWidth: '200px',
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--input)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: 'var(--text-md)',
                  color: 'var(--foreground)',
                  background: 'var(--card)',
                }}
              />
              <select
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '160px',
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--input)',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: 'var(--text-md)',
                  color: 'var(--foreground)',
                  background: 'var(--card)',
                }}
              >
                <option>每周一 08:00</option>
                <option>每日 17:30</option>
                <option>每月 1 日 09:00</option>
                <option>每月 15 日 10:00</option>
              </select>
            </div>
            <input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="执行动作，如：汇总本季度数据质量情况并生成报告"
              style={{
                padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--input)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                fontSize: 'var(--text-md)',
                color: 'var(--foreground)',
                background: 'var(--card)',
              }}
            />
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button className="btn btn-primary" onClick={handleCreate} disabled={!name.trim()}>
                创建
              </button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {items.map((a) => (
          <div key={a.id} className="card" style={{ border: a.isNew ? '1px dashed var(--primary)' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <span className="tag">{a.schedule}</span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--foreground)' }}>{a.name}</span>
              {a.story && <span className="badge badge-info">演示：本任务由此自动化触发亦可</span>}
              {a.isNew && <span className="badge badge-success">新建</span>}
              <span style={{ flex: 1 }} />
              <span className={`badge ${a.enabled ? 'badge-success' : 'badge-muted'}`}>{a.enabled ? '已启用' : '已停用'}</span>
              <button
                onClick={() => toggle(a.id)}
                title={a.enabled ? '停用' : '启用'}
                style={{
                  width: '40px',
                  height: '22px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  background: a.enabled ? 'var(--primary)' : 'var(--input)',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: a.enabled ? '20px' : '2px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.2s',
                    display: 'block',
                  }}
                />
              </button>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)', lineHeight: 1.6 }}>
              {a.action}
            </p>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>最近运行：{a.lastRun}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
