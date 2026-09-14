import { mcpTools } from '../../data/fixtures'

const accessLevels = [
  { level: 'A', current: '标准API/数据库可用', method: 'MCP直接封装，继承身份和权限', suggestion: '首期优先接入', badge: 'badge-success' },
  { level: 'B', current: '仅有数据库无标准API', method: '建只读视图+MCP封装', suggestion: '首期只读查询', badge: 'badge-info' },
  { level: 'C', current: '仅有页面/文件接口', method: 'MCP+RPA适配', suggestion: '首期限定场景只读', badge: 'badge-warning' },
  { level: 'D', current: '系统封闭无任何接口', method: '暂不MCP化', suggestion: '待系统升级后评估', badge: 'badge-muted' },
  { level: 'E', current: '系统已退役/迁移中', method: '数据归档MCP', suggestion: '首期只读归档查询', badge: 'badge-danger' },
]

function levelBadge(level: string) {
  const map: Record<string, string> = {
    A: 'badge-success',
    B: 'badge-info',
    C: 'badge-warning',
    D: 'badge-muted',
    E: 'badge-danger',
  }
  return <span className={`badge ${map[level] || 'badge-muted'}`}>{level}</span>
}

function typeBadge(type: string) {
  if (type === '写入') return <span className="badge badge-warning">写入</span>
  return <span className="badge badge-success">只读</span>
}

function riskBadge(risk: string) {
  if (risk === '中') return <span className="badge badge-warning">中</span>
  return <span className="badge badge-success">低</span>
}

function statusBadge(status: string) {
  if (status === '试点') return <span className="badge badge-warning">试点</span>
  if (status === '已发布') return <span className="badge badge-success">已发布</span>
  return <span className="badge badge-muted">{status}</span>
}

export default function ConnectorFactory() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">政务连接器工厂与MCP工具<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">老旧系统MCP化，五种接入等级，继承原系统身份和权限</div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)', background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>老旧系统MCP化，五种接入等级。</strong>
          针对不同老旧系统的现状，采用A到E五种接入等级，从直接API封装到数据归档，逐步将老系统能力MCP化。每个MCP工具继承原系统的身份和权限，写操作支持审批、幂等和回退。
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">五种接入等级</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>等级</th>
                <th>老系统现状</th>
                <th>MCP化方式</th>
                <th>首期建议</th>
              </tr>
            </thead>
            <tbody>
              {accessLevels.map((l) => (
                <tr key={l.level}>
                  <td>{levelBadge(l.level)}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{l.current}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{l.method}</td>
                  <td>
                    <span className={`badge ${l.badge}`}>{l.suggestion}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
        <div className="card-title">MCP工具列表</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>工具名</th>
                <th>所属系统</th>
                <th>接入等级</th>
                <th>类型</th>
                <th>风险</th>
                <th>状态</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              {mcpTools.map((t) => (
                <tr key={t.name}>
                  <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)', color: 'var(--primary)' }}>{t.name}</td>
                  <td style={{ fontSize: 'var(--text-sm)' }}>{t.system}</td>
                  <td>{levelBadge(t.level)}</td>
                  <td>{typeBadge(t.type)}</td>
                  <td>{riskBadge(t.risk)}</td>
                  <td>{statusBadge(t.status)}</td>
                  <td style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>老系统MCP工具继承原系统身份和权限，写操作支持审批、幂等和回退。</strong>
          每个MCP工具在调用时携带原系统的身份凭证，只读工具直接查询，写操作工具需经过人工审批后方可执行，并支持幂等重试和操作回退。
        </div>
      </div>
    </div>
  )
}
