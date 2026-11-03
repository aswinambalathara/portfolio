'use client'

import { Check, Copy, RotateCcw, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

import { site } from '@/content/site'

type Step = 'topic' | 'name' | 'email' | 'message' | 'done'
type Message = { from: 'bot' | 'visitor'; text: string }

const topics = ['A job opportunity', 'A freelance project', 'Something else']

const greeting: Message[] = [
  { from: 'bot', text: `Hi there! I'm ${site.firstName}.` },
  { from: 'bot', text: 'What would you like to talk about?' },
]

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

// A short guided conversation that composes a message. Sending opens the visitor's email app with
// everything filled in, so it works on a static site with no backend.
export function ContactChat() {
  const [step, setStep] = useState<Step>('topic')
  const [messages, setMessages] = useState<Message[]>(greeting)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [answers, setAnswers] = useState({ topic: '', name: '', email: '', message: '' })
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  // Keep the newest message in view without scrolling the whole page.
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    if (!typing && step !== 'topic' && step !== 'done') inputRef.current?.focus()
  }, [step, typing])

  function reply(visitorText: string, botText: string, next: Step) {
    setMessages((current) => [...current, { from: 'visitor', text: visitorText }])
    setTyping(true)
    setTimeout(() => {
      setMessages((current) => [...current, { from: 'bot', text: botText }])
      setTyping(false)
      setStep(next)
    }, 650)
  }

  function chooseTopic(topic: string) {
    setAnswers((current) => ({ ...current, topic }))
    reply(topic, "Great. What's your name?", 'name')
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = input.trim()

    if (step === 'name') {
      if (!value) return setError('Please enter your name.')
      setAnswers((current) => ({ ...current, name: value }))
      reply(value, `Nice to meet you, ${value}. What's the best email to reach you?`, 'email')
    } else if (step === 'email') {
      if (!isEmail(value)) return setError('Please enter a valid email address.')
      setAnswers((current) => ({ ...current, email: value }))
      reply(value, 'Thanks! What would you like to say?', 'message')
    } else if (step === 'message') {
      if (value.length < 10) return setError('Please write at least a sentence.')
      setAnswers((current) => ({ ...current, message: value }))
      reply(
        value,
        'All set. Send it from your email app, or copy it and send it however you like.',
        'done',
      )
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
  }

  const subject = `${answers.topic} — from ${answers.name}`
  const body = `${answers.message}\n\n${answers.name}\n${answers.email}`
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  async function copy() {
    await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const prompts: Record<'name' | 'email' | 'message', string> = {
    name: 'Your name',
    email: 'you@example.com',
    message: 'Write your message…',
  }

  return (
    <div className="flex h-[34rem] flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <div className="relative grid size-10 place-items-center rounded-full bg-linear-to-br from-accent to-cyan font-mono text-sm font-semibold text-bg">
          {site.firstName.charAt(0)}
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-surface bg-online" />
        </div>
        <div>
          <p className="text-sm font-medium">{site.name}</p>
          <p className="font-mono text-xs text-muted">Usually replies by email</p>
        </div>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto px-5 py-5"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex animate-rise ${message.from === 'visitor' ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={
                message.from === 'visitor'
                  ? 'max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm whitespace-pre-line text-bg'
                  : 'max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-bg/70 px-4 py-2.5 text-sm'
              }
            >
              {message.text}
            </p>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start" aria-label="Typing">
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
          <div className="flex flex-wrap gap-2 pt-1">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => chooseTopic(topic)}
                className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-bg"
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        {step === 'done' && !typing && (
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={mailto}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-fg"
            >
              <Send aria-hidden className="size-4" />
              Send via email
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent/60 hover:text-accent"
            >
              {copied ? (
                <Check aria-hidden className="size-4 text-online" />
              ) : (
                <Copy aria-hidden className="size-4" />
              )}
              {copied ? 'Copied' : 'Copy message'}
            </button>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <RotateCcw aria-hidden className="size-4" />
              Start over
            </button>
          </div>
        )}
      </div>

      {(step === 'name' || step === 'email' || step === 'message') && (
        <form onSubmit={submit} noValidate className="border-t border-line p-3">
          {error && (
            <p role="alert" className="px-2 pb-2 text-xs text-red-400">
              {error}
            </p>
          )}
          <div className="flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">
              {prompts[step]}
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
                placeholder={prompts[step]}
                className="flex-1 resize-none rounded-xl border border-line bg-bg/70 px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent/60"
              />
            ) : (
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                type={step === 'email' ? 'email' : 'text'}
                autoComplete={step === 'email' ? 'email' : 'name'}
                disabled={typing}
                placeholder={prompts[step]}
                className="flex-1 rounded-full border border-line bg-bg/70 px-4 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent/60"
              />
            )}
            <button
              type="submit"
              aria-label="Send"
              disabled={typing}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-bg transition-colors hover:bg-fg disabled:opacity-50"
            >
              <Send aria-hidden className="size-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
