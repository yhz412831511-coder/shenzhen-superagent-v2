import { useEffect, type ReactNode } from 'react'
import { ChatMessage, ActionButtons } from './ChatMessage'
import { useChatScript, useAutoScroll, type ScriptMessage, type ChatAction } from './useChatScript'

interface ChatFlowProps {
  script: ScriptMessage[]
  onAction?: (id: string, label: string) => void
  chosenId?: string
  /** 空闲时展示的启动按钮 */
  startLabel?: string
  /** 附加在底部、消息完成后展示的内容 */
  footer?: ReactNode
  maxHeight?: number
  /** 挂载后立即播放（Workbench 发送场景） */
  autoStart?: boolean
}

export function ChatFlow({ script, onAction, chosenId, startLabel, footer, maxHeight = 340, autoStart = false }: ChatFlowProps) {
  const chat = useChatScript(script)
  const scrollRef = useAutoScroll<HTMLDivElement>([chat.doneCount, chat.typed])

  useEffect(() => {
    if (autoStart) chat.start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart])

  const handleChoose = (id: string) => {
    const action = script.flatMap((m) => m.actions || []).find((a: ChatAction) => a.id === id)
    if (action && onAction) onAction(id, action.label)
  }

  return (
    <div className="chat-flow">
      <div className="chat-scroll" style={{ maxHeight }} ref={scrollRef}>
        {chat.completed.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} text={msg.text}>
            {msg.role === 'assistant' && msg.actions && onAction && (
              <ActionButtons actions={msg.actions} onChoose={handleChoose} chosenId={chosenId} />
            )}
          </ChatMessage>
        ))}
        {chat.current && (
          <ChatMessage key={chat.current.id} role={chat.current.role} text={chat.current.role === 'assistant' ? chat.typed : chat.current.text} typing={chat.isTyping} />
        )}
        {chat.phase === 'idle' && startLabel && (
          <div className="chat-idle">
            <div className="chat-thinking">
              <span className="chat-dot" />
              <span className="chat-dot" />
              <span className="chat-dot" />
            </div>
            <button className="btn btn-primary" onClick={chat.start}>
              {startLabel}
            </button>
          </div>
        )}
        {chat.phase === 'done' && footer}
      </div>
    </div>
  )
}
