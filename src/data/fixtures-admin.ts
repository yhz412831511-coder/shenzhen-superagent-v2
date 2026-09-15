// ==============================================================
// 管理端驾驶舱数据（运行与进化总览 / 事项与智能体 / 事件处置 / 平台设置）
// 全部为演示样例：数字对齐领导示意图，逻辑自洽，不指向任何真实数据
// ==============================================================

// ---------- 运行与进化总览：KPI 四卡 ----------
export const adminKpis = [
  {
    key: 'run',
    icon: '办',
    tone: 'cyan' as const,
    label: '今日运行事项',
    value: '1,248',
    subs: [
      { text: '已闭环', value: '91.2%', cls: 'ok' as const },
      { text: '待确认', value: '37', cls: 'warn' as const },
    ],
  },
  {
    key: 'agent',
    icon: '智',
    tone: 'blue' as const,
    label: '纳管应用 · Agent',
    value: '236 · 684',
    subs: [
      { text: '覆盖部门', value: '42', cls: 'ok' as const },
      { text: '活跃智能体', value: '412', cls: 'ok' as const },
    ],
  },
  {
    key: 'risk',
    icon: '险',
    tone: 'red' as const,
    label: '高风险 AI 行为',
    value: '8 项',
    subs: [
      { text: '待处置', value: '1', cls: 'bad' as const },
      { text: '已进入处置链路', value: '8', cls: 'ok' as const },
    ],
  },
  {
    key: 'save',
    icon: '省',
    tone: 'green' as const,
    label: '本月避免消耗',
    value: '1.93 亿',
    subs: [
      { text: '节省成本', value: '¥5.8 万', cls: 'ok' as const },
      { text: '预算执行', value: '68.4%', cls: 'ok' as const },
    ],
  },
]

// ---------- 全市 AI 事项运行态势：五阶段漏斗 ----------
export const adminFunnel = {
  stages: [
    { label: '事项进入', count: 1248 },
    { label: '记忆召回', count: 1216 },
    { label: '执行', count: 1183 },
    { label: '审核', count: 1146 },
    { label: '结果', count: 1138 },
  ],
  alert: '24 项触发治理 · 37 待确认 · 8 高风险',
  closureRate: 91.2,
  closureSubs: [
    { k: '平均闭环时长', v: '2.4 天' },
    { k: '按期完成率', v: '94.6%' },
  ],
  scenes: [
    { label: '办会', value: 386 },
    { label: '办文', value: 342 },
    { label: '督办', value: 268 },
    { label: '材料汇总', value: 152 },
    { label: '数据核验', value: 100 },
  ],
}

// ---------- 危险 AI 行为（首页右侧） ----------
export const adminDangerList = [
  { no: 1, title: '项目材料助手 · 批量导出项目台账数据', meta: '住建局 · 已阻断 10/12', state: 'blocked' as const },
  { no: 2, title: '一件事服务Agent · 跨部门组合推导敏感信息', meta: '政数局 · 人工复核 1', state: 'review' as const },
  { no: 3, title: '会议督办Agent · 未确认决议写入督办系统', meta: '政数局 · 已阻断 3/3', state: 'blocked' as const },
  { no: 4, title: '督查报送Agent · 超范围读取区级台账', meta: '政数局 · 已授权放行', state: 'allowed' as const },
  { no: 5, title: '系统改造Agent · 沙箱外文件传输尝试', meta: '住建局 · 已隔离 BOX-09', state: 'blocked' as const },
]

// ---------- Token 瀑布（首页） ----------
export const adminTokenWaterfall = {
  baseline: 10.35,
  cuts: [
    { label: '缓存复用', value: 0.81 },
    { label: '模型融合', value: 0.60 },
    { label: '上下文压缩', value: 0.37 },
    { label: '提示词调优', value: 0.15 },
  ],
  actual: 8.42,
  budgetRate: 68.4,
  avoidNote: '本月避免消耗 1.93 亿 · 节省 ¥5.8 万',
}

// ---------- 记忆使用与能力进化（首页） ----------
export const adminMemoryEvolution = {
  memoryRate: 64.3,
  memoryNote: '记忆进入实际办理过程',
  evolutionPoints: [
    { period: '第1期', rate: 46.2 },
    { period: '第2期', rate: 49.8 },
    { period: '第3期', rate: 53.5 },
    { period: '第4期', rate: 57.1 },
    { period: '第5期', rate: 60.5 },
    { period: '第6期', rate: 64.3 },
  ],
  deltas: [
    { label: '近6期记忆使用率', value: '+5.5%' },
    { label: '近6期办理效率', value: '+3.8%' },
  ],
  metric: { k: '会议决议转督办', v: '5 min', note: '人工确认后自动写回' },
}

// ---------- 沙箱状态管理（首页模块） ----------
export interface SandboxInstance {
  id: string
  name: string
  status: '运行中' | '闲置' | '异常' | '已隔离'
  task: string
  space: string
  owner: string
  network: string
  template: string
  cpu: string
  memory: string
  retention: string
  restriction: string
}

export const sandboxStatus = {
  counts: [
    { key: 'run', label: '运行中', value: 21 },
    { key: 'idle', label: '闲置', value: 9 },
    { key: 'err', label: '异常', value: 4 },
    { key: 'iso', label: '已隔离', value: 2 },
  ],
  total: 36,
  note: '沙箱内运行，工作成果保存在个人空间。异常、已隔离和已停止分别记录。',
  pools: [
    { label: '沙箱节点池 2 池', detail: '通用池 24 节点 · 高风险专用池 8 节点' },
    { label: '内核级隔离已启用', detail: '防容器逃逸 · 秒级冷启 / 休眠恢复' },
    { label: '多租户隔离', detail: '请求级 / 实例级 / 会话级三级隔离' },
  ],
}

export const sandboxInstances: SandboxInstance[] = [
  { id: 'BOX-01', name: '政数局任务环境 01', status: '运行中', task: 'TASK-PARTY-001', space: 'SPACE-chenj', owner: '运行运维岗', network: '政务环境', template: '通用文件处理 / v1.2', cpu: '2核', memory: '4GB', retention: '任务结束留存 30 天', restriction: '基础访问规则' },
  { id: 'BOX-02', name: '住建局任务环境 05', status: '运行中', task: 'TASK-20260910-0090', space: 'SPACE-zhaoc', owner: '运行运维岗', network: '政务环境', template: '通用文件处理 / v1.2', cpu: '2核', memory: '4GB', retention: '任务结束留存 30 天', restriction: '基础访问规则' },
  { id: 'BOX-03', name: '人社局任务环境 11', status: '闲置', task: '—', space: 'SPACE-lis', owner: '运行运维岗', network: '政务环境', template: '通用文件处理 / v1.2', cpu: '2核', memory: '4GB', retention: '闲置 7 天自动回收', restriction: '基础访问规则' },
  { id: 'BOX-09', name: '住建局任务环境 09', status: '已隔离', task: 'TASK-20260912-0117', space: 'SPACE-wangm', owner: '安全运营岗', network: '政务环境 · 断网审查', template: '浏览器自动化 / v1.1', cpu: '4核', memory: '8GB', retention: '隔离留存 90 天', restriction: '沙箱访问边界（收严）' },
]

// ---------- 事项与智能体：与用户端故事线同源 ----------
export const matterAgentChain = {
  task: 'TASK-PARTY-001',
  title: '局党组第13次会议会前准备',
  owner: '陈静 · 政数局办公室 · 综合科',
  matter: '局党组第13次会议（2026-09-18 09:00）',
  stages: [
    { label: '事项进入', value: '1 事项', detail: '局党组第13次会议会前准备' },
    { label: '记忆召回', value: '4 条记忆', detail: '第12次党组会纪要 · 会前准备流程 · 议题责任处室 · 督办状态' },
    { label: '执行', value: '4 分项 + 2 请示', detail: 'T1 核查 / T2 议题征集 / T3 督办汇报 / T4 值班汇总（新增）' },
    { label: '审核', value: '2 项人工确认', detail: 'CODES 授权请示 · OA 提醒审批' },
    { label: '结果', value: '3 材料 + 1 通知', detail: '会前材料 3 份 · 粤政易会议通知 1 份' },
  ],
}

export const matterAgentTimeline = [
  { time: '09:30', node: '任务发起', detail: '陈静在工作台输入目标，识别为「办会 · 会前准备」', model: '智能模式 · L2 常规工作', token: '3.2k', sandbox: '—' },
  { time: '09:31', node: '计划确认', detail: '生成 3 分项计划（后新增 T4），权限档位「逐项确认」', model: '智能模式 · L2', token: '1.4k', sandbox: 'BOX-01 创建' },
  { time: '09:33', node: '白盒执行 · T1', detail: '会议系统 + 任务跟踪：5 项上次任务核验', model: 'L1 轻量抽取', token: '2.0k', sandbox: 'BOX-01' },
  { time: '09:36', node: '白盒执行 · T2', detail: 'OA 议题检索：6 处室已交 5，政策法规处未交（联系人脱敏）', model: 'L1 轻量抽取', token: '1.5k', sandbox: 'BOX-01' },
  { time: '09:39', node: '白盒执行 · T3', detail: '督办清单读取：6 项任务，1 项描述过简', model: 'L1 轻量抽取', token: '1.7k', sandbox: 'BOX-01' },
  { time: '10:12', node: '请示 ① CODES 授权', detail: '情景记忆发现领导关注事项，申请从 CODES 补充详情 → 用户允许', model: 'L3 复杂判断', token: '2.3k', sandbox: 'BOX-01 · 临时授权' },
  { time: '10:31', node: '请示 ② OA 提醒', detail: '交叉验证发现公文缺口，申请发送 OA 提醒 → 用户确认', model: 'L3 复杂判断', token: '1.0k', sandbox: 'BOX-01 · 写操作审批' },
  { time: '10:48', node: '产出物生成', detail: '会前材料 3 份 + 会议通知（粤政易 28 人群）', model: 'L2 常规工作', token: '6.2k', sandbox: 'BOX-01' },
  { time: '11:05', node: '记忆收尾', detail: '4 条新记忆经确认学习 · 生成纪要提交待办（09-19）', model: 'L0 无模型', token: '0.6k', sandbox: 'BOX-01 回收' },
]

export const managedAgents = [
  { name: '政务 SuperAgent（主）', version: 'V2.0', status: '运行中', unit: '全市各接入单位', calls: '4,860', sandbox: '按任务分配', scope: '综合政务助理 · 全技能' },
  { name: '会议督办 Agent', version: '2.1', status: '运行中', unit: '政数局', calls: '1,248', sandbox: 'BOX-01', scope: '会前准备 · 决议核验 · 督办建议' },
  { name: '督查报送 Agent', version: '1.0', status: '运行中', unit: '政数局', calls: '866', sandbox: 'BOX-04', scope: '督查反馈收集 · 报送汇总' },
  { name: '系统改造 Agent', version: '1.2', status: '运行中', unit: '住建局', calls: '520', sandbox: 'BOX-02', scope: 'MCP 接口测试 · 改造试点' },
  { name: '政务服务 Agent', version: '1.5', status: '静默', unit: '政数局', calls: '—', sandbox: '—', scope: '一件事联调 · 端到端验证' },
  { name: '材料汇总 Agent', version: '1.0', status: '运行中', unit: '全市各处室', calls: '2,304', sandbox: 'BOX-06', scope: '周报汇总 · 材料合成' },
]

export const matterAgentStats = [
  { k: '今日事项', v: '1,248' },
  { k: '已闭环', v: '91.2%' },
  { k: '平均人机确认', v: '2.4 次/事项' },
]

// ---------- 事件处置 ----------
export interface IncidentEvent {
  id: string
  level: '高' | '中' | '低'
  type: string
  rule: string
  task: string
  time: string
  status: '待处置' | '处置中' | '已闭环'
  action: string
  receipt: string
}

export const incidentStats = [
  { k: '待处置', v: '1', tone: 'red' as const },
  { k: '今日已闭环', v: '7', tone: 'green' as const },
  { k: '平均处置时长', v: '12 min', tone: 'cyan' as const },
]

export const incidentEvents: IncidentEvent[] = [
  { id: 'INC-20260915-01', level: '高', type: '未授权写入', rule: '写操作须人工确认（B级）', task: 'TASK-20260912-0117', time: '10:22', status: '待处置', action: '阻断已生效 · 转人工', receipt: '阻断记录已写入审计日志，等待安全运营岗复核' },
  { id: 'INC-20260915-02', level: '中', type: '沙箱访问', rule: '沙箱访问边界（收严）', task: 'TASK-20260912-0117', time: '10:22', status: '处置中', action: '环境已隔离 BOX-09', receipt: '已隔离环境快照留存，90 天内可回查' },
  { id: 'INC-20260915-03', level: '中', type: '越权读取', rule: '跨部门数据组合推导（B级）', task: 'TASK-20260910-0086', time: '09:38', status: '处置中', action: '转人工确认', receipt: '疑似违规推导已标记，待数据主管确认' },
  { id: 'INC-20260915-04', level: '高', type: '文件导出', rule: '批量导出敏感数据（B级）', task: 'TASK-20260908-0043', time: '08:47', status: '已闭环', action: '阻断 + 暂停批量导出权限', receipt: '已处置 · 责任人赵处 · 处置时长 9 min' },
  { id: 'INC-20260914-11', level: '低', type: '越权读取', rule: '超范围读取区级台账（C级）', task: 'TASK-20260914-0102', time: '16:20', status: '已闭环', action: '放行（授权范围内）', receipt: '复核确认为已授权访问，正常放行留痕' },
  { id: 'INC-20260914-08', level: '中', type: '未授权写入', rule: '未确认决议写入（B级）', task: 'TASK-20260914-0091', time: '14:02', status: '已闭环', action: '阻断 + 增加预览审批步骤', receipt: '已修复 · Skill V2.0 发布，处置时长 15 min' },
]

// ---------- 数据与记忆：记忆治理 ----------
export const memoryGovernance = {
  stats: [
    { k: '全市记忆条目', v: '18,602' },
    { k: '本月新增', v: '1,248' },
    { k: '待用户确认', v: '37' },
    { k: '自进化提炼', v: '52' },
  ],
  policies: [
    { label: '新增记忆须用户确认后学习', desc: '任务收尾的记忆学习卡逐条确认', on: true },
    { label: '自进化提炼须管理员审批', desc: '从办理记录提炼模式需审批后入池', on: true },
    { label: '组织记忆由管理员统一发布', desc: '职责与权限类记忆全局唯一版本', on: true },
    { label: '跨部门记忆引用留痕审计', desc: '引用他部门组织记忆全部留痕', on: true },
  ],
}

// ---------- 安全与审计 ----------
export const securityStats = [
  { label: '本周阻断次数', value: '15', icon: '⊘', tone: 'red' as const },
  { label: '降级次数', value: '8', icon: '↓', tone: 'amber' as const },
  { label: '转人工次数', value: '12', icon: '◐', tone: 'blue' as const },
  { label: '今日高风险', value: '8', icon: '⚑', tone: 'cyan' as const },
]

export const auditChain = [
  { label: '工具调用留痕', detail: '每次 MCP 调用记录工具、系统、级别与返回摘要' },
  { label: '数据读取留痕', detail: '读取范围、命中脱敏规则、组合推导审查' },
  { label: '写操作审批', detail: '写回前预览 + 人工确认，支持幂等与回退' },
  { label: '记忆学习确认', detail: '新记忆逐条经用户确认后写入，可追溯来源' },
]

// ---------- 平台设置 ----------
export const settingsGroups = [
  {
    title: '默认权限档位',
    desc: '新任务发起时的默认权限策略',
    options: ['标准访问', '逐项确认', '完全访问'],
    active: '逐项确认',
  },
  {
    title: '模型调度策略',
    desc: '任务级路由：按任务复杂度自动分级调度',
    options: ['智能模式（四级调度）', '固定模型目录'],
    active: '智能模式（四级调度）',
  },
  {
    title: '沙箱策略',
    desc: '任务环境模板、留存与网络隔离',
    options: ['环境模板 v1.2（通用文件处理）', '环境模板 v1.1（浏览器自动化）'],
    active: '环境模板 v1.2（通用文件处理）',
    switches: [
      { label: '外网隔离', on: true },
      { label: '任务结束自动回收授权', on: true },
      { label: '异常环境自动隔离', on: true },
    ],
  },
  {
    title: '公告与水印',
    desc: '全平台演示标识',
    options: [],
    active: '',
    switches: [
      { label: '「演示环境 · 合成数据」水印', on: true },
      { label: '页面角标「演示样例」', on: true },
    ],
  },
]
