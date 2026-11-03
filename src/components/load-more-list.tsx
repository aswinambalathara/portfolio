'use client'

import { Children, useEffect, useRef, useState } from 'react'

// Shows the first `batch` items, then the next batch each time the visitor scrolls near the end
// of the list. The items themselves are rendered on the server and passed in as children.
export function LoadMoreList({
  children,
  batch,
  className,
}: {
  children: React.ReactNode
  batch: number
  className?: string
}) {
  const items = Children.toArray(children)
  const [count, setCount] = useState(batch)
  const sentinel = useRef<HTMLDivElement>(null)
  const hasMore = count < items.length

  useEffect(() => {
    const target = sentinel.current
    if (!target || !hasMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCount((current) => current + batch)
      },
      { rootMargin: '0px 0px 300px 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [batch, hasMore, count])

  return (
    <>
      <ul className={className}>
        {items.slice(0, count).map((item, index) => (
          <li
            key={index}
            className="animate-rise"
            style={{ animationDelay: `${(index % batch) * 60}ms` }}
          >
            {item}
          </li>
        ))}
      </ul>
      {hasMore && <div ref={sentinel} aria-hidden className="h-px" />}
    </>
  )
}
