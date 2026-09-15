import { useState } from 'react'
import { settingsGroups } from '../../data/fixtures-admin'

export default function Settings() {
  const [activeMap, setActiveMap] = useState<Record<string, string>>(
    Object.fromEntries(settingsGroups.map((g) => [g.title, g.active]))
  )
  const [switchMap, setSwitchMap] = useState<Record<string, boolean>>(
    Object.fromEntries(
      settingsGroups.flatMap((g) => (g.switches || []).map((s) => [`${g.title}::${s.label}`, s.on]))
    )
  )

  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">平台设置</div>
          <div className="ad-header-sub">默认策略与平台标识 · 演示样例，配置即时生效仅作用于本次会话展示</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />测试环境 · 合成数据</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {settingsGroups.map((g) => (
          <div className="ad-card" key={g.title}>
            <div className="ad-card-title">
              {g.title}
              <span className="sub">{g.desc}</span>
            </div>
            {g.options.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: g.switches ? 'var(--space-4)' : 0 }}>
                {g.options.map((opt) => (
                  <button
                    key={opt}
                    className={`ad-opt ${activeMap[g.title] === opt ? 'active' : ''}`}
                    onClick={() => setActiveMap({ ...activeMap, [g.title]: opt })}
                  >
                    {opt}
                    {activeMap[g.title] === opt && <span style={{ marginLeft: 6 }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
            {g.switches && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {g.switches.map((s) => {
                  const key = `${g.title}::${s.label}`
                  const on = switchMap[key]
                  return (
                    <div
                      key={key}
                      className={`ad-switch ${on ? 'on' : ''}`}
                      onClick={() => setSwitchMap({ ...switchMap, [key]: !on })}
                    >
                      <span className="track"><i /></span>
                      <span className="lbl">{s.label}</span>
                      <span className="ad-sb-note" style={{ marginLeft: 'var(--space-2)' }}>{on ? '已开启' : '已关闭'}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="ad-card mt-4" style={{ background: 'rgba(0,212,255,0.04)' }}>
        <div className="ad-sb-note">
          演示样例说明：所有设置项均为演示态，点击即时反馈但不影响真实环境。「逐项确认」为平台默认权限档位；外网隔离与异常自动隔离默认开启，与沙箱策略页一致。
        </div>
      </div>
    </div>
  )
}
