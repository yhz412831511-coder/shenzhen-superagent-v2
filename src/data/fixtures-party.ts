// ==============================================================
// 党组会故事数据（「局内党组会会前准备」故事线）
// 全部为演示样例：数字为合成但逻辑自洽，不指向任何真实数据
// ==============================================================

// ---------- P1 首页：任务触发区 ----------
export interface PartyPresetScenario {
  label: string
  prompt: string
}

export interface PartyPresetCategory {
  key: string
  label: string
  icon: string
  scenarios: PartyPresetScenario[]
}

export const partyPresetCategories: PartyPresetCategory[] = [
  {
    key: 'doc',
    label: '办文',
    icon: '🗎',
    scenarios: [
      { label: '公文起草', prompt: '帮我起草一份关于政务数据共享工作的请示文件' },
      { label: '来文办理', prompt: '帮我办理市政府办转来的这份专项督查来文' },
      { label: '公文核校', prompt: '帮我核校这份上报材料的格式与数据引用' },
    ],
  },
  {
    key: 'meeting',
    label: '办会',
    icon: '📅',
    scenarios: [
      { label: '会议准备', prompt: '帮我准备下一次局内党组会的准备工作' },
      { label: '纪要整理', prompt: '帮我把昨天的局长办公会录音整理成会议纪要' },
      { label: '决议跟踪', prompt: '帮我跟踪上次会议决议的落实情况' },
    ],
  },
  {
    key: 'affair',
    label: '办事',
    icon: '⧉',
    scenarios: [
      { label: '督办跟进', prompt: '帮我跟进近期重点督办任务的执行情况' },
      { label: '材料汇总', prompt: '帮我汇总各处室本周工作情况形成周报' },
      { label: '数据核验', prompt: '帮我核验这份报告里各处数据的口径一致性' },
    ],
  },
  {
    key: 'major',
    label: '专业事项',
    icon: '⚙',
    scenarios: [
      { label: '政务信息系统管理', prompt: '帮我梳理全局政务信息系统管理专项检查的进展' },
      { label: '政务算力统筹', prompt: '帮我汇总全市政务算力建设情况' },
      { label: '数据要素流通', prompt: '帮我分析本市数据要素流通的最新进展与堵点' },
    ],
  },
]

export const partyOpeningPrompt = '帮我准备下一次局内党组会的准备工作'

export const partyPermissionLevels = [
  { key: 'standard', label: '标准访问', desc: '使用所选内容与已绑定项目，扩大范围时确认' },
  { key: 'confirm', label: '逐项确认', desc: '每次新增读取范围或调用能力都询问（默认）' },
  { key: 'full', label: '完全访问', desc: '在当前身份与组织策略范围内自动读写和调用能力' },
]

// ---------- 智能模式：四级调度（任务级路由） ----------
export interface CapabilityLevel {
  level: string
  name: string
  desc: string
  primary: string
  backup: string
}

export const capabilityLevels: CapabilityLevel[] = [
  { level: 'L0', name: '无模型处理', desc: '规则、检索、缓存先行，压缩重复上下文', primary: '—', backup: '—' },
  { level: 'L1', name: '轻量处理', desc: '分类、抽取、格式整理、简短摘要', primary: 'ERNIE-4.5-21B', backup: 'GLM-5.3-Flash' },
  { level: 'L2', name: '常规工作', desc: '材料理解、起草、对比、表格分析', primary: 'Qwen3.8-27B', backup: 'MiniMax-M2.7' },
  { level: 'L3', name: '复杂任务', desc: '深度研究、复杂推理、跨材料综合', primary: 'DeepSeek-V4-Pro', backup: 'Qwen3.8-2.4T' },
]

// ---------- 固定模型：模型目录（演示样例） ----------
export interface ModelCatalogItem {
  id: string
  name: string
  vendor: string
  capability: string
  category: string
  tier: string
}

export const modelCatalog: ModelCatalogItem[] = [
  { id: 'qwen3-8-24t', name: 'Qwen3.8-2.4T-A95B', vendor: '阿里', capability: '深度推理与长上下文', category: '推理', tier: 'L3' },
  { id: 'deepseek-v4-pro', name: 'DeepSeek-V4-Pro-0813', vendor: '深度求索', capability: '复杂推理与代码', category: '推理', tier: 'L3' },
  { id: 'glm-5-3', name: 'GLM-5.3', vendor: '智谱', capability: '通用对话与写作', category: '通用', tier: 'L2' },
  { id: 'kimi-k3', name: 'Kimi K3', vendor: '月之暗面', capability: '长文档理解', category: '通用', tier: 'L2' },
  { id: 'minimax-m2-7', name: 'MiniMax-M2.7', vendor: 'MiniMax', capability: '通用任务处理', category: '通用', tier: 'L2' },
  { id: 'hy4-preview', name: 'Hy4 preview', vendor: '阶跃星辰', capability: '多模态理解', category: '多模态', tier: 'L2' },
  { id: 'ernie-4-5-300b', name: 'ERNIE-4.5-300B', vendor: '百度', capability: '通用工作处理', category: '通用', tier: 'L2' },
  { id: 'deepseek-v4-flash', name: 'DeepSeek-V4-Flash', vendor: '深度求索', capability: '快速响应任务', category: '轻量', tier: 'L1' },
  { id: 'glm-5-3-flash', name: 'GLM-5.3-Flash', vendor: '智谱', capability: '轻量抽取与摘要', category: '轻量', tier: 'L1' },
  { id: 'glm-4-1v-9b', name: 'GLM-4.1V-9B', vendor: '智谱', capability: '图像理解与OCR', category: '多模态', tier: 'L1' },
]

export const partyContextChips = [
  { id: 'ctx-1', label: '@ 第12次党组会纪要' },
  { id: 'ctx-2', label: '@ 督办系统' },
]

// ---------- P1 首页：任务感知区 ----------
export interface PartyTodo {
  id: string
  type: string
  typeBadge: 'danger' | 'warning' | 'info' | 'muted'
  title: string
  due: string
  action: string
}

export const partyTodos: PartyTodo[] = [
  { id: 'todo-1', type: '会议', typeBadge: 'warning', title: '局党组第13次会议会前材料复核', due: '09-17 18:00', action: '查看' },
  { id: 'todo-2', type: '督办', typeBadge: 'danger', title: '省级专项督查报送：剩余2部门未反馈', due: '今日 17:00', action: '催办' },
  { id: 'todo-3', type: '办文', typeBadge: 'warning', title: '市政府办来文转办意见拟制', due: '09-16 12:00', action: '办理' },
  { id: 'todo-4', type: '待确认', typeBadge: 'info', title: '处室议题征集情况汇总确认', due: '09-17 12:00', action: '确认' },
]

export interface PartyDoneMatter {
  id: string
  title: string
  completedAt: string
  material: string
}

export const partyDoneMatters: PartyDoneMatter[] = [
  { id: 'done-1', title: '第12次党组会纪要整理与归档', completedAt: '09-08', material: '会议纪要.docx' },
  { id: 'done-2', title: '8月政务数据开放目录更新汇报', completedAt: '09-10', material: '目录更新说明.pdf' },
  { id: 'done-3', title: '局网络安全检查周报汇总', completedAt: '09-11', material: '安全周报W37.docx' },
]

// ---------- P1 首页：记忆区域 ----------
export interface PartyMemoryRef {
  id: string
  type: string
  title: string
  time: string
}

export const partyRecentUsedMemories: PartyMemoryRef[] = [
  { id: 'mru-1', type: '情景记忆', title: '第12次党组会：领导对政务信息系统管理提出强烈关注', time: '09-04' },
  { id: 'mru-2', type: '程序记忆', title: '党组会会前准备标准流程（3个分项）', time: '08-21' },
  { id: 'mru-3', type: '组织记忆', title: '党组会议题征集责任处室清单', time: '08-21' },
]

export const partyRecentLearnedMemories: PartyMemoryRef[] = [
  { id: 'mrl-1', type: '语义记忆', title: '政务数据开放目录按季度更新、口径以目录系统为准', time: '09-12' },
]

// ---------- P2 任务计划确认 ----------
export const partyTaskId = 'TASK-PARTY-001'

export const partyTaskLaunch = {
  goal: '完成局党组第13次会议（09-18 09:00）全部会前准备工作，产出会议材料并发布会议通知',
  matter: '局党组第13次会议（MATTER-2026-0918）',
  owner: '陈静 · 政数局办公室 · 综合科',
  plannedOutputs: '会前材料 3 份 + 会议通知 1 份',
  memoryScope: '第12次党组会纪要与领导发言、前2次党组会会前准备经验',
  systems: [
    { name: '会议系统', mode: '只读' },
    { name: '任务跟踪系统', mode: '只读' },
    { name: 'OA系统', mode: '只读' },
    { name: '督办系统', mode: '只读' },
    { name: '深圳市一体化数字资源管理系统（CODES）', mode: '按需 · 须经请示' },
  ],
  writeActions: [
    { name: 'OA提醒发送（如需催交材料）', mode: '需确认' },
    { name: '粤政易会议通知发布', mode: '需确认' },
  ],
  tokenBudget: 20000,
  permissionLevel: '逐项确认',
}

export interface PartySubTask {
  id: string
  code: string
  title: string
  sourceSystems: string[]
  experience: string
  summary: string
}

export const partySubTasks: PartySubTask[] = [
  {
    id: 'pt-1',
    code: 'T1',
    title: '上次党组会任务及处理情况核查',
    sourceSystems: ['会议系统', '任务跟踪系统'],
    experience: '经验来源：第11/12次党组会会前准备',
    summary: '调取第12次党组会（09-04）留下的任务清单，逐项核验当前处理状态',
  },
  {
    id: 'pt-2',
    code: 'T2',
    title: '本次会议各处室议题征集',
    sourceSystems: ['OA系统'],
    experience: '经验来源：第11/12次党组会会前准备',
    summary: '检查6个处室通过OA提交的会议议题，标记未交处室',
  },
  {
    id: 'pt-3',
    code: 'T3',
    title: '近期重要督办任务执行情况汇报',
    sourceSystems: ['督办系统'],
    experience: '经验来源：第11/12次党组会会前准备',
    summary: '汇总近30天重要督办任务的执行情况，形成汇报材料',
  },
]

export const partyExtraSubTask: PartySubTask = {
  id: 'pt-4',
  code: 'T4',
  title: '汇总各处室本周值班安排',
  sourceSystems: ['OA系统'],
  experience: '用户新增 · 2026-09-15',
  summary: '收集各处室本周值班安排，纳入会前材料附件',
}

// ---------- P3 执行过程：白盒步骤 ----------
export type PartySecurityLevel = 'ok' | 'auth' | 'confirm' | 'masked'

export interface PartyExecStep {
  id: string
  node: string
  system: string
  security: string
  securityLevel: PartySecurityLevel
  result: string
  toolName: string
  toolParams: string
  toolResult: string
  authNote: string
}

export interface PartyExecBlock {
  subtask: PartySubTask
  steps: PartyExecStep[]
}

export const partyExecBlocks: PartyExecBlock[] = [
  {
    subtask: partySubTasks[0],
    steps: [
      {
        id: 's1',
        node: '读取会议系统，获取上次党组会任务清单',
        system: '会议系统',
        security: '鉴权通过',
        securityLevel: 'ok',
        result: '5 条记录',
        toolName: '会议系统 · task.query',
        toolParams: '范围 = 第12次党组会（09-04）',
        toolResult: '返回 5 项任务',
        authNote: '按「办公室·综合科」岗位权限只读，无需脱敏',
      },
      {
        id: 's2',
        node: '比对任务跟踪系统，核验每项任务当前状态',
        system: '任务跟踪系统',
        security: '鉴权通过',
        securityLevel: 'ok',
        result: '5 项已核验',
        toolName: '任务跟踪 · status.match',
        toolParams: '对象 = 会议任务清单 5 项',
        toolResult: '返回 5 项最新状态',
        authNote: '只读权限随岗位自动继承，过程留痕',
      },
    ],
  },
  {
    subtask: partySubTasks[1],
    steps: [
      {
        id: 's3',
        node: '读取OA系统，检索各处室议题提交',
        system: 'OA系统',
        security: '鉴权通过',
        securityLevel: 'ok',
        result: '5 份议题',
        toolName: 'OA系统 · doc.search',
        toolParams: '类型 = 党组会议题 · 范围 = 第13次会议',
        toolResult: '命中 5 份议题文档',
        authNote: '只读检索，敏感字段（联系人）自动脱敏',
      },
      {
        id: 's4',
        node: '比对应交处室名单，标记未交处室',
        system: 'OA系统',
        security: '已脱敏',
        securityLevel: 'masked',
        result: '1 个未交',
        toolName: 'OA系统 · doc.match',
        toolParams: '应交 = 6 个处室 · 已交 = 5 个',
        toolResult: '政策法规处未提交',
        authNote: '处室经办人联系方式脱敏，仅保留处室名',
      },
    ],
  },
  {
    subtask: partySubTasks[2],
    steps: [
      {
        id: 's5',
        node: '读取督办系统，获取近期重要督办任务清单',
        system: '督办系统',
        security: '鉴权通过',
        securityLevel: 'ok',
        result: '6 项任务',
        toolName: '督办系统 · supervision.list',
        toolParams: '周期 = 近30天 · 级别 = 重要',
        toolResult: '返回 6 项督办任务',
        authNote: '按「办公室·综合科」权限只读，无需脱敏',
      },
      {
        id: 's6',
        node: '检查各项进度描述完整性，识别描述过简条目',
        system: '督办系统',
        security: '鉴权通过',
        securityLevel: 'ok',
        result: '1 项描述过简',
        toolName: '督办系统 · desc.check',
        toolParams: '规则 = 进度描述 ≥ 具体事项与数据',
        toolResult: '「政务信息系统管理」仅一行描述',
        authNote: '本地校验，不涉及额外数据访问',
      },
    ],
  },
]

// 补充执行（授权后）：案例A的CODES取数 + 案例B的OA提醒
export const partyCaseASteps: PartyExecStep[] = [
  {
    id: 'ca-1',
    node: '从CODES获取「政务信息系统管理」任务详情',
    system: '深圳市一体化数字资源管理系统（CODES）',
    security: '鉴权通过 · 已获用户授权',
    securityLevel: 'auth',
    result: '4 类信息',
    toolName: 'CODES · project.detail',
    toolParams: '对象 = 政务信息系统管理专项检查',
    toolResult: '立项批复 / 阶段里程碑6条 / 验收材料清单 / 责任处室',
    authNote: '用户明确授权后临时开通，任务结束自动回收，访问全程留痕',
  },
  {
    id: 'ca-2',
    node: '将CODES详情整理为补充说明，并入督办汇报材料',
    system: '汇总',
    security: '鉴权通过',
    securityLevel: 'ok',
    result: '补充说明 1 份',
    toolName: '材料生成 · doc.compose',
    toolParams: '来源 = CODES 4 类信息',
    toolResult: '生成《专项检查补充说明》',
    authNote: '仅在任务结果区内生成，不写入外部系统',
  },
]

export const partyCaseBSteps: PartyExecStep[] = [
  {
    id: 'cb-1',
    node: '向数字基础设施处发送OA提醒，补充建设情况说明',
    system: 'OA系统',
    security: '写操作 · 人工确认',
    securityLevel: 'confirm',
    result: '已发送',
    toolName: 'OA系统 · notify.send',
    toolParams: '对象 = 数字基础设施处 · 事项 = 补交《政务算力建设情况说明》',
    toolResult: '提醒已送达，要求09-17前回补',
    authNote: '写操作触发审批，经用户确认后执行，确认记录已写入日志',
  },
]

// ---------- P3 结果面板 ----------
export interface LastPartyTask {
  id: string
  title: string
  owner: string
  status: '已完成' | '进行中' | '待验证'
  detail: string
}

export const lastPartyMeetingTasks: LastPartyTask[] = [
  { id: 'lpt-1', title: '政务信息系统管理专项检查', owner: '数字基础设施处', status: '进行中', detail: '督办进度：推进中（80%）' },
  { id: 'lpt-2', title: '政务算力建设', owner: '数字基础设施处', status: '待验证', detail: '督办显示已完成，待核验支撑材料' },
  { id: 'lpt-3', title: '政务数据开放目录更新', owner: '数据资源处', status: '已完成', detail: '8月目录已更新并归档' },
  { id: 'lpt-4', title: '局网络安全整改', owner: '网络安全处', status: '已完成', detail: '整改项已全部闭环' },
  { id: 'lpt-5', title: '一体化平台推广', owner: '政务服务处', status: '进行中', detail: '督办进度：推进中（60%）' },
]

export interface AgendaSubmission {
  office: string
  submitted: boolean
  title: string
  date: string
}

export const agendaSubmissions: AgendaSubmission[] = [
  { office: '数据资源处', submitted: true, title: '《政务数据共享交换平台扩容方案》', date: '09-13' },
  { office: '数字基础设施处', submitted: true, title: '《政务算力建设情况汇报》议题', date: '09-14' },
  { office: '政务服务处', submitted: true, title: '《一体化政务服务能力提升进展》', date: '09-14' },
  { office: '网络安全处', submitted: true, title: '《局网络安全等级保护整改情况》', date: '09-15' },
  { office: '规划财务处', submitted: true, title: '《数字政府建设年度评估迎检安排》', date: '09-15' },
  { office: '政策法规处', submitted: false, title: '未提交', date: '—' },
]

export interface SupervisionItem {
  id: string
  title: string
  owner: string
  progress: string
  status: '已完成' | '推进中'
  brief: boolean
}

export const supervisionItems: SupervisionItem[] = [
  { id: 'sup-1', title: '政务信息系统管理专项检查', owner: '数字基础设施处', progress: '推进中（80%）', status: '推进中', brief: true },
  { id: 'sup-2', title: '政务算力建设', owner: '数字基础设施处', progress: '已完成', status: '已完成', brief: false },
  { id: 'sup-3', title: '政务数据共享交换平台扩容', owner: '数据资源处', progress: '已完成', status: '已完成', brief: false },
  { id: 'sup-4', title: '全市一体化政务服务能力提升', owner: '政务服务处', progress: '推进中（65%）', status: '推进中', brief: false },
  { id: 'sup-5', title: '局网络安全等级保护整改', owner: '网络安全处', progress: '已完成', status: '已完成', brief: false },
  { id: 'sup-6', title: '数字政府建设年度评估迎检', owner: '规划财务处', progress: '推进中（40%）', status: '推进中', brief: false },
]

// ---------- P4 阶段产物确认：请示卡 ----------
export interface PartyCaseCard {
  id: string
  kind: 'memory' | 'conflict'
  badge: string
  title: string
  evidenceTitle: string
  evidenceLines: { label: string; value: string }[]
  gapTitle: string
  gapLines: { label: string; value: string }[]
  question: string
  primaryAction: string
  secondaryAction: string
  primaryResultNote: string
  secondaryResultNote: string
}

export const partyCaseA: PartyCaseCard = {
  id: 'case-a',
  kind: 'memory',
  badge: '情景记忆驱动',
  title: '案例A：督办描述过简，是否从CODES补充详情？',
  evidenceTitle: '记忆证据',
  evidenceLines: [
    { label: '记忆类型', value: '情景记忆 · 第12次党组会' },
    { label: '领导发言', value: '「信息系统管理是今年的重中之重，每次会我要听进展」' },
    { label: '原文锚点', value: '会议记录 00:42:15 · 2026-09-04' },
  ],
  gapTitle: '发现的缺口',
  gapLines: [
    { label: '督办系统描述', value: '「政务信息系统管理：推进中（80%）」——仅一行，过于简略' },
    { label: '影响', value: '该任务是领导明确关注事项，现有描述不足以支撑会议汇报' },
  ],
  question: '是否允许从深圳市一体化数字资源管理系统（CODES）重新获取该任务的详细信息？',
  primaryAction: '允许获取',
  secondaryAction: '暂不需要',
  primaryResultNote: '已获授权，正在从CODES获取详情',
  secondaryResultNote: '已标记为略过，汇报材料沿用督办系统现有描述',
}

export const partyCaseB: PartyCaseCard = {
  id: 'case-b',
  kind: 'conflict',
  badge: '交叉验证发现',
  title: '案例B：督办显示已完成，但缺少支撑公文',
  evidenceTitle: '系统证据（交叉验证）',
  evidenceLines: [
    { label: '督办系统', value: '「政务算力建设：已完成」' },
    { label: 'OA系统检索', value: '未找到处室提交的《政务算力建设情况说明》公文' },
    { label: '结论', value: '状态与材料存在缺口，任务闭环凭证不全' },
  ],
  gapTitle: '需要的动作',
  gapLines: [
    { label: '相关处室', value: '数字基础设施处（建设主办处室）' },
    { label: '建议', value: '发送OA提醒，请其于09-17前补充建设情况说明' },
  ],
  question: '是否向数字基础设施处发送OA提醒，补充建设情况说明？',
  primaryAction: '发送提醒',
  secondaryAction: '暂不提醒',
  primaryResultNote: '提醒已发送，等待处室回补公文',
  secondaryResultNote: '已标记为待人工线下处理，产出物中保留提示',
}

// ---------- P5 产出物与会前材料 ----------
export interface PartyOutputItem {
  id: string
  title: string
  detail: string
  source: string
}

export const partyOutputCompleted: PartyOutputItem[] = [
  { id: 'out-1', title: '上次党组会任务核查表', detail: '第12次党组会 5 项任务全部核验：已完成 2、进行中 2、待验证 1', source: '会议系统 + 任务跟踪' },
  { id: 'out-2', title: '处室议题征集情况', detail: '6 个处室已交 5、未交 1（政策法规处）', source: 'OA系统' },
  { id: 'out-3', title: '督办执行情况汇报', detail: '6 项重要督办任务执行情况汇总', source: '督办系统' },
]

export const partyOutputNeedHelp: PartyOutputItem[] = [
  { id: 'help-1', title: '政策法规处议题未提交', detail: '建议线下催报，或由办公室电话沟通确认议题意向', source: 'OA系统' },
  { id: 'help-2', title: '《政务算力建设情况说明》待回补', detail: 'OA提醒已发送，请关注数字基础设施处回补情况（09-17前）', source: 'OA系统' },
]

export interface PartyMaterialDoc {
  id: string
  title: string
  desc: string
  sections: { heading: string; lines: string[] }[]
}

export const partyMaterials: PartyMaterialDoc[] = [
  {
    id: 'mat-1',
    title: '《局党组第13次会议议题清单》',
    desc: '5 个处室议题 + 待定 1 项 · 来源：OA系统',
    sections: [
      { heading: '已收集议题（5）', lines: ['数据资源处：政务数据共享交换平台扩容方案', '数字基础设施处：政务算力建设情况汇报', '政务服务处：一体化政务服务能力提升进展', '网络安全处：局网络安全等级保护整改情况', '规划财务处：数字政府建设年度评估迎检安排'] },
      { heading: '待定（1）', lines: ['政策法规处：未提交，已列入需协助事项'] },
    ],
  },
  {
    id: 'mat-2',
    title: '《上次党组会任务核查表》',
    desc: '第12次党组会 5 项任务核验结果 · 来源：会议系统 + 任务跟踪',
    sections: [
      { heading: '核查结论', lines: ['已完成 2 项：政务数据开放目录更新、局网络安全整改', '进行中 2 项：政务信息系统管理专项检查（80%）、一体化平台推广（60%）', '待验证 1 项：政务算力建设（督办显示已完成，支撑公文待回补）'] },
      { heading: '领导关注事项', lines: ['政务信息系统管理：已通过CODES补充详细进展（立项批复、6条里程碑、验收清单、责任处室）'] },
    ],
  },
  {
    id: 'mat-3',
    title: '《近期重要督办任务执行情况汇报》',
    desc: '6 项重要督办任务 · 来源：督办系统 + CODES补充',
    sections: [
      { heading: '总体情况', lines: ['6 项重要督办任务：已完成 3、推进中 3', '重点提示：政务算力建设已完成但说明公文待回补，已在会前发送OA提醒'] },
      { heading: '领导关注事项补充', lines: ['政务信息系统管理专项检查：CODES详情显示6条里程碑已完成5条，剩余「全市系统台账复核」预计09-25完成'] },
    ],
  },
]

export interface PartyNoticeDraft {
  title: string
  body: string[]
  group: string
}

export const partyNoticeDraft: PartyNoticeDraft = {
  title: '关于召开局党组第13次会议的通知',
  body: [
    '会议时间：2026年9月18日（周五）09:00',
    '会议地点：局机关三楼党组会议室',
    '参会范围：局党组全体成员，各处室主要负责人',
    '会议议题：',
    '  一、传达学习上级数字政府建设最新部署',
    '  二、听取各处室重点工作汇报（含政务算力建设、政务信息系统管理等）',
    '  三、审议《政务数据共享交换平台扩容方案》',
    '  四、其他事项',
    '请各处室提前准备汇报材料，于09-17 18:00前报办公室汇总。',
  ],
  group: '粤政易 · 政数局办公室工作群（28人）',
}

// ---------- P6 记忆更新与收尾 ----------
export interface PartyNewMemory {
  id: string
  type: string
  typeBadge: 'info' | 'success' | 'warning' | 'danger' | 'muted'
  content: string
  origin: string
}

export const partyNewMemories: PartyNewMemory[] = [
  { id: 'nm-1', type: '程序记忆', typeBadge: 'info', content: '关键信息必须多系统交叉验证', origin: '用户口述 · 2026-09-15' },
  { id: 'nm-2', type: '情景记忆', typeBadge: 'warning', content: '局党组会领导高度关注政务信息系统管理，每次会要听进展', origin: '第12次党组会 · 会议记录 00:42:15' },
  { id: 'nm-3', type: '语义记忆', typeBadge: 'success', content: '政务算力建设已完成验收，说明公文待回补', origin: '督办系统 + OA系统交叉结论' },
  { id: 'nm-4', type: '前瞻记忆', typeBadge: 'danger', content: '第13次党组会后需向会议纪要系统提交纪要（09-19前）', origin: '会前准备任务收尾生成' },
]

export interface PartyMemoryType {
  type: string
  userLabel: string
  example: string
  count: number
  delta: number
  items: string[]
}

export const partyMemoryTypes: PartyMemoryType[] = [
  { type: '工作记忆', userLabel: '当前事项状态', example: '现在做到哪一步、还缺什么', count: 2, delta: 0, items: ['党组会准备任务已收尾', '纪要提交待办（09-19前）'] },
  { type: '语义记忆', userLabel: '有效口径与规则', example: '最新政策、指标定义、业务术语', count: 4, delta: 1, items: ['政务算力建设验收结论（新）', '政务数据开放目录季度更新口径', '数据出域审批要求', '一件事服务标准'] },
  { type: '程序记忆', userLabel: '办理方法', example: '已验证的步骤、Skill、异常处理', count: 3, delta: 1, items: ['多系统交叉验证标准（新 · 用户口述）', '党组会会前准备流程', '冲突数据协调流程'] },
  { type: '情景记忆', userLabel: '历史会议与案例', example: '上次怎么决定、发生过什么', count: 2, delta: 1, items: ['第12次党组会领导关注信息系统管理（新）', '第11次党组会前准备案例'] },
  { type: '前瞻记忆', userLabel: '待办与承诺', example: '谁在何时前完成什么', count: 3, delta: 1, items: ['09-19前提交第13次会议纪要（新）', '09-17前政务算力建设说明回补', '09-17 18:00前处室汇报材料汇总'] },
  { type: '组织记忆', userLabel: '职责与权限', example: '谁主办、谁协办、谁确认', count: 2, delta: 0, items: ['办公室牵头党组会办理', '数字基础设施处主办算力建设'] },
]

export const partyFollowUpTodo = {
  title: '向会议纪要系统提交本次党组会纪要',
  owner: '陈静 · 政数局办公室',
  due: '2026-09-19',
  note: '提交后系统将自动生成跟踪与督办任务，为下次会议做准备',
}

// ---------- P7 AI执行说明与回放 ----------
export const partyAiExecutionCards = {
  why: {
    title: '为什么这样做',
    items: [
      { label: '目标', value: '完成局党组第13次会议全部会前准备工作' },
      { label: '适用规则', value: '党组会会前准备流程 V1.2 · 权限档位「逐项确认」' },
      { label: '办理程序', value: '计划确认 → 分项执行 → 缺口请示 → 交叉验证 → 材料生成' },
    ],
  },
  used: {
    title: 'AI用了什么',
    items: [
      { label: '数据源', value: '会议系统、任务跟踪、OA系统、督办系统、CODES（经授权）' },
      { label: '会议情景', value: '第12次党组会领导发言与决议（含原文锚点）' },
      { label: '历史案例', value: '第11/12次党组会会前准备（分项任务经验）' },
      { label: 'Skill', value: '党组会会前准备 V1.2' },
      { label: '模型', value: '轻量（抽取）+ 通用（汇总）+ 强推理（缺口判断）' },
    ],
  },
  did: {
    title: 'AI做了什么',
    items: [
      { label: '查询', value: '5项上次任务核验、6处室议题征集、6项督办清单' },
      { label: '比较', value: '督办「已完成」vs OA「无公文」交叉验证，发现凭证缺口' },
      { label: '生成', value: '会前材料3份 + 会议通知1份 + 纪要提交待办' },
      { label: '请示', value: '2项缺口均生成请示卡，经用户明确允许后执行' },
    ],
  },
  controlled: {
    title: '哪里受到了管控',
    items: [
      { label: '授权', value: 'CODES访问经用户明确允许，任务结束自动回收' },
      { label: '审批', value: 'OA提醒发送经用户确认，留痕可查' },
      { label: '脱敏', value: '处室联系人信息自动脱敏，仅保留处室名' },
      { label: '边界', value: '不代替用户决策，写操作全部需人工确认' },
    ],
  },
  trustworthy: {
    title: '结果是否可信',
    items: [
      { label: '证据覆盖', value: '每项结论标注来源系统，可回查原始记录' },
      { label: '冲突', value: '1项督办状态与OA公文缺失已标记并请示' },
      { label: '待确认', value: '2项请示均由用户拍板（CODES授权、OA提醒）' },
      { label: '记忆', value: '4条新记忆经用户确认后学习记录' },
    ],
  },
}

export const partyTokenUsage = {
  taskId: 'TASK-PARTY-001',
  traceId: 'TRACE-20260915-1030-0001',
  budget: 20000,
  steps: [
    { step: '上下文获取与压缩', input: 9800, cached: 5400, reasoning: 0, output: 0, tool: 0 },
    { step: '记忆检索（情景/程序）', input: 3200, cached: 1800, reasoning: 0, output: 0, tool: 0 },
    { step: '计划生成与确认', input: 2400, cached: 0, reasoning: 300, output: 560, tool: 0 },
    { step: 'T1 会议系统+任务跟踪查询', input: 1600, cached: 0, reasoning: 0, output: 0, tool: 420 },
    { step: 'T2 OA议题检索', input: 1200, cached: 0, reasoning: 0, output: 0, tool: 260 },
    { step: 'T3 督办清单读取', input: 1400, cached: 0, reasoning: 0, output: 0, tool: 300 },
    { step: '交叉验证与缺口检测', input: 2800, cached: 0, reasoning: 600, output: 380, tool: 0 },
    { step: 'CODES详情获取（授权后）', input: 1800, cached: 0, reasoning: 0, output: 0, tool: 480 },
    { step: 'OA提醒发送（审批后）', input: 600, cached: 0, reasoning: 0, output: 0, tool: 120 },
    { step: '材料与通知生成', input: 3600, cached: 0, reasoning: 400, output: 2200, tool: 0 },
  ],
  savings: [
    { type: '模型路由节省', baseline: 18600, actual: 14200, overhead: 600, saved: 3800 },
    { type: '缓存节省', baseline: 12600, actual: 2200, overhead: 200, saved: 10200 },
    { type: '上下文节省', baseline: 14200, actual: 9800, overhead: 400, saved: 4000 },
    { type: '循环控制节省', baseline: 6200, actual: 0, overhead: 0, saved: 6200 },
  ],
}

export const partyModelRouting = [
  { name: '轻量模型', percentage: 46, used: '信息抽取、文档检索' },
  { name: '通用模型', percentage: 41, used: '材料汇总、通知起草' },
  { name: '强推理模型', percentage: 13, used: '交叉验证、缺口判断' },
]

// ---------- P8 本体关系 ----------
export const partyOntologyObjects = [
  { id: 'po-1', name: '局党组第13次会议', type: '核心对象', count: 1 },
  { id: 'po-2', name: '局党组第12次会议', type: '核心对象', count: 1 },
  { id: 'po-3', name: '政务信息系统管理专项检查', type: '核心对象', count: 1 },
  { id: 'po-4', name: '政务算力建设', type: '核心对象', count: 1 },
  { id: 'po-5', name: '深圳市一体化数字资源管理系统（CODES）', type: '技术对象', count: 1 },
  { id: 'po-6', name: '数字基础设施处', type: '组织对象', count: 1 },
  { id: 'po-7', name: '数据资源处等5个处室', type: '组织对象', count: 5 },
  { id: 'po-8', name: '会前材料（3份）', type: '证据对象', count: 3 },
  { id: 'po-9', name: '会议通知（粤政易）', type: '证据对象', count: 1 },
  { id: 'po-10', name: '新学习记忆（4条）', type: '记忆对象', count: 4 },
  { id: 'po-11', name: '会议纪要（待提交）', type: '记忆对象', count: 1 },
]

export const partyOntologyRelations = [
  { from: '局党组第13次会议', to: '局党组第12次会议', relation: 'followsTasksOf', type: '已确认', count: 5 },
  { from: '政务信息系统管理专项检查', to: '深圳市一体化数字资源管理系统（CODES）', relation: 'dependsOn', type: '已确认', count: 1 },
  { from: '政务算力建设', to: '会前材料（3份）', relation: 'reportedIn', type: '已确认', count: 1 },
  { from: '政务算力建设', to: '数字基础设施处', relation: 'ownedBy', type: '已确认', count: 1 },
  { from: '督办状态（已完成）', to: 'OA公文（未找到）', relation: 'conflictsWith', type: '已确认', count: 1 },
  { from: '会前材料（3份）', to: '分项任务（T1/T2/T3）', relation: 'generatedBy', type: '已确认', count: 3 },
  { from: '会议通知（粤政易）', to: '局党组第13次会议', relation: 'announces', type: '已确认', count: 1 },
  { from: '局党组第13次会议', to: '会议纪要（待提交）', relation: 'requiresMinutes', type: '待确认', count: 1 },
  { from: '情景记忆（领导关注）', to: 'CODES授权请示', relation: 'triggers', type: '已确认', count: 1 },
  { from: '新学习记忆（4条）', to: '会前准备任务', relation: 'learnedFrom', type: 'AI推断', count: 4 },
  { from: '数字基础设施处', to: '数据资源处等5个处室', relation: 'submitsAgendaTo', type: '已确认', count: 5 },
]

export const partyImpactChain = {
  question: '如果数字基础设施处一直没有回补《政务算力建设情况说明》，会影响哪些工作？',
  chain: [
    { node: '政务算力建设', type: 'origin', detail: '督办状态：已完成' },
    { node: '督办状态 vs OA公文', type: 'dependency', detail: '已完成但无支撑公文' },
    { node: 'OA提醒（已发送）', type: 'action', detail: '数字基础设施处 · 09-17前回补' },
    { node: '第13次会议汇报', type: 'dependent', detail: '会前材料 09-18' },
    { node: '会议汇报口径', type: 'impact-high', detail: '「已完成」缺少公文佐证' },
    { node: '督办任务闭环', type: 'impact-medium', detail: '缺正式收文凭证' },
    { node: '处室考核记录', type: 'impact-medium', detail: '影响数字基础设施处督办闭环评价' },
  ],
  impactTable: [
    { object: '第13次党组会汇报', relation: '材料缺公文佐证', level: '高', suggestion: '会前线下催报，会议现场口头说明进展' },
    { object: '督办任务闭环', relation: '缺正式收文凭证', level: '中', suggestion: '提醒处室09-17前回补并归档' },
    { object: '处室督办考核', relation: '影响数字基础设施处记录', level: '中', suggestion: '回补后撤销缺口标记，不影响考核' },
  ],
}
