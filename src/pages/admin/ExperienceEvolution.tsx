import { experiences, skillVersions } from '../../data/fixtures'

function outcomeBadge(outcome: string) {
  if (outcome === 'success') return <span className="badge badge-success">成功</span>
  return <span className="badge badge-danger">失败</span>
}

function statusBadge(status: string) {
  if (status === '已发布') return <span className="badge badge-success">已发布</span>
  if (status === '试运行') return <span className="badge badge-warning">试运行</span>
  if (status === '待审批') return <span className="badge badge-info">待审批</span>
  return <span className="badge badge-muted">{status}</span>
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
    <div>
      <div className="page-header">
        <div className="page-title">经验池/Skill/工作流进化与版本对比<span className="demo-label">演示样例</span></div>
        <div className="page-subtitle">经验采集 → 脱敏 → 归因 → 候选 → 评测 → 审批 → 试运行 → 发布</div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-5)', background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>经验采集 → 脱敏 → 归因 → 候选 → 评测 → 审批 → 试运行 → 发布。</strong>
          每条经验经过脱敏和归因后形成候选模式，通过回归测试和发布门槛审核后进入试运行，试运行通过后正式发布为Skill新版本。
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {experiences.map((exp) => (
          <div key={exp.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>触发条件</div>
                <div style={{ fontSize: 'var(--text-sm)', marginTop: '2px' }}>{exp.trigger}</div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                {outcomeBadge(exp.outcome)}
                {statusBadge(exp.status)}
                <span className="tag">{exp.version}</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>模式名：</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)' }}>{exp.pattern}</span>
            </div>

            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>执行序列</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                {exp.sequence.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--muted)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 500,
                    }}>{step}</span>
                    {i < exp.sequence.length - 1 && (
                      <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-4" style={{ marginBottom: 'var(--space-3)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>样本数</div>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 600 }}>{exp.samples}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>失败数</div>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: exp.failures > 0 ? 'var(--danger)' : 'var(--success)' }}>{exp.failures}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>置信度</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ flex: 1, height: '8px', background: 'var(--muted)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${exp.confidence * 100}%`, height: '100%', background: 'var(--success)', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{(exp.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>版本</div>
                <div style={{ fontSize: 'var(--text-md)', fontWeight: 600, color: 'var(--primary)' }}>{exp.version}</div>
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', marginBottom: 'var(--space-1)' }}>改进说明</div>
              <div style={{ fontSize: 'var(--text-sm)' }}>{exp.improvements}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 'var(--space-5)' }}>
        <div className="card-title">{skillVersions.name} · 版本对比</div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>对比维度</th>
                <th style={{ width: '130px' }}>当前版本 {skillVersions.current.version}</th>
                <th style={{ width: '30px' }}></th>
                <th style={{ width: '130px' }}>候选版本 {skillVersions.candidate.version}</th>
                <th>变化</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((m) => {
                const isImproved = m.lower ? m.candidate < m.current : m.candidate > m.current
                const isSame = m.candidate === m.current
                const delta = m.lower ? m.current - m.candidate : m.candidate - m.current
                return (
                  <tr key={m.label}>
                    <td style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{m.label}</td>
                    <td style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-code)' }}>
                      {m.decimal ? m.current.toFixed(1) : m.current}{m.unit}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>→</td>
                    <td style={{
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'var(--font-code)',
                      color: isImproved ? 'var(--success)' : isSame ? 'var(--muted-foreground)' : 'var(--danger)',
                      fontWeight: isImproved ? 600 : 400,
                    }}>
                      {m.decimal ? m.candidate.toFixed(1) : m.candidate}{m.unit}
                    </td>
                    <td>
                      {isSame ? (
                        <span className="badge badge-muted">持平</span>
                      ) : isImproved ? (
                        <span className="badge badge-success">
                          {m.lower ? '↓' : '↑'} {m.decimal ? Math.abs(delta).toFixed(1) : Math.abs(delta)}{m.unit}
                        </span>
                      ) : (
                        <span className="badge badge-danger">
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

      <div className="card" style={{ marginTop: 'var(--space-5)' }}>
        <div className="card-title">发布门槛</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {thresholdChecks.map((t) => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-2)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: '120px', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{t.label}</span>
              <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{t.threshold}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>候选值：</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-code)' }}>{t.candidate}</span>
              <span className={`badge ${t.passed ? 'badge-success' : 'badge-danger'}`}>{t.passed ? '通过' : '未通过'}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 'var(--space-5)', padding: 'var(--space-3)', background: 'var(--muted)', borderRadius: 'var(--radius-sm)' }}>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>回归样本数：</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{skillVersions.regressionSamples}</span>
            </div>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)' }}>来源案例数：</span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{skillVersions.sourceCases}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 'var(--space-5)', background: 'var(--muted)' }}>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>Skill和Agent工作流支持编辑、新版本、测试、审批、试运行、监控和回退。</strong>
          每个Skill版本经过完整生命周期管理，确保变更可控、可回退、可审计。
        </div>
      </div>
    </div>
  )
}
