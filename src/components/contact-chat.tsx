'use client'

import { RotateCcw, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'

import { site } from '@/content/site'

type Message = { from: 'bot' | 'visitor'; text: string }

const starters = ["What's his tech stack?", 'What has he built?', "I'd like to hire him"]

const greeting: Message[] = [
  { from: 'bot', text: `Hi, I'm ${site.firstName}'s AI assistant 👋` },
  {
    from: 'bot',
    text: `Ask me about ${site.firstName}'s skills, projects or experience, or leave him a message.`,
  },
]

function newSessionId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

// **bold** spans inside a line. Built as React nodes, never as HTML.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.length > 4 && part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold text-fg">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

// The assistant's small formatting set: paragraphs, "- " bullet lines and **bold**.
function BotText({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let items: string[] = []
  const flushList = () => {
    if (!items.length) return
    blocks.push(
      <ul key={blocks.length} className="list-disc space-y-1 pl-4 marker:text-accent">
        {items.map((item, index) => (
          <li key={index}>{inline(item)}</li>
        ))}
      </ul>,
    )
    items = []
  }
  for (const line of text.split('\n').map((value) => value.trim())) {
    const bullet = line.match(/^(?:[-•]|\*(?!\*)|\d+[.)])\s+(.*)$/)
    if (bullet) {
      items.push(bullet[1])
    } else {
      flushList()
      if (line) blocks.push(<p key={blocks.length}>{inline(line)}</p>)
    }
  }
  flushList()
  return <div className="space-y-2">{blocks}</div>
}

function Avatar({ size = 'size-8' }: { size?: string }) {
  return site.avatarUrl ? (
    // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimisation
    <img src={site.avatarUrl} alt="" className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <span
      className={`${size} grid shrink-0 place-items-center rounded-full bg-linear-to-br from-accent to-cyan font-mono text-xs font-semibold text-bg`}
    >
      {site.firstName.charAt(0)}
    </span>
  )
}

// The whole Contact page: a chat with the AI assistant (n8n workflow at `site.chatUrl`). It answers
// from the résumé and passes contact requests on to Aswin. One session per visit or "Start over".
export function ContactChat() {
  const [messages, setMessages] = useState<Message[]>(greeting)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [failed, setFailed] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionRef = useRef<string | null>(null)

  // Keep the newest message in view without scrolling the whole page.
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, typing, failed])

  const started = messages.length > greeting.length

  // After each answer, put the cursor back in the input (not on first load: no keyboard pop-up).
  useEffect(() => {
    if (started && !typing) inputRef.current?.focus()
  }, [started, typing])

  async function request(text: string) {
    sessionRef.current ??= newSessionId()
    const session = sessionRef.current
    setFailed('')
    setTyping(true)
    try {
      const response = await fetch(site.chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: session }),
        signal: AbortSignal.timeout(30_000),
      })
      const result = (await response.json()) as { reply?: string }
      if (!response.ok || !result.reply) throw new Error('No reply')
      // Ignore a late answer if the visitor started over meanwhile.
      if (sessionRef.current !== session) return
      setMessages((current) => [...current, { from: 'bot', text: result.reply as string }])
    } catch {
      if (sessionRef.current === session) setFailed(text)
    } finally {
      if (sessionRef.current === session) setTyping(false)
    }
  }

  function ask(text: string) {
    setMessages((current) => [...current, { from: 'visitor', text }])
    setInput('')
    setError('')
    void request(text)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = input.trim()
    if (!value) return setError('Please type a message.')
    ask(value)
  }

  function restart() {
    sessionRef.current = null
    setMessages(greeting)
    setInput('')
    setError('')
    setFailed('')
    setTyping(false)
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[3rem] bg-linear-to-br from-accent-strong/25 via-transparent to-cyan/15 blur-3xl"
      />
      <div className="flex h-[min(44rem,calc(100svh-9rem))] min-h-128 flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <header className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="relative rounded-full bg-linear-to-br from-accent to-cyan p-0.5">
            <Avatar size="size-11" />
            <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface bg-online" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{site.name}</p>
            <p className="truncate text-xs text-muted">
              <span className="text-online">Online</span> · AI assistant, replies instantly
            </p>
          </div>
          <button
            type="button"
            onClick={restart}
            aria-label="Start over"
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
          >
            <RotateCcw aria-hidden className="size-4" />
          </button>
        </header>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-4 py-6 sm:px-6"
        >
          <p className="pb-2 text-center font-mono text-[11px] tracking-wide text-muted">Today</p>

          {messages.map((message, index) => {
            const firstInGroup = index === 0 || messages[index - 1].from !== message.from
            return message.from === 'bot' ? (
              <div
                key={index}
                className={`flex animate-rise items-end gap-2 ${firstInGroup ? 'pt-2' : ''}`}
              >
                <span className={firstInGroup ? '' : 'invisible'}>
                  <Avatar size="size-7" />
                </span>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-line bg-bg/70 px-4 py-2.5 text-sm leading-relaxed">
                  <BotText text={message.text} />
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={`flex animate-rise justify-end ${firstInGroup ? 'pt-2' : ''}`}
              >
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-linear-to-br from-accent to-accent-strong px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line text-bg">
                  {message.text}
                </p>
              </div>
            )
          })}

          {typing && (
            <div className="flex items-end gap-2 pt-2" aria-label="Typing">
              <Avatar size="size-7" />
              <span className="inline-flex gap-1 rounded-2xl rounded-bl-md border border-line bg-bg/70 px-4 py-3.5">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 animate-bounce rounded-full bg-muted"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </span>
            </div>
          )}

          {!started && !typing && (
            <div className="flex animate-rise flex-wrap gap-2 pt-3 pl-9">
              {starters.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => ask(starter)}
                  className="rounded-full border border-accent/40 bg-accent/5 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                  {starter}
                </button>
              ))}
            </div>
          )}

          {failed && !typing && (
            <p role="alert" className="animate-rise pt-3 pl-9 text-sm text-red-400">
              That didn&apos;t send.{' '}
              <button type="button" onClick={() => request(failed)} className="underline">
                Try again
              </button>
              , or{' '}
              <a href={`mailto:${site.email}`} className="underline">
                email me directly
              </a>
              .
            </p>
          )}
        </div>

        <form onSubmit={submit} noValidate className="border-t border-line bg-bg/30 p-3 sm:p-4">
          {error && (
            <p role="alert" className="px-3 pb-2 text-xs text-red-400">
              {error}
            </p>
          )}
          <div className="flex items-end gap-2 rounded-3xl border border-line bg-bg/70 p-1.5 pl-4 transition-colors focus-within:border-accent/60">
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              type="text"
              autoComplete="off"
              maxLength={1000}
              disabled={typing}
              placeholder={`Ask about ${site.firstName}'s work…`}
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={typing}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-bg transition-colors hover:bg-fg disabled:opacity-40"
            >
              <Send aria-hidden className="size-4" />
            </button>
          </div>
          <p className="pt-2 text-center text-[11px] text-muted">
            Answers are AI-generated from my résumé. Messages you leave here reach me directly.
          </p>
        </form>
      </div>
    </div>
  )
}
