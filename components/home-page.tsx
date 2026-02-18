"use client"

import Link from "next/link"
import { useHistory } from "@/components/history-context"

const features = [
  {
    href: "/wheel",
    title: "幸运转盘",
    description: "添加多个选项，转动转盘帮你随机做出选择",
    gradient: "from-sky to-primary",
    bgClass: "bg-sky-light",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1"/>
        <path d="M24 4V24L40 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 4V24L8 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <path d="M24 44V24L40 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        <circle cx="24" cy="24" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/yesno",
    title: "是或否",
    description: "纠结二选一？让我们帮你做出决定",
    gradient: "from-pink to-accent",
    bgClass: "bg-pink-light",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-pink">
        <path d="M24 42l-2.1-1.9C12.4 31.5 8 27.2 8 22c0-4.4 3.4-8 7.5-8 2.5 0 4.9 1.2 6.5 3 1.6-1.8 4-3 6.5-3 4.1 0 7.5 3.6 7.5 8 0 5.2-4.4 9.5-13.9 18.1L24 42z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
        <text x="15" y="27" fontSize="11" fontWeight="bold" fill="currentColor">{"?"}</text>
      </svg>
    ),
  },
  {
    href: "/history",
    title: "历史记录",
    description: "查看你们之前所有的决策记录",
    gradient: "from-warm to-sky",
    bgClass: "bg-muted",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-primary">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1"/>
        <polyline points="24,14 24,24 32,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 24c0-7.7 6.3-14 14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    ),
  },
]

export function HomePage() {
  const { history } = useHistory()
  const recentCount = history.length

  return (
    <div className="flex flex-col items-center px-4 pt-8">
      {/* Header with couple logo */}
      <div className="mb-2 flex flex-col items-center">
        <div className="relative mb-4">
          {/* Couple icon */}
          <div className="flex items-center gap-1">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-light">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="12" cy="10" r="5" fill="oklch(0.72 0.12 220)"/>
                <circle cx="20" cy="10" r="5" fill="oklch(0.82 0.1 340)"/>
                <path d="M4 28c0-6 4-10 8-10s8 4 8 10" fill="oklch(0.72 0.12 220)" fillOpacity="0.3"/>
                <path d="M12 28c0-6 4-10 8-10s8 4 8 10" fill="oklch(0.82 0.1 340)" fillOpacity="0.3"/>
              </svg>
            </div>
            {/* Heart connector */}
            <div className="animate-bounce-soft -ml-3 -mr-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground text-balance text-center">
          DecideMe
        </h1>
        <p className="mt-1 text-base font-medium text-muted-foreground text-center text-pretty">
          {"和 Ta 一起，让选择变得简单又有趣"}
        </p>
      </div>

      {/* Stats pill */}
      {recentCount > 0 && (
        <div className="mt-4 mb-2 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground shadow-sm ring-1 ring-border">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-pink">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span>{`已做出 ${recentCount} 次决定`}</span>
        </div>
      )}

      {/* Feature Cards */}
      <div className="mt-6 flex w-full max-w-sm flex-col gap-4">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${feature.bgClass} transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">
                  {feature.title}
                </h2>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Cute footer message */}
      <div className="mt-8 mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span>{"选择困难？交给命运吧~"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    </div>
  )
}
