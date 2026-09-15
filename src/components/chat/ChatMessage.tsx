import type { ReactNode } from 'react'
import type { ChatAction } from './useChatScript'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  text: string
  typing?: boolean
  children?: ReactNode
}

export function ChatMessage({ role, text, typing, children }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="chat-row chat-row-user">
        <div className="chat-bubble chat-bubble-user">{text}</div>
      </div>
    )
  }
  return (
    <div className="chat-row chat-row-assistant">
      <div className="chat-avatar">政</div>
      <div className="chat-bubble chat-bubble-assistant">
        <span>{text}</span>
        {typing && <span className="chat-cursor" />}
        {children}
      </div>
    </div>
  )
}

interface ActionButtonsProps {
  actions: ChatAction[]
  onChoose: (id: string) => void
  chosenId?: string
  disabled?: boolean
}

export function ActionButtons({ actions, onChoose, chosenId, disabled }: ActionButtonsProps) {
  return (
    <div className="chat-actions">
      {actions.map((action) => (
        <button
          key={action.id}
          className={`btn ${action.primary ? 'btn-primary' : 'btn-secondary'} chat-action-btn ${
            chosenId === action.id ? 'chat-action-chosen' : ''
          }`}
          disabled={disabled || !!chosenId}
          onClick={() => onChoose(action.id)}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
