// ==============================================================
// 任务线配置：所有预制任务的阶段轨道统一定义
// 专属任务页 /task/:taskId 为全平台唯一的任务下探界面
// （待办任务、事项中心均进入该页：进行中恢复当前环节，已完成只读回放）
// ==============================================================

export interface TaskStageDef {
  key: string
  label: string
  railHint: string
  path: (taskId: string) => string
}

export interface TaskFlowDef {
  taskId: string
  title: string
  stages: TaskStageDef[]
}

export const partyTaskFlow: TaskFlowDef = {
  taskId: 'TASK-PARTY-001',
  title: '局党组第13次会议会前准备',
  stages: [
    { key: 'launch', label: '任务发起', railHint: '发起对话', path: () => '/workbench' },
    { key: 'plan', label: '计划确认', railHint: '确认计划', path: (id) => `/task/${id}` },
    { key: 'exec', label: '执行过程', railHint: '白盒执行', path: (id) => `/task/${id}` },
    { key: 'confirm', label: '产物确认', railHint: '2项请示', path: (id) => `/task/${id}` },
    { key: 'output', label: '产出物', railHint: '材料与通知', path: (id) => `/task/${id}` },
    { key: 'memory', label: '记忆收尾', railHint: '学习与待办', path: (id) => `/task/${id}` },
  ],
}
