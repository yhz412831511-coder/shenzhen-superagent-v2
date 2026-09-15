import { modelCatalog } from '../data/fixtures-party'
import { getStoryState } from './story-state'

export function taskRoutingLine(): string {
  const choice = getStoryState().modelChoice ?? 'auto'
  if (choice === 'auto') {
    return '任务级路由：智能模式 · 四级调度（L0-L3 按步骤复杂度）'
  }
  const m = modelCatalog.find((x) => x.id === choice)
  return `任务级路由：固定 ${m ? m.name : choice} · 不静默切换`
}

export function modelNameOf(choice: string): string {
  if (choice === 'auto') return '智能模式'
  const m = modelCatalog.find((x) => x.id === choice)
  return m ? m.name : choice
}
