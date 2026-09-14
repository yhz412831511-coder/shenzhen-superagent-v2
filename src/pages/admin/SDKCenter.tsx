import { sdkApps } from '../../data/fixtures'

const bidirectionalIntegration = [
  { direction: '向外开放', role: '外部系统通过SDK接入SuperAgent能力', result: '统一任务/会话/工具/Memory API，支持Java/TypeScript/Python多语言SDK' },
  { direction: '向内兼容', role: 'SuperAgent通过SDK对接外部业务系统', result: '双向身份继承、权限审批、操作审计，MCP工具统一管控' },
]

const sdkCapabilities = [
  { name: '任务执行', desc: '创建、查询、追踪、写回任务', icon: '▶' },
  { name: '会话控制', desc: '管理Agent会话、上下文窗口和中断恢复', icon: '◐' },
  { name: '流式事件', desc: 'SSE/WebSocket实时事件推送和订阅', icon: '≡' },
  { name: '工具与MCP', desc: '调用MCP工具、继承原系统身份权限', icon: '⚙' },
  { name: 'AI Memory', desc: '读写工作/语义/情景/前瞻/组织记忆', icon: '◇' },
  { name: '权限与审批', desc: '写操作审批、数据脱敏、操作留痕', icon: '⊘' },
  { name: '观测与用量', desc: '调用日志、Token计量、异常告警', icon: '▣' },
  { name: '统一对象模型', desc: '事项/会议/决议/任务统一编号和关联', icon: '⬡' },
]

function envBadge(env: string) {
  if (env === '生产') return <span className="badge badge-success">生产</span>
  if (env === '试运行') return <span className="badge badge-warning">试运行</span>
  return <span className="badge badge-muted">{env}</span>
}

function statusBadge(status: string) {
  if (status === '活跃') return <span className="badge badge-success">活跃</span>
  if (status === '试运行') return <span className="badge badge-warning">试运行</span>
  return <span className="badge badge-muted">{status}</span>
}

export default function SDKCenter() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">SuperAgent SDK开放与接入管理<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">SuperAgent SDK开放平台，双向集成，统一任务/会话/工具/Memory接口</div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)', background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>SuperAgent SDK开放平台，双向集成。</strong>
          向外开放统一API供外部系统接入，向内兼容对接各类业务系统，支持Java/TypeScript/Python多语言SDK。
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">双向集成</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '100px' }}>方向</th>
                <th>作用</th>
                <th>核心成果</th>
              </tr>
            </thead>
            <tbody>
              {bidirectionalIntegration.map((b) => (
                <tr key={b.direction}>
                  <td><span className="badge badge-info">{b.direction}</span></td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{b.role}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{b.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">SDK能力矩阵</div>
        <div className="grid grid-4">
          {sdkCapabilities.map((c) => (
            <div key={c.name} style={{ padding: 'var(--space-4)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)' }}>{c.icon}</span>
                <span style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{c.name}</span>
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">接入应用列表</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>应用名</th>
                <th>使用单位</th>
                <th>环境</th>
                <th>SDK版本</th>
                <th>状态</th>
                <th>会话数</th>
                <th>调用次数</th>
              </tr>
            </thead>
            <tbody>
              {sdkApps.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{a.name}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{a.unit}</td>
                  <td>{envBadge(a.env)}</td>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--primary)' }}>{a.sdk}</td>
                  <td>{statusBadge(a.status)}</td>
                  <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>{a.sessions.toLocaleString()}</td>
                  <td style={{ fontSize: 'var(--text-sm)', textAlign: 'center', fontFamily: 'var(--font-code)' }}>{a.calls.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>外部Agent不能绕过平台直接访问AI Memory和业务系统。</strong>
          所有外部接入必须通过SDK统一管控，身份继承、权限审批和操作审计在平台侧执行，确保数据安全和操作可追溯。
        </div>
      </div>
    </div>
  )
}
