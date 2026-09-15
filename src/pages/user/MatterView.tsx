import { useNavigate, useParams } from 'react-router-dom'
import { matterList } from '../../data/fixtures-nav'
import { partyTaskId } from '../../data/fixtures-party'

export default function MatterView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const matter = matterList.find((m) => m.id === id)

  if (!matter) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>未找到该事项</p>
        <button className="btn btn-secondary" style={{ marginTop: 'var(--space-3)' }} onClick={() => navigate('/matters')}>
          返回事项中心
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <button className="btn btn-ghost" style={{ marginBottom: 'var(--space-2)', padding: 'var(--space-1) var(--space-2)' }} onClick={() => navigate('/matters')}>
          ← 返回事项中心
        </button>
        <h1 className="page-title">{matter.title}</h1>
        <p className="page-subtitle">
          {matter.category} · {matter.level} · {matter.completedAt} 完成 · 演示样例
        </p>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">事项基本信息</h2>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <InfoRow label="事项描述" value={matter.desc} />
          <InfoRow label="完成时间" value={`2026-${matter.completedAt}`} />
          <InfoRow label="经办人" value="陈静 · 政数局办公室 · 综合科" />
          <InfoRow label="关联材料" value={matter.materials.join('、')} />
        </div>
      </div>

      <div className="card mb-4">
        <h2 className="card-title">产出物</h2>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {matter.outputs.map((o) => (
            <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              <span className="exec-check">✓</span>
              <span style={{ color: 'var(--foreground)' }}>{o}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">下探入口</h2>
        <div className="divider" style={{ margin: 'var(--space-3) 0' }} />
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            disabled={!matter.hasReplay}
            title={matter.hasReplay ? undefined : '该事项无任务回放'}
            onClick={() => navigate(`/task/${partyTaskId}?replay=1`)}
          >
            进入任务回放
          </button>
          <button
            className="btn btn-secondary"
            disabled={!matter.hasReplay}
            onClick={() => navigate(`/ai-execution/${partyTaskId}`)}
          >
            查看 AI 执行说明
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/memory')}>
            查看记忆沉淀
          </button>
        </div>
        {!matter.hasReplay && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginTop: 'var(--space-2)' }}>
            该事项为演示样例数据，未配置任务回放；演示任务（局党组第13次会议会前准备）含完整回放。
          </p>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
      <span style={{ color: 'var(--muted-foreground)', minWidth: '72px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'var(--foreground)', lineHeight: 1.6 }}>{value}</span>
    </div>
  )
}
