export type MatterStatus = 'active' | 'pending' | 'overdue' | 'completed'
export type DecisionStatus = 'draft' | 'confirmed' | 'superseded'
export type TaskStatus = 'not_started' | 'in_progress' | 'waiting' | 'completed' | 'overdue' | 'blocked'

export interface Matter {
  id: string
  title: string
  type: string
  status: MatterStatus
  participants: string[]
  createdAt: string
  updatedAt: string
  progress: number
  pendingConfirmations: number
  dueDate: string
  description: string
  relatedMeetings: string[]
  relatedTasks: string[]
  tokenBudget: number
  tokenUsed: number
}

export interface Meeting {
  id: string
  matterId: string
  title: string
  date: string
  time: string
  location: string
  participants: string[]
  agenda: string[]
  source: string
  decisions: Decision[]
  actionItems: ActionItem[]
  disagreements: string[]
  status: string
}

export interface Decision {
  id: string
  content: string
  source: string
  responsibleUnit: string
  collaboratorUnits: string[]
  deadline: string
  dependencies: string[]
  deliverables: string
  successCriteria: string
  status: DecisionStatus
  conflictWith?: string
}

export interface ActionItem {
  id: string
  content: string
  responsiblePerson?: string
  responsibleUnit?: string
  deadline?: string
  status: string
  unclear?: boolean
}

export interface Task {
  id: string
  matterId: string
  title: string
  assignee: string
  assigneeUnit: string
  status: TaskStatus
  priority: string
  createdAt: string
  dueDate: string
  progress: number
  description: string
  relatedSystem: string
  writeBackPreview?: string
  confirmedBy?: string
  confirmedAt?: string
}

export const matters: Matter[] = [
  {
    id: 'MATTER-2026-0912',
    title: '重点任务专题调度会',
    type: '会议督办',
    status: 'active',
    participants: ['政数局', '人社局', '住建局', '发改委'],
    createdAt: '2026-08-12',
    updatedAt: '2026-09-14',
    progress: 65,
    pendingConfirmations: 3,
    dueDate: '2026-09-30',
    description: '重点任务专题调度会，涉及政务服务一件事上线、老系统AI改造、项目数据口径协调三个跨部门事项',
    relatedMeetings: ['MTG-20260812-01', 'MTG-20260825-01', 'MTG-20260910-01'],
    relatedTasks: ['TASK-20260910-0086', 'TASK-20260910-0087', 'TASK-20260910-0088'],
    tokenBudget: 18000,
    tokenUsed: 14880,
  },
  {
    id: 'MATTER-2026-0820',
    title: '省级专项督查报送',
    type: '来文办理',
    status: 'active',
    participants: ['政数局', '各区数据局'],
    createdAt: '2026-08-20',
    updatedAt: '2026-09-14',
    progress: 71,
    pendingConfirmations: 1,
    dueDate: '2026-09-15',
    description: '省级专项督查报送，已收集5/7个部门反馈，明日17:00截止',
    relatedMeetings: [],
    relatedTasks: ['TASK-20260912-0102'],
    tokenBudget: 12000,
    tokenUsed: 8400,
  },
  {
    id: 'MATTER-2026-0901',
    title: '老系统AI改造试点',
    type: '项目督办',
    status: 'active',
    participants: ['政数局', '住建局', '系统承建方'],
    createdAt: '2026-09-01',
    updatedAt: '2026-09-14',
    progress: 40,
    pendingConfirmations: 1,
    dueDate: '2026-09-30',
    description: '老旧业务系统完成AI改造试点，MCP接口测试通过，1个写操作待审批',
    relatedMeetings: ['MTG-20260903-01'],
    relatedTasks: ['TASK-20260910-0090'],
    tokenBudget: 15000,
    tokenUsed: 6200,
  },
]

export const meetings: Meeting[] = [
  {
    id: 'MTG-20260812-01',
    matterId: 'MATTER-2026-0912',
    title: '重点任务专题调度会（第一次）',
    date: '2026-08-12',
    time: '14:00',
    location: '市政府会议室',
    participants: ['张副市长', '政数局', '人社局', '住建局', '发改委'],
    agenda: ['政务服务一件事上线计划', '老系统改造方向', '项目数据口径初步讨论'],
    source: '正式纪要',
    decisions: [],
    actionItems: [],
    disagreements: ['数据口径暂未统一'],
    status: 'archived',
  },
  {
    id: 'MTG-20260825-01',
    matterId: 'MATTER-2026-0912',
    title: '重点任务专题调度会（第二次）',
    date: '2026-08-25',
    time: '14:00',
    location: '市政府会议室',
    participants: ['张副市长', '政数局', '人社局', '住建局'],
    agenda: ['一件事上线进度', '确定老系统改造试点范围', '数据口径协调'],
    source: '正式纪要',
    decisions: [],
    actionItems: [],
    disagreements: [],
    status: 'archived',
  },
  {
    id: 'MTG-20260910-01',
    matterId: 'MATTER-2026-0912',
    title: '重点任务专题调度会（第三次）',
    date: '2026-09-10',
    time: '14:00',
    location: '市政府会议室',
    participants: ['张副市长（主持）', '政数局王局', '人社局李处', '住建局赵处', '发改委钱处'],
    agenda: ['一件事上线联调情况', '老系统改造接口进展', '项目数据口径冲突协调'],
    source: '录音转写+正式纪要',
    decisions: [
      {
        id: 'DEC-001',
        content: '9月底前完成老系统项目查询能力的AI接入试点',
        source: '会议记录 00:37:12—00:38:05',
        responsibleUnit: '市政数局',
        collaboratorUnits: ['项目主管部门', '系统承建方'],
        deadline: '2026-09-30',
        dependencies: ['开通只读查询账号', '完成接口安全评审'],
        deliverables: '3个可用MCP工具、接入测试报告',
        successCriteria: '查询成功率、权限继承、日志完整率',
        status: 'confirmed',
      },
      {
        id: 'DEC-002',
        content: '政务服务一件事于9月25日前完成联调上线',
        source: '会议记录 00:15:30—00:17:00',
        responsibleUnit: '市政数局',
        collaboratorUnits: ['人社局', '住建局'],
        deadline: '2026-09-25',
        dependencies: ['老系统查询接口可用'],
        deliverables: '一件事线上服务入口',
        successCriteria: '端到端测试通过、用户可办',
        status: 'confirmed',
      },
      {
        id: 'DEC-003',
        content: '项目数据口径以项目系统审核数据为准，会议纪要中的85%为历史快照',
        source: '会议记录 00:52:00—00:54:30',
        responsibleUnit: '住建局',
        collaboratorUnits: ['政数局'],
        deadline: '2026-09-14',
        dependencies: ['住建局确认72%数据'],
        deliverables: '统一口径确认单',
        successCriteria: '双方确认签字',
        status: 'draft',
        conflictWith: '上次会议纪要85%完成率',
      },
    ],
    actionItems: [
      { id: 'AI-001', content: '完成老系统只读查询账号开通', responsibleUnit: '住建局', deadline: '2026-09-18', status: 'in_progress' },
      { id: 'AI-002', content: '接口安全评审报告', responsibleUnit: '政数局', deadline: '2026-09-20', status: 'not_started' },
      { id: 'AI-003', content: '一件事联调方案', responsibleUnit: '政数局', deadline: '2026-09-22', status: 'in_progress' },
      { id: 'AI-004', content: '确认项目72%数据口径', responsibleUnit: '住建局', deadline: '2026-09-14', status: 'waiting', unclear: false },
      { id: 'AI-005', content: '提交试点延期审批', responsiblePerson: undefined, deadline: undefined, status: 'draft', unclear: true },
      { id: 'AI-006', content: '形成督办任务清单', responsibleUnit: '政数局', deadline: '2026-09-15', status: 'not_started' },
    ],
    disagreements: [
      '会议纪要记载完成率85%，但项目系统中最新审核数据为72%，存在口径冲突',
    ],
    status: 'confirmed',
  },
]

export const tasks: Task[] = [
  {
    id: 'TASK-20260910-0086',
    matterId: 'MATTER-2026-0912',
    title: '核验上次会议决议并形成本次督办建议',
    assignee: '会议督办Agent@2.1',
    assigneeUnit: '政数局',
    status: 'in_progress',
    priority: '高',
    createdAt: '2026-09-14 09:20',
    dueDate: '2026-09-14 12:00',
    progress: 60,
    description: 'AI Agent核验8月12日和8月25日会议决议执行情况，从项目系统读取最新进度，形成本次督办建议清单',
    relatedSystem: '项目台账系统(MCP)',
    writeBackPreview: '拟在督办系统创建6项子任务，写入OA会议纪要和办理意见',
    confirmedBy: '李明',
    confirmedAt: '2026-09-14 09:25',
  },
  {
    id: 'TASK-20260910-0087',
    matterId: 'MATTER-2026-0912',
    title: '一件事上线联调测试',
    assignee: '政务服务Agent@1.5',
    assigneeUnit: '政数局',
    status: 'in_progress',
    priority: '高',
    createdAt: '2026-09-12',
    dueDate: '2026-09-22',
    progress: 45,
    description: '政务服务一件事跨部门联调，验证端到端办理流程',
    relatedSystem: 'OA系统',
  },
  {
    id: 'TASK-20260910-0088',
    matterId: 'MATTER-2026-0912',
    title: '项目数据口径冲突协调',
    assignee: '李明',
    assigneeUnit: '政数局',
    status: 'waiting',
    priority: '高',
    createdAt: '2026-09-10',
    dueDate: '2026-09-14',
    progress: 30,
    description: '会议纪要85% vs 系统数据72%口径冲突，需住建局确认',
    relatedSystem: '项目台账系统(MCP)',
  },
  {
    id: 'TASK-20260910-0090',
    matterId: 'MATTER-2026-0901',
    title: '老系统MCP接口测试',
    assignee: '系统改造Agent@1.2',
    assigneeUnit: '住建局',
    status: 'completed',
    priority: '中',
    createdAt: '2026-09-08',
    dueDate: '2026-09-13',
    progress: 100,
    description: '测试3个MCP工具：query_project、get_project_progress、submit_progress_draft',
    relatedSystem: '项目台账系统(MCP)',
    confirmedBy: '赵处',
    confirmedAt: '2026-09-13 16:30',
  },
  {
    id: 'TASK-20260912-0102',
    matterId: 'MATTER-2026-0820',
    title: '收集7个部门督查反馈',
    assignee: '督查报送Agent@1.0',
    assigneeUnit: '政数局',
    status: 'in_progress',
    priority: '高',
    createdAt: '2026-09-12',
    dueDate: '2026-09-15 17:00',
    progress: 71,
    description: '已收集5/7个部门反馈，剩余2个部门未回复',
    relatedSystem: 'OA系统',
  },
  {
    id: 'TASK-20260910-0091',
    matterId: 'MATTER-2026-0912',
    title: '会前决策包生成',
    assignee: '会议督办Agent@2.1',
    assigneeUnit: '政数局',
    status: 'completed',
    priority: '高',
    createdAt: '2026-09-14 08:00',
    dueDate: '2026-09-14 09:00',
    progress: 100,
    description: '汇总上次决议状态、未完成任务、系统最新数据、冲突项',
    relatedSystem: '多系统汇总',
  },
]

export const ontologyObjects = [
  { id: 'OBJ-matter', name: '事项', type: '核心对象', count: 3 },
  { id: 'OBJ-meeting', name: '会议', type: '核心对象', count: 3 },
  { id: 'OBJ-decision', name: '决议', type: '核心对象', count: 8 },
  { id: 'OBJ-task', name: '任务', type: '核心对象', count: 6 },
  { id: 'OBJ-department', name: '部门', type: '组织对象', count: 5 },
  { id: 'OBJ-policy', name: '政策', type: '规则对象', count: 3 },
  { id: 'OBJ-system', name: '系统', type: '技术对象', count: 4 },
  { id: 'OBJ-agent', name: 'Agent', type: '能力对象', count: 5 },
  { id: 'OBJ-skill', name: 'Skill', type: '能力对象', count: 4 },
  { id: 'OBJ-memory', name: '记忆', type: '记忆对象', count: 6 },
  { id: 'OBJ-evidence', name: '证据', type: '证据对象', count: 12 },
  { id: 'OBJ-token', name: 'Token消耗', type: '计量对象', count: 100 },
]

export const ontologyRelations = [
  { from: '会议', to: '事项', relation: 'discussedAt', type: '已确认', count: 3 },
  { from: '会议', to: '决议', relation: 'decidedAt', type: '已确认', count: 8 },
  { from: '决议', to: '任务', relation: 'decomposesTo', type: '已确认', count: 6 },
  { from: '任务', to: '部门', relation: 'assignedTo', type: '已确认', count: 6 },
  { from: '任务', to: '任务', relation: 'dependsOn', type: '已确认', count: 2 },
  { from: '事项', to: '政策', relation: 'governedBy', type: '已确认', count: 3 },
  { from: '新口径', to: '旧口径', relation: 'supersedes', type: '待确认', count: 1 },
  { from: '85%快照', to: '72%系统数据', relation: 'conflictsWith', type: '已确认', count: 1 },
  { from: '结果', to: '任务', relation: 'generatedBy', type: '已确认', count: 6 },
  { from: '任务', to: '业务系统', relation: 'writtenBackTo', type: '已确认', count: 4 },
  { from: '经验', to: 'Skill', relation: 'reusedBy', type: 'AI推断', count: 2 },
  { from: '数据', to: '职责', relation: 'accessibleTo', type: '已确认', count: 8 },
]

export const impactChain = {
  question: '老系统改造试点如果延期两周，会影响哪些工作和会议决策？',
  chain: [
    { node: '老系统改造任务', type: 'origin', detail: 'TASK-20260910-0090' },
    { node: '依赖：只读账号开通', type: 'dependency', detail: 'AI-001 住建局 9月18日' },
    { node: '依赖：接口安全评审', type: 'dependency', detail: 'AI-002 政数局 9月20日' },
    { node: '被依赖：一件事上线', type: 'dependent', detail: 'DEC-002 9月25日联调' },
    { node: '对应会议决议', type: 'decision', detail: 'DEC-001 9月10日会议' },
    { node: '影响：9月底验收节点', type: 'impact-high', detail: '需提交延期审批' },
    { node: '影响：两部门承诺', type: 'impact-medium', detail: '住建局+政数局' },
    { node: '影响：上报指标', type: 'impact-medium', detail: '试点完成率取数依赖' },
  ],
  impactTable: [
    { object: '一件事上线联调', relation: '依赖查询接口', level: '高', suggestion: '先发布只读接口，写接口后移' },
    { object: '9月底验收', relation: '决议规定截止时间', level: '高', suggestion: '提交延期审批或缩小试点范围' },
    { object: '两部门承诺', relation: '任务分派关系', level: '中', suggestion: '重排协同时间并通知责任人' },
    { object: '上报指标', relation: '指标取数依赖', level: '中', suggestion: '标注统计口径和缺口' },
  ],
}

export const tokenUsage = {
  cityBudget: 1231000000,
  cityUsed: 842000000,
  cityBaseline: 1035000000,
  monthSavedYi: 1.93,
  monthSavedCost: '¥5.8 万',
  departments: [
    { name: '政数局', budget: 344000000, used: 236000000, percentage: 28, tasks: 480, matters: 42 },
    { name: '人社局', used: 135000000, percentage: 16, tasks: 280, matters: 18 },
    { name: '住建局', used: 93000000, percentage: 11, tasks: 195, matters: 12 },
    { name: '发改委', used: 59000000, percentage: 7, tasks: 130, matters: 8 },
    { name: '其他部门', used: 319000000, percentage: 38, tasks: 520, matters: 30 },
  ],
  models: [
    { name: '轻量模型', percentage: 48, tokens: 404000000 },
    { name: '通用模型', percentage: 37, tokens: 312000000 },
    { name: '强推理模型', percentage: 15, tokens: 126000000 },
  ],
  resultAttribution: [
    { name: '成功任务', percentage: 86, color: 'success' },
    { name: '人工中止', percentage: 5, color: 'warning' },
    { name: '重试', percentage: 6, color: 'warning' },
    { name: '无效消耗', percentage: 3, color: 'danger' },
  ],
  taskBreakdown: {
    taskId: 'TASK-20260910-0086',
    steps: [
      { step: '上下文获取与压缩', input: 12400, cached: 8200, reasoning: 0, output: 0, tool: 0 },
      { step: '历史结果/前缀缓存复用', input: 0, cached: 6000, reasoning: 0, output: 0, tool: 0 },
      { step: '模型路由-轻量抽取', input: 4200, cached: 0, reasoning: 300, output: 680, tool: 0 },
      { step: '本体合并与冲突检测', input: 2800, cached: 0, reasoning: 200, output: 400, tool: 120 },
      { step: '强模型-冲突判断', input: 1800, cached: 0, reasoning: 400, output: 280, tool: 0 },
      { step: '工具调用-MCP查询', input: 600, cached: 0, reasoning: 0, output: 0, tool: 300 },
      { step: '结果校验与任务生成', input: 0, cached: 0, reasoning: 0, output: 0, tool: 0 },
    ],
  },
  savings: [
    { type: '缓存复用', baseline: 286000000, actual: 205000000, overhead: 0, saved: 81000000 },
    { type: '模型融合', baseline: 224000000, actual: 164000000, overhead: 0, saved: 60000000 },
    { type: '上下文压缩', baseline: 168000000, actual: 131000000, overhead: 0, saved: 37000000 },
    { type: '提示词调优', baseline: 79000000, actual: 64000000, overhead: 0, saved: 15000000 },
  ],
}

export const riskEvents = [
  {
    id: 'RISK-001',
    appName: '项目材料助手',
    department: '住建局',
    agent: 'project-agent@1.3',
    behavior: '批量导出项目台账数据',
    attempts: 12,
    blocked: 10,
    humanReview: 2,
    involvingData: '项目台账敏感字段',
    involvingTool: 'export_project',
    destination: '外部下载',
    impact: '潜在批量数据外泄',
    measure: '暂停批量导出权限',
    responsiblePerson: '赵处',
    status: '已处置',
  },
  {
    id: 'RISK-002',
    appName: '会议督办Agent',
    department: '政数局',
    agent: 'meeting-agent@2.1',
    behavior: '未确认决议直接写入督办系统',
    attempts: 3,
    blocked: 3,
    humanReview: 0,
    involvingData: '未确认决议草稿',
    involvingTool: 'supervision.write',
    destination: 'OA督办系统',
    impact: '未确认信息进入正式流程',
    measure: '增加预览审批步骤',
    responsiblePerson: '李明',
    status: '已修复',
  },
  {
    id: 'RISK-003',
    appName: '一件事服务Agent',
    department: '政数局',
    agent: 'service-agent@1.0',
    behavior: '跨部门数据组合推导个人敏感信息',
    attempts: 5,
    blocked: 4,
    humanReview: 1,
    involvingData: '社保+住建组合数据',
    involvingTool: 'data.combine',
    destination: '内部结果区',
    impact: '疑似违规推导',
    measure: '标记疑似违规推导，待数据主管确认',
    responsiblePerson: '安全运营组',
    status: '处置中',
  },
]

export const dataRiskFlow = {
  chain: [
    { step: '谁发起任务', value: '李明（政数局）→ 会议督办Agent@2.1' },
    { step: 'AI读取了哪些数据和记忆', value: '项目台账(住建)、会议情景(3次)、职责权限表、政策条款' },
    { step: '组合后推导了什么', value: '项目完成率72%与会议85%冲突，推导涉及住建局考核' },
    { step: '准备通过哪个工具传给哪里', value: 'export_project → 外部下载' },
    { step: '命中什么规则', value: '批量导出敏感数据规则（B级）' },
    { step: '脱敏/提醒/审批/阻断', value: '阻断批量导出，转为人工确认' },
    { step: '结果是否离开受控边界', value: '否，数据保留在政务域内' },
  ],
}

export const experiences = [
  {
    id: 'EXP-001',
    trigger: '会议纪要中责任人或日期表述模糊',
    pattern: '会议决议转督办任务',
    sequence: ['提取', '对齐本体', '完整性检查', '人工确认', '写回'],
    outcome: 'success',
    samples: 12,
    failures: 3,
    confidence: 0.92,
    status: '已发布',
    version: 'V1.1',
    improvements: '增加责任人和日期完整性检查，模糊时发起确认而非自行补齐',
  },
  {
    id: 'EXP-002',
    trigger: '长纪要全文强模型分析成本高',
    pattern: '会议督办Agent工作流',
    sequence: ['轻量模型分段抽取', '本体合并', '完整性验证', '冲突交强模型', '人工确认', '一次写回'],
    outcome: 'success',
    samples: 100,
    failures: 8,
    confidence: 0.88,
    status: '试运行',
    version: 'V2.0',
    improvements: '轻量模型分段抽取替代全文强模型，降低Token 38%',
  },
]

export const skillVersions = {
  name: '会议决议转督办任务 Skill',
  current: {
    version: 'V1.0',
    steps: ['提取决议', '生成任务', '人工确认'],
    tokenPerTask: 100,
    errorCount: 6,
    humanOverride: 9,
    p95Latency: 52,
    recallRate: 94.0,
  },
  candidate: {
    version: 'V1.1',
    steps: ['提取决议', '对齐职责本体', '完整性检查', '模糊责任和日期发起确认', '生成任务', '写回前预览'],
    tokenPerTask: 62,
    errorCount: 1,
    humanOverride: 2,
    p95Latency: 38,
    recallRate: 94.5,
  },
  thresholds: {
    recallRate: '不低于 94.0%',
    errorCount: '不高于 2 次',
    humanOverride: '下降 50% 以上',
    tokenPerTask: '不高于 75%',
    p95Latency: '不高于 45 秒',
  },
  regressionSamples: 30,
  sourceCases: 12,
}

export const sdkApps = [
  { name: 'OA系统', unit: '全市各部门', env: '生产', sdk: 'Java 2.3.1', status: '活跃', sessions: 420, calls: 12480 },
  { name: '会议管理系统', unit: '市政府办', env: '生产', sdk: 'TypeScript 2.3.1', status: '活跃', sessions: 180, calls: 3200 },
  { name: '督查督办平台', unit: '政数局', env: '生产', sdk: 'Java 2.3.1', status: '活跃', sessions: 260, calls: 6800 },
  { name: '项目台账系统', unit: '住建局', env: '试运行', sdk: 'Python 2.2.6', status: '试运行', sessions: 45, calls: 320 },
  { name: '政务服务门户', unit: '政数局', env: '生产', sdk: 'TypeScript 2.3.1', status: '活跃', sessions: 343, calls: 8200 },
]

export const mcpTools = [
  { name: 'query_project', system: '项目台账系统', level: 'A', type: '只读', risk: '低', status: '已发布', description: '查询项目基本信息' },
  { name: 'get_project_progress', system: '项目台账系统', level: 'A', type: '只读', risk: '低', status: '已发布', description: '读取审核后的最新进度' },
  { name: 'submit_progress_draft', system: '项目台账系统', level: 'A', type: '写入', risk: '中', status: '试点', description: '提交进度草稿，需人工确认' },
  { name: 'oa_read_document', system: 'OA系统', level: 'A', type: '只读', risk: '低', status: '已发布', description: '读取来文/纪要' },
  { name: 'supervision_create_task', system: '督查督办平台', level: 'A', type: '写入', risk: '中', status: '已发布', description: '创建督办任务' },
  { name: 'policy_search', system: '政策数据库', level: 'B', type: '只读', risk: '低', status: '已发布', description: '政策条款检索' },
]

export const memoryTypes = [
  { type: '工作记忆', userLabel: '当前事项状态', example: '现在做到哪一步、还缺什么', count: 3, items: ['会议督办任务进度', '口径冲突待确认', '一件事联调45%'] },
  { type: '语义记忆', userLabel: '有效口径与规则', example: '最新政策、指标定义、业务术语', count: 8, items: ['数据出域审批要求', '项目完成率定义', '一件事服务标准'] },
  { type: '程序记忆', userLabel: '办理方法', example: '已验证的步骤、Skill、异常处理', count: 4, items: ['会议决议转督办Skill V1.1', '冲突数据协调流程', '联调测试步骤'] },
  { type: '情景记忆', userLabel: '历史会议与案例', example: '上次怎么决定、发生过什么', count: 3, items: ['8月12日首次调度会', '8月25日确定试点', '9月10日口径冲突'] },
  { type: '前瞻记忆', userLabel: '待办与承诺', example: '谁在何时前完成什么', count: 6, items: ['住建局9/18开通账号', '政数局9/20安全评审', '一件事9/25联调'] },
  { type: '组织记忆', userLabel: '职责与权限', example: '谁主办、谁协办、谁确认', count: 5, items: ['政数局主办一件事', '住建局负责台账', '安全运营审核外发'] },
]

export const aiExecutionCards = {
  why: {
    title: '为什么这样做',
    items: [
      { label: '目标', value: '核验上次会议决议并形成本次督办建议' },
      { label: '适用规则', value: '会议决议转督办Skill V1.1、数据出域审批要求' },
      { label: '办理程序', value: '提取→对齐本体→完整性检查→确认→写回预览' },
    ],
  },
  used: {
    title: 'AI用了什么',
    items: [
      { label: '数据源', value: '项目台账系统(MCP)、OA系统' },
      { label: '会议情景', value: '3次历史会议决议和承诺' },
      { label: '历史案例', value: '12次相似会议督办任务' },
      { label: 'Skill', value: '会议决议转督办 V1.1' },
      { label: '模型', value: '轻量模型(抽取) + 强推理模型(冲突判断)' },
    ],
  },
  did: {
    title: 'AI做了什么',
    items: [
      { label: '查询', value: '读取项目台账最新进度（72%）' },
      { label: '比较', value: '72% vs 会议纪要85%，发现冲突' },
      { label: '生成', value: '6项督办任务清单和建议议程' },
      { label: '检查', value: '1项责任人模糊、2项截止时间模糊' },
    ],
  },
  controlled: {
    title: '哪里受到了管控',
    items: [
      { label: '脱敏', value: '项目台账敏感字段已脱敏' },
      { label: '审批', value: '写回督办系统需人工预览确认' },
      { label: '阻断', value: '批量导出被阻断，仅允许只读查询' },
      { label: '降级', value: '长纪要从强模型降级为轻量分段抽取' },
    ],
  },
  trustworthy: {
    title: '结果是否可信',
    items: [
      { label: '证据覆盖', value: '每条决议有原文锚点和时间戳' },
      { label: '冲突', value: '1项口径冲突已标记并暂停' },
      { label: '待确认', value: '3项待人工确认（口径/责任/期限）' },
      { label: '版本', value: 'Skill V1.1，回归30/30通过' },
    ],
  },
}

export * from './fixtures-party'
export * from './fixtures-nav'
