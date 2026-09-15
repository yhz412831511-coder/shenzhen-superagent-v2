import { experiences, skillVersions } from '../../data/fixtures'

function outcomeBadge(outcome: string) {
  if (outcome === 'success') return <span className="ad-badge ad-badge-green">成功</span>
  return <span className="ad-badge ad-badge-red">失败</span>
}

function statusBadge(status: string) {
  if (status === '已发布') return <span className="ad-badge ad-badge-green">已发布</span>
  if (status === '试运行') return <span className="ad-badge ad-badge-amber">试运行</span>
  if (status === '待审批') return <span className="ad-badge ad-badge-cyan">待审批</span>
  return <span className="ad-badge ad-badge-muted">{status}</span>
}

const comparisonMetrics = [
  { label: '步骤数', current: skillVersions.current.steps.length, candidate: skillVersions.candidate.steps.length, lower: false, unit: '', decimal: false },
  { label: 'Token/任务', current: skillVersions.current.tokenPerTask, candidate: skillVersions.candidate.tokenPerTask, lower: true, unit: '', decimal: false },
  { label: '错误次数', current: skillVersions.current.errorCount, candidate: skillVersions.candidate.errorCount, lower: true, unit: '次', decimal: false },
  { label: '人工修改次数', current: skillVersions.current.humanOverride, candidate: skillVersions.candidate.humanOverride, lower: true, unit: '次', decimal: false },
  { label: 'P95延迟', current: skillVersions.current.p95Latency, candidate: skillVersions.candidate.p95Latency, lower: true, unit: '秒', decimal: false },
  { label: '召回率', current: skillVersions.current.recallRate, candidate: skillVersions.candidate.recallRate, lower: false, unit: '%', decimal: true },
]

const thresholdChecks = [
  { label: '召回率', threshold: skillVersions.thresholds.recallRate, candidate: `${skillVersions.candidate.recallRate}%`, passed: skillVersions.candidate.recallRate >= 94.0 },
  { label: '错误次数', threshold: skillVersions.thresholds.errorCount, candidate: `${skillVersions.candidate.errorCount} 次`, passed: skillVersions.candidate.errorCount <= 2 },
  { label: '人工修改下降', threshold: skillVersions.thresholds.humanOverride, candidate: `${((skillVersions.current.humanOverride - skillVersions.candidate.humanOverride) / skillVersions.current.humanOverride * 100).toFixed(0)}%`, passed: ((skillVersions.current.humanOverride - skillVersions.candidate.humanOverride) / skillVersions.current.humanOverride) >= 0.5 },
  { label: 'Token/任务', threshold: skillVersions.thresholds.tokenPerTask, candidate: `${skillVersions.candidate.tokenPerTask}`, passed: skillVersions.candidate.tokenPerTask <= skillVersions.current.tokenPerTask * 0.75 },
  { label: 'P95延迟', threshold: skillVersions.thresholds.p95Latency, candidate: `${skillVersions.candidate.p95Latency} 秒`, passed: skillVersions.candidate.p95Latency <= 45 },
]

export default function ExperienceEvolution() {
  return (
    <div className="ad-page">
      <div className="ad-header">
        <div>
          <div className="ad-header-title">经验与进化</div>
          <div className="ad-header-sub">经验采集 → 脱敏 → 归因 → 候选 → 评测 → 审批 → 试运行 → 发布</div>
        </div>
        <div className="ad-env">
          <span className="ad-env-badge"><i />演示样例 · 2 条候选经验</span>
        </div>
      </div>

      {/* 经验池 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {experiences.map((exp) => (
          <div className="ad-card" key={exp.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
              <div>
                <div className="ad-kpi-label">触发条件</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)', marginTop: '2px' }}>{exp.trigger}</div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                {outcomeBadge(exp.outcome)}
                {statusBadge(exp.status)}
                <span className="ad-badge ad-badge-blue ad-num">{exp.version}</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span className="ad-kpi-label">模式名：</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ad-cyan)' }}>{exp.pattern}</span>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div className="ad-kpi-label" style={{ marginBottom: 'var(--space-1)' }}>执行序列</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                {exp.sequence.map((step, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'rgba(0, 212, 255, 0.06)',
                      border: '1px solid var(--ad-border-soft)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--ad-text)',
                    }}>{step}</span>
                    {i < exp.sequence.length - 1 && (
                      <span style={{ color: 'var(--ad-muted)', fontSize: 'var(--text-xs)' }}>→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div className="ad-grid-2 mb-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
              <div className="ad-metric">
                <span className="k">样本数</span>
                <span className="v" style={{ fontSize: 'var(--text-md)' }}>{exp.samples}</span>
              </div>
              <div className="ad-metric">
                <span className="k">失败数</span>
                <span className="v" style={{ fontSize: 'var(--text-md)', color: exp.failures > 0 ? 'var(--ad-red)' : 'var(--ad-green)' }}>{exp.failures}</span>
              </div>
              <div className="ad-metric">
                <span className="k">置信度</span>
                <span className="v" style={{ fontSize: 'var(--text-md)' }}>{(exp.confidence * 100).toFixed(0)}%</span>
                <div style={{ height: '6px', background: 'rgba(138,163,199,0.12)', borderRadius: '3px', overflow: 'hidden', marginTop: '4px', width: '80%' }}>
                  <div style={{ width: `${exp.confidence * 100}%`, height: '100%', background: 'var(--ad-green)' }} />
                </div>
              </div>
              <div className="ad-metric">
                <span className="k">版本</span>
                <span className="v ad-num" style={{ fontSize: 'var(--text-md)', color: 'var(--ad-cyan)' }}>{exp.version}</span>
              </div>
            </div>

            <div style={{
              padding: 'var(--space-3)',
              background: 'rgba(17, 27, 48, 0.6)',
              border: '1px solid var(--ad-border-soft)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div className="ad-kpi-label" style={{ marginBottom: 'var(--space-1)' }}>改进说明</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-text)' }}>{exp.improvements}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 版本对比 */}
      <div className="ad-card mt-4">
        <div className="ad-card-title">
          {skillVersions.name} · 版本对比
          <span className="sub">候选版本须全部通过发布门槛</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="ad-table">
            <thead>
              <tr>
                <th>对比维度</th>
                <th style={{ width: '130px' }}>当前版本 {skillVersions.current.version}</th>
                <th style={{ width: '30px' }}></th>
                <th style={{ width: '130px' }}>候选版本 {skillVersions.candidate.version}</th>
                <th style={{ width: '110px' }}>变化</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((m) => {
                const isImproved = m.lower ? m.candidate < m.current : m.candidate > m.current
                const isSame = m.candidate === m.current
                const delta = m.lower ? m.current - m.candidate : m.candidate - m.current
                return (
                  <tr key={m.label}>
                    <td style={{ fontWeight: 500 }}>{m.label}</td>
                    <td className="ad-num" style={{ color: 'var(--ad-muted)' }}>
                      {m.decimal ? m.current.toFixed(1) : m.current}{m.unit}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--ad-muted)' }}>→</td>
                    <td className="ad-num" style={{ color: isImproved ? 'var(--ad-green)' : isSame ? 'var(--ad-muted)' : 'var(--ad-red)', fontWeight: isImproved ? 600 : 400 }}>
                      {m.decimal ? m.candidate.toFixed(1) : m.candidate}{m.unit}
                    </td>
                    <td>
                      {isSame ? (
                        <span className="ad-badge ad-badge-muted">持平</span>
                      ) : isImproved ? (
                        <span className="ad-badge ad-badge-green">
                          {m.lower ? '↓' : '↑'} {m.decimal ? Math.abs(delta).toFixed(1) : Math.abs(delta)}{m.unit}
                        </span>
                      ) : (
                        <span className="ad-badge ad-badge-red">
                          {m.lower ? '↑' : '↓'} {m.decimal ? Math.abs(delta).toFixed(1) : Math.abs(delta)}{m.unit}
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 发布门槛 */}
      <div className="ad-card mt-4">
        <div className="ad-card-title">
          发布门槛
          <span className="sub">回归样本 {skillVersions.regressionSamples} · 来源案例 {skillVersions.sourceCases}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {thresholdChecks.map((t) => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--ad-border-soft)' }}>
              <span style={{ width: '110px', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{t.label}</span>
              <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--ad-muted)' }}>{t.threshold}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ad-muted)' }}>候选值：</span>
              <span className="ad-num" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{t.candidate}</span>
              <span className={`ad-badge ${t.passed ? 'ad-badge-green' : 'ad-badge-red'}`}>{t.passed ? '通过' : '未通过'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ad-alert" style={{ marginTop: 'var(--space-4)' }}>
        <span>↗</span>
        <span>
          Skill 和 Agent 工作流支持编辑、新版本、测试、审批、试运行、监控和回退。每条经验经脱敏和归因后形成候选模式，通过回归测试和发布门槛审核后进入试运行，确保变更可控、可回退、可审计。
        </span>
      </div>
    </div>
  )
}
