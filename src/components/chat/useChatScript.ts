import { useCallback, useEffect, useRef, useState } from 'react'

export interface ChatAction {
  id: string
  label: string
  primary?: boolean
}

export interface ScriptMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  actions?: ChatAction[]
  pauseAfter?: number
}

export type ChatPhase = 'idle' | 'playing' | 'done'

export function useChatScript(script: ScriptMessage[]) {
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<ChatPhase>('idle')

  const start = useCallback(() => setPhase('playing'), [])

  useEffect(() => {
    if (phase !== 'playing') return
    if (index >= script.length) {
      setPhase('done')
      return
    }
    const msg = script[index]
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    if (msg.role === 'user') {
      timer = setTimeout(() => {
        if (!cancelled) setIndex(index + 1)
      }, 300)
    } else {
      let i = 0
      setTyped('')
      const type = () => {
        if (cancelled) return
        i = Math.min(i + 1, msg.text.length)
        setTyped(msg.text.slice(0, i))
        if (i < msg.text.length) {
          timer = setTimeout(type, 20)
        } else {
          timer = setTimeout(() => {
            if (!cancelled) setIndex(index + 1)
          }, msg.pauseAfter ?? 500)
        }
      }
      timer = setTimeout(type, 200)
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [phase, index, script])

  const completed = script.slice(0, index)
  const current = phase === 'playing' && index < script.length ? script[index] : undefined
  const isTyping = !!current && current.role === 'assistant'
  const lastDone = index > 0 ? script[index - 1] : undefined
  const activeActions =
    phase === 'done' || (index >= script.length && phase !== 'idle')
      ? [...script].reverse().find((m) => m.actions)?.actions
      : undefined

  return {
    completed,
    current,
    typed,
    isTyping,
    phase,
    start,
    doneCount: index,
    lastDone,
    activeActions,
    script,
  }
}

export function useAutoScroll<T extends HTMLElement>(deps: unknown[]) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = el.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}
