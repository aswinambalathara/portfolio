'use client'

import { Check, Copy, RotateCcw, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

import { site } from '@/content/site'

type Step = 'topic' | 'name' | 'email' | 'message' | 'done'
type Message = { from: 'bot' | 'visitor'; text: string }

const topics = ['A job opportunity', 'A freelance project', 'Just saying hi']

const greeting: Message[] = [
  { from: 'bot', text: `Hi, I'm ${site.firstName} 👋` },
  { from: 'bot', text: 'Thanks for stopping by. What would you like to talk about?' },
]

const prompts = { name: 'Your name', email: 'you@company.com', message: 'Write your message…' }

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

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

// The whole Contact page: a guided chat that composes a message. With a Web3Forms access key it
// sends straight to the inbox; without one, "Send via email" opens the visitor's email app.
export function ContactChat() {
  const [step, setStep] = useState<Step>('topic')
  const [messages, setMessages] = useState<Message[]>(greeting)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [delivery, setDelivery] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [answers, setAnswers] = useState({ topic: '', name: '', email: '', message: '' })
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  // Keep the newest message in view without scrolling the whole page.
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, typing, step, delivery])

  useEffect(() => {
    if (!typing && (step === 'name' || step === 'email' || step === 'message')) {
      inputRef.current?.focus()
    }
  }, [step, typing])

  function botSays(text: string, next?: Step) {
    setTyping(true)
    setTimeout(() => {
      setMessages((current) => [...current, { from: 'bot', text }])
      setTyping(false)
      if (next) setStep(next)
    }, 700)
  }

  function reply(visitorText: string, botText: string, next: Step) {
    setMessages((current) => [...current, { from: 'visitor', text: visitorText }])
    botSays(botText, next)
  }

  function chooseTopic(topic: string) {
    setAnswers((current) => ({ ...current, topic }))
    reply(topic, "Great! What's your name?", 'name')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = input.trim()

    if (step === 'name') {
      if (!value) return setError('Please enter your name.')
      setAnswers((current) => ({ ...current, name: value }))
      reply(value, `Nice to meet you, ${value}. What's the best email to reach you?`, 'email')
    } else if (step === 'email') {
      if (!isEmail(value)) return setError('That email doesn’t look right. Please check it.')
      setAnswers((current) => ({ ...current, email: value }))
      reply(value, 'Thanks! What would you like to tell me?', 'message')
    } else if (step === 'message') {
      if (value.length < 10) return setError('Please write at least a sentence.')
      setAnswers((current) => ({ ...current, message: value }))
      reply(value, "Here's your message. Take a look and send it when you're ready.", 'done')
    }
    setInput('')
    setError('')
  }

  function restart() {
    setMessages(greeting)
    setAnswers({ topic: '', name: '', email: '', message: '' })
    setStep('topic')
    setInput('')
    setError('')
    setDelivery('idle')
    setTyping(false)
  }

  const subject = `${answers.topic} — from ${answers.name}`
  const body = `${answers.message}\n\n${answers.name}\n${answers.email}`
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  async function copy() {
    await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function send() {
    setDelivery('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.formAccessKey,
          subject: `Portfolio: ${subject}`,
          from_name: 'Portfolio contact chat',
          name: answers.name,
          email: answers.email,
          topic: answers.topic,
          message: answers.message,
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (!result.success) throw new Error('Not sent')
      setDelivery('sent')
      botSays(`Sent! I'll get back to you at ${answers.email} soon.`)
    } catch {
      setDelivery('error')
    }
  }

  const showComposer = step === 'name' || step === 'email' || step === 'message'

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
              <span className="text-online">Online</span> · usually replies by email
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
          className="flex-1 space-y-2 overflow-y-auto px-4 py-6 sm:px-6"
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
                <p className="max-w-[80%] rounded-2xl rounded-bl-md border border-line bg-bg/70 px-4 py-2.5 text-sm leading-relaxed">
                  {message.text}
                </p>
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

          {step === 'topic' && !typing && (
            <div className="flex animate-rise flex-wrap gap-2 pt-3 pl-9">
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => chooseTopic(topic)}
                  className="rounded-full border border-accent/40 bg-accent/5 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
                >
                  {topic}
                </button>
              ))}
            </div>
          )}

          {step === 'done' && !typing && delivery !== 'sent' && (
            <div className="animate-rise pt-3 pl-9">
              <div className="overflow-hidden rounded-2xl border border-line bg-bg/60">
                <dl className="divide-y divide-line text-sm">
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-16 shrink-0 text-muted">To</dt>
                    <dd className="truncate">{site.email}</dd>
                  </div>
                  <div className="flex gap-3 px-4 py-2.5">
                    <dt className="w-16 shrink-0 text-muted">Subject</dt>
                    <dd className="truncate">{subject}</dd>
                  </div>
                  <div className="px-4 py-3">
                    <dt className="sr-only">Message</dt>
                    <dd className="line-clamp-4 whitespace-pre-line text-fg/90">
                      {answers.message}
                    </dd>
                  </div>
                </dl>
              </div>

              {delivery === 'error' && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  That didn&apos;t send. Try again, or{' '}
                  <a href={mailto} className="underline">
                    email me directly
                  </a>
                  .
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {site.formAccessKey ? (
                  <button
                    type="button"
                    onClick={send}
                    disabled={delivery === 'sending'}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-fg disabled:opacity-60"
                  >
                    <Send aria-hidden className="size-4" />
                    {delivery === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                ) : (
                  <a
                    href={mailto}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-fg"
                  >
                    <Send aria-hidden className="size-4" />
                    Send via email
                  </a>
                )}
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent/60 hover:text-accent"
                >
                  {copied ? (
                    <Check aria-hidden className="size-4 text-online" />
                  ) : (
                    <Copy aria-hidden className="size-4" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && delivery === 'sent' && !typing && (
            <div className="animate-rise pt-3 pl-9">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                <RotateCcw aria-hidden className="size-4" />
                Send another message
              </button>
            </div>
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
              {showComposer ? prompts[step] : 'Message'}
            </label>
            {step === 'message' ? (
              <textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) submit(event)
                }}
                rows={2}
                maxLength={2000}
                disabled={typing}
                placeholder={prompts.message}
                className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted"
              />
            ) : (
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                type={step === 'email' ? 'email' : 'text'}
                autoComplete={step === 'email' ? 'email' : step === 'name' ? 'name' : 'off'}
                disabled={typing || !showComposer}
                placeholder={
                  showComposer
                    ? prompts[step]
                    : step === 'topic'
                      ? 'Pick a topic above to start'
                      : 'Chat finished'
                }
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
              />
            )}
            <button
              type="submit"
              aria-label="Send"
              disabled={typing || !showComposer}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-bg transition-colors hover:bg-fg disabled:opacity-40"
            >
              <Send aria-hidden className="size-4" />
            </button>
          </div>
          <p className="pt-2 text-center text-[11px] text-muted">
            {site.formAccessKey
              ? 'Messages go straight to my inbox.'
              : 'Your message opens in your email app, ready to send.'}
          </p>
        </form>
      </div>
    </div>
  )
}
