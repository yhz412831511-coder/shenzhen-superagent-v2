import { sdkApps, mcpTools } from '../../data/fixtures'

const bidirectionalIntegration = [
  { direction: '向外开放', role: '外部系统通过 SDK 接入 SuperAgent 能力', result: '统一任务 / 会话 / 工具 / Memory API，支持 Java / TypeScript / Python 多语言 SDK' },
  { direction: '向内兼容', role: 'SuperAgent 通过 SDK 对接外部业务系统', result: '双向身份继承、权限审批、操作审计，MCP 工具统一管控' },
]

const sdkCapabilities = [
  { name: '任务执行', desc: '创建、查询、追踪、写回任务', icon: '▶' },
  { name: '会话控制', desc: '管理会话、上下文窗口和中断恢复', icon: '◐' },
  { name: '流式事件', desc: 'SSE / WebSocket 实时事件推送', icon: '≡' },
  { name: '工具与 MCP', desc: '调用 MCP 工具、继承原系统权限', icon: '⚙' },
  { name: 'AI Memory', desc: '读写六类记忆，引用须留痕', icon: '◇' },
  { name: '权限与审批', desc: '写操作审批、数据脱敏、留痕', icon: '⊘' },
  { name: '观测与用量', desc: '调用日志、Token 计量、告警', icon: '▣' },
  { name: '统一对象模型', desc: '事项 / 会议 / 决议统一编号关联', icon: '⬡' },
]

const accessLevels = [
  { level: 'A', current: '标准 API / 数据库可用', method: 'MCP 直接封装，继承身份和权限', suggestion: '首期优先接入', badge: 'ad-badge-green' },
  { level: 'B', current: '仅有数据库无标准 API', method: '建只读视图 + MCP 封装', suggestion: '首期只读查询', badge: 'ad-badge-cyan' },
  { level: 'C', current: '仅有页面 / 文件接口', method: 'MCP + RPA 适配', suggestion: '首期限定场景只读', badge: 'ad-badge-amber' },
  { level: 'D', current: '系统封闭无任何接口', method: '暂不 MCP 化', suggestion: '待系统升级后评估', badge: 'ad-badge-muted' },
  { level: 'E', current: '系统已退役 / 迁移中', method: '数据归档 MCP', suggestion: '首期只读归档查询', badge: 'ad-badge-red' },
]

const levelTone: Record<string, string> = {
  A: 'ad-badge-green',
  B: 'ad-badge-cyan',
  C: 'ad-badge-amber',
  D: 'ad-badge-muted',
  E: 'ad-badge-red',
}

function envBadge(env: string) {
  if (env === '生产') return <span className="ad-badge ad-badge-green">生产</span>
  if (env === '试运行') return <span className="ad-badge ad-badge-amber">试运行</span>
  return <span className="ad-badge ad-badge-muted">{env}</span>
}

function statusBadge(status: string) {
  if (status === '活跃') return <span className="ad-badge ad-badge-green">活跃</span>
  if (status === '试运行') return <span className="ad-badge ad-badge-amber">试运行</span>
  return <span className="ad-badge ad-badge-muted">{status}</span>
}

export default function SDKAccess() {
  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">SDK 与系统接入</div>
          <div className="ad-header-sub">SDK 开放平台 · 双向集成 · 老旧系统 MCP 化</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · {sdkApps.length} 个接入应用</span>
        </div>
      </div>

      {/* 区块一：SDK 开放平台 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          SDK 开放平台
          <span className="sub">向外开放统一 API · 向内兼容业务系统</span>
        </div>

        <div className="ad-grid-2 mb-4">
          {bidirectionalIntegration.map((b) => (
            <div key={b.direction} style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 212, 255, 0.04)',
              border: '1px solid var(--ad-border-soft)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span className="ad-badge ad-badge-cyan">{b.direction}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{b.role}</span>
              </div>
              <div className="ad-sb-note">{b.result}</div>
            </div>
          ))}
        </div>

        <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
          {sdkCapabilities.map((c) => (
            <div key={c.name} style={{
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(17, 27, 48, 0.6)',
              border: '1px solid var(--ad-border-soft)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <span style={{ fontSize: 'var(--text-lg)', color: 'var(--ad-cyan)' }}>{c.icon}</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: '#fff' }}>{c.name}</span>
              </div>
              <div className="ad-sb-note">{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>应用名</th>
                <th>使用单位</th>
                <th style={{ width: '80px' }}>环境</th>
                <th style={{ width: '140px' }}>SDK 版本</th>
                <th style={{ width: '80px' }}>状态</th>
                <th style={{ width: '80px' }}>会话数</th>
                <th style={{ width: '90px' }}>调用次数</th>
              </tr>
            </thead>
            <tbody>
              {sdkApps.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 500 }}>{a.name}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{a.unit}</td>
                  <td>{envBadge(a.env)}</td>
                  <td className="ad-num" style={{ color: 'var(--ad-cyan)' }}>{a.sdk}</td>
                  <td>{statusBadge(a.status)}</td>
                  <td className="ad-num">{a.sessions.toLocaleString()}</td>
                  <td className="ad-num">{a.calls.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 区块二：连接器工厂 */}
      <div className="ad-card mb-4">
        <div className="ad-card-title">
          系统接入 · 连接器工厂
          <span className="sub">老旧系统 MCP 化 · 五种接入等级</span>
        </div>

        <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)' }}>
          {accessLevels.map((l) => (
            <div key={l.level} style={{
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(17, 27, 48, 0.6)',
              border: '1px solid var(--ad-border-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ad-num" style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--ad-cyan)' }}>{l.level}</span>
                <span className={`ad-badge ${l.badge}`}>{l.suggestion}</span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--ad-text)', lineHeight: 1.5 }}>{l.current}</div>
              <div className="ad-sb-note">{l.method}</div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>工具名</th>
                <th>所属系统</th>
                <th style={{ width: '80px' }}>接入等级</th>
                <th style={{ width: '70px' }}>类型</th>
                <th style={{ width: '60px' }}>风险</th>
                <th style={{ width: '80px' }}>状态</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              {mcpTools.map((t) => (
                <tr key={t.name}>
                  <td className="ad-num" style={{ color: 'var(--ad-cyan)' }}>{t.name}</td>
                  <td style={{ color: 'var(--ad-muted)' }}>{t.system}</td>
                  <td><span className={`ad-badge ${levelTone[t.level]}`}>{t.level}</span></td>
                  <td>
                    {t.type === '写入'
                      ? <span className="ad-badge ad-badge-amber">写入</span>
                      : <span className="ad-badge ad-badge-green">只读</span>}
                  </td>
                  <td>
                    {t.risk === '中'
                      ? <span className="ad-badge ad-badge-amber">中</span>
                      : <span className="ad-badge ad-badge-muted">低</span>}
                  </td>
                  <td>
                    {t.status === '已发布'
                      ? <span className="ad-badge ad-badge-green">已发布</span>
                      : <span className="ad-badge ad-badge-amber">试点</span>}
                  </td>
                  <td style={{ color: 'var(--ad-muted)' }}>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="ad-alert">
        <span>⚑</span>
        <span>
          外部 Agent 不能绕过平台直接访问 AI Memory 和业务系统。所有接入经 SDK 统一管控，身份继承、权限审批、操作审计在平台侧执行，写操作支持审批、幂等和回退。
        </span>
      </div>
    </div>
  )
}
