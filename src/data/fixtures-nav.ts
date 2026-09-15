// ==============================================================
// 新导航相关演示数据（待办/事项/记忆/能力/连接/自动化）
// 全部为演示样例：时间锚定 2026-09-15 前后，不指向任何真实数据
// ==============================================================

// ---------- 技能（专业能力） ----------
export interface Skill {
  id: string
  name: string
  version: string
  purpose: string
  callsThisMonth: number
  status: string
}

export const skills: Skill[] = [
  { id: 'sk-1', name: '党组会会前准备', version: 'V1.2', purpose: '按流程完成议题征集、任务核查与材料汇编', callsThisMonth: 6, status: '已启用' },
  { id: 'sk-2', name: '会议决议转督办', version: 'V1.1', purpose: '将会议决议拆解为督办任务并分派处室', callsThisMonth: 11, status: '已启用' },
  { id: 'sk-3', name: '议题材料汇编', version: 'V1.0', purpose: '汇总各处室议题形成会议材料包', callsThisMonth: 9, status: '已启用' },
  { id: 'sk-4', name: '督办台账生成', version: 'V1.3', purpose: '按月生成督办任务执行台账', callsThisMonth: 4, status: '已启用' },
  { id: 'sk-5', name: '公文格式校对', version: 'V2.0', purpose: '核校公文格式与数据引用一致性', callsThisMonth: 15, status: '已启用' },
  { id: 'sk-6', name: '值班安排汇总', version: 'V1.0', purpose: '汇总各处室值班安排形成周表', callsThisMonth: 3, status: '已启用' },
]

// ---------- 专业智能体 ----------
export interface Agent {
  id: string
  name: string
  duty: string
  skillCount: number
  systems: string
  status: string
  featured?: boolean
}

export const agents: Agent[] = [
  { id: 'ag-1', name: '办会智能体', duty: '会议全流程办理：会前准备、会中支撑、会后跟踪', skillCount: 3, systems: '会议系统 · OA系统 · 粤政易', status: '运行中', featured: true },
  { id: 'ag-2', name: '督办跟进智能体', duty: '督办任务跟踪、逾期提醒、台账汇总', skillCount: 2, systems: '督办系统 · OA系统', status: '运行中' },
  { id: 'ag-3', name: '政策解读智能体', duty: '上级政策文件解读与要点提炼', skillCount: 1, systems: 'OA系统', status: '运行中' },
  { id: 'ag-4', name: '公文起草智能体', duty: '请示、通知、汇报等公文起草', skillCount: 2, systems: 'OA系统', status: '运行中' },
]

// ---------- 系统连接（MCP） ----------
export interface ConnectorTool {
  name: string
  purpose: string
}

export interface SystemConnector {
  id: string
  name: string
  mode: string
  status: string
  tools: ConnectorTool[]
  callsThisMonth: number
  lastCall: string
}

export const systemConnectors: SystemConnector[] = [
  {
    id: 'sc-1', name: '会议系统', mode: '只读', status: '已连接',
    tools: [
      { name: 'task.query', purpose: '查询会议任务清单' },
      { name: 'meeting.info', purpose: '读取会议安排' },
    ],
    callsThisMonth: 42, lastCall: '09-15 10:31',
  },
  {
    id: 'sc-2', name: 'OA系统', mode: '只读 · 受控写', status: '已连接',
    tools: [
      { name: 'doc.search', purpose: '检索公文与议题' },
      { name: 'doc.match', purpose: '比对提交情况' },
      { name: 'notify.send', purpose: '发送提醒（写 · 需确认）' },
    ],
    callsThisMonth: 87, lastCall: '09-15 10:47',
  },
  {
    id: 'sc-3', name: '督办系统', mode: '只读', status: '已连接',
    tools: [
      { name: 'supervision.list', purpose: '查询督办任务清单' },
      { name: 'desc.check', purpose: '校验进度描述完整性' },
    ],
    callsThisMonth: 35, lastCall: '09-15 10:36',
  },
  {
    id: 'sc-4', name: '深圳市一体化数字资源管理系统（CODES）', mode: '按需 · 须逐次授权', status: '鉴权正常',
    tools: [
      { name: 'project.detail', purpose: '获取项目详情（需授权）' },
    ],
    callsThisMonth: 6, lastCall: '09-15 10:52',
  },
  {
    id: 'sc-5', name: '粤政易', mode: '受控写 · 需确认', status: '已连接',
    tools: [
      { name: 'notice.publish', purpose: '发布会议通知（写 · 需确认）' },
    ],
    callsThisMonth: 12, lastCall: '09-12 16:20',
  },
  {
    id: 'sc-6', name: '会议纪要系统', mode: '只读 · 受控写', status: '已连接',
    tools: [
      { name: 'minutes.read', purpose: '读取历史会议纪要' },
      { name: 'minutes.submit', purpose: '提交纪要（写 · 需确认）' },
    ],
    callsThisMonth: 8, lastCall: '09-08 15:02',
  },
]

// ---------- 自动化（定时任务） ----------
export interface AutomationItem {
  id: string
  name: string
  schedule: string
  action: string
  lastRun: string
  enabled: boolean
  story?: boolean
}

export const automations: AutomationItem[] = [
  { id: 'au-1', name: '每周待办摘要', schedule: '每周一 08:00', action: '汇总本周待办与会议安排，发送至粤政易工作群', lastRun: '09-14 08:00 · 成功', enabled: true },
  { id: 'au-2', name: '上月督办台账汇总', schedule: '每月 1 日 09:00', action: '汇总上月督办任务执行情况，生成台账材料', lastRun: '09-01 09:00 · 成功', enabled: true },
  { id: 'au-3', name: '今日到期任务检查', schedule: '每日 17:30', action: '检查今日到期任务，向经办人发送粤政易提醒', lastRun: '09-14 17:30 · 成功', enabled: true },
  { id: 'au-4', name: '党组会前自动准备', schedule: '党组会前 3 天 09:00', action: '自动发起会前准备任务，按流程征集议题与核查任务', lastRun: '09-15 09:00 · 进行中', enabled: true, story: true },
]

// ---------- 自进化提炼记忆 ----------
export interface SelfEvolvedMemory {
  id: string
  type: string
  content: string
  origin: string
  time: string
}

export const selfEvolvedMemories: SelfEvolvedMemory[] = [
  { id: 'se-1', type: '程序记忆', content: '党组会会前材料需提前 3 天完成汇总，为领导预留审阅时间', origin: '经验池 · 自进化 · 已审核', time: '09-12' },
  { id: 'se-2', type: '语义记忆', content: '各处室议题提交截止时间设为会前 1 天 18:00 最优', origin: '经验池 · 自进化 · 已审核', time: '09-10' },
  { id: 'se-3', type: '程序记忆', content: '督办汇报材料优先引用任务跟踪系统状态作为基准口径', origin: '经验池 · 自进化 · 已审核', time: '09-08' },
]

// ---------- 事项中心 ----------
export interface MatterSummary {
  id: string
  title: string
  category: '办文' | '办会' | '办事' | '专业事项'
  level: '重要' | '常规'
  completedAt: string
  desc: string
  materials: string[]
  outputs: string[]
  hasReplay: boolean
}

export const matterList: MatterSummary[] = [
  {
    id: 'm-001', title: '局党组第13次会议会前准备', category: '办会', level: '重要', completedAt: '09-15',
    desc: '按流程完成议题征集、上次任务核查、督办汇报，产出会前材料 3 份并发布会议通知',
    materials: ['议题清单.docx', '任务核查表.docx', '督办汇报.docx', '会议通知（粤政易）'],
    outputs: ['会前材料 3 份', '会议通知 1 份（已发布）', '新学习记忆 4 条'],
    hasReplay: true,
  },
  {
    id: 'm-002', title: '第12次党组会纪要整理与归档', category: '办会', level: '常规', completedAt: '09-08',
    desc: '整理第12次党组会录音与决议，形成会议纪要并归档至会议纪要系统',
    materials: ['第12次党组会纪要.docx'],
    outputs: ['会议纪要 1 份（已归档）', '决议跟踪任务 5 项'],
    hasReplay: false,
  },
  {
    id: 'm-003', title: '8月政务数据开放目录更新汇报', category: '专业事项', level: '重要', completedAt: '09-10',
    desc: '汇总8月政务数据开放目录更新情况，形成汇报材料',
    materials: ['目录更新说明.pdf'],
    outputs: ['汇报材料 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-004', title: '局网络安全检查周报汇总', category: '办事', level: '常规', completedAt: '09-11',
    desc: '汇总各处室网络安全检查情况，形成第37周周报',
    materials: ['安全周报W37.docx'],
    outputs: ['周报 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-005', title: '市政府办专项督查来文办理', category: '办文', level: '重要', completedAt: '09-12',
    desc: '办理市政府办转来的政务信息系统管理专项督查来文，形成转办意见',
    materials: ['转办意见.docx'],
    outputs: ['转办意见 1 份', '督办任务 1 项'],
    hasReplay: false,
  },
  {
    id: 'm-006', title: '《政务数据共享交换平台扩容方案》初审', category: '办文', level: '重要', completedAt: '09-09',
    desc: '对数据资源处报送的扩容方案进行初审，形成初审意见供党组会审议',
    materials: ['初审意见.docx'],
    outputs: ['初审意见 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-007', title: '全市政务算力建设情况汇总', category: '专业事项', level: '重要', completedAt: '09-07',
    desc: '汇总全市政务算力建设进展，形成专项材料',
    materials: ['算力建设情况.pdf'],
    outputs: ['专项材料 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-008', title: '处室值班安排周报汇总', category: '办事', level: '常规', completedAt: '09-14',
    desc: '汇总各处室本周值班安排，形成周表并分发',
    materials: ['值班周表.xlsx'],
    outputs: ['值班周表 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-009', title: '数字政府建设年度评估迎检安排', category: '办事', level: '重要', completedAt: '09-13',
    desc: '统筹各处室迎检准备工作，形成迎检任务清单',
    materials: ['迎检安排.docx'],
    outputs: ['迎检任务清单 1 份'],
    hasReplay: false,
  },
  {
    id: 'm-010', title: '政务数据共享政策要点解读', category: '专业事项', level: '常规', completedAt: '09-05',
    desc: '解读上级数据共享最新政策，形成要点摘编供各处室参考',
    materials: ['政策要点摘编.docx'],
    outputs: ['要点摘编 1 份'],
    hasReplay: false,
  },
]
