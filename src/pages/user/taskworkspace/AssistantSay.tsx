import type { ReactNode } from 'react'

export function AssistantSay({ children }: { children: ReactNode }) {
  return (
    <div className="as-say">
      <span className="as-avatar">政</span>
      <div className="as-text">{children}</div>
    </div>
  )
}
