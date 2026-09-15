export interface StageGate {
  ready: boolean
  label: string
  hint?: string
  action?: () => void
}

export interface StageProps {
  readOnly: boolean
  onGate: (gate: StageGate) => void
}
