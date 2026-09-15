export interface PartyStoryState {
  subtaskAdded?: boolean
  caseAAllowed?: boolean
  caseBSent?: boolean
  noticePublished?: boolean
  memoryRecorded?: boolean
  memoriesLearned?: boolean
  storyFinished?: boolean
  stage?: number
  modelChoice?: string
}

const KEY = 'party-story-state'

export function getStoryState(): PartyStoryState {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as PartyStoryState) : {}
  } catch {
    return {}
  }
}

export function setStoryState(patch: Partial<PartyStoryState>): void {
  const next = { ...getStoryState(), ...patch }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // 忽略隐私模式下写入失败
  }
}

export function resetStoryState(): void {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // 同上
  }
}
