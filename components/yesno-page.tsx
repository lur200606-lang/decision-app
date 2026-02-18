"use client"

import { useState, useCallback } from "react"
import { useHistory } from "@/components/history-context"
import { cn } from "@/lib/utils"

const THINKING_MESSAGES = [
  "让我想想...",
  "嗯...这个嘛...",
  "命运之轮转动中...",
  "帮你们问问月老...",
  "认真思考中...",
]

const YES_MESSAGES = [
  "当然可以!",
  "答案是 YES!",
  "就这么决定了!",
  "大胆去做吧!",
  "命运说：好!",
]

const NO_MESSAGES = [
  "还是算了吧~",
  "答案是 NO!",
  "下次再说吧~",
  "命运说：不行!",
  "换个选择吧~",
]

export function YesNoPage() {
  const [question, setQuestion] = useState("")
  const [isDeciding, setIsDeciding] = useState(false)
  const [result, setResult] = useState<{ isYes: boolean; message: string } | null>(null)
  const [shakeClass, setShakeClass] = useState(false)
  const { addHistory } = useHistory()

  const decide = useCallback(() => {
    if (isDeciding) return
    setIsDeciding(true)
    setResult(null)
    setShakeClass(true)

    // Shake animation while deciding
    setTimeout(() => {
      setShakeClass(false)
      const isYes = Math.random() > 0.5
      const messages = isYes ? YES_MESSAGES : NO_MESSAGES
      const message = messages[Math.floor(Math.random() * messages.length)]
      setResult({ isYes, message })
      setIsDeciding(false)

      if (question.trim()) {
        addHistory({
          type: "yesno",
          question: question.trim(),
          result: message,
        })
      }
    }, 2000)
  }, [isDeciding, question, addHistory])

  const thinkingMessage = THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)]

  return (
    <div className="flex flex-col items-center px-4 pt-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-foreground">
          {"是 或 否"}
        </h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {"纠结二选一？交给命运来决定吧~"}
        </p>
      </div>

      {/* Question input */}
      <div className="mb-6 w-full max-w-sm">
        <label htmlFor="question" className="mb-2 block text-sm font-bold text-foreground">
          {"你的问题（选填）"}
        </label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="比如：今天要不要吃大餐？"
          maxLength={50}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Magic ball / decision display */}
      <div className="relative mb-8">
        <div
          className={cn(
            "flex h-52 w-52 items-center justify-center rounded-full transition-all duration-500",
            result === null && !isDeciding && "bg-sky-light ring-4 ring-primary/20",
            isDeciding && "bg-muted ring-4 ring-primary/40",
            result?.isYes && "bg-sky-light ring-4 ring-primary/50",
            result && !result.isYes && "bg-pink-light ring-4 ring-pink/50",
            shakeClass && "animate-wiggle"
          )}
        >
          {/* Inner content */}
          <div className="flex flex-col items-center gap-2 text-center px-4">
            {!isDeciding && !result && (
              <>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-primary opacity-50">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                </svg>
                <span className="text-sm font-semibold text-muted-foreground">
                  {"点击下方按钮开始"}
                </span>
              </>
            )}
            {isDeciding && (
              <>
                <div className="animate-spin-slow">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <span className="text-sm font-bold text-primary">
                  {thinkingMessage}
                </span>
              </>
            )}
            {result && (
              <>
                {result.isYes ? (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-primary">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-pink">
                    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                )}
                <span className={cn(
                  "text-lg font-extrabold",
                  result.isYes ? "text-primary" : "text-pink"
                )}>
                  {result.message}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Decorative ring particles */}
        {result && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-heart"
                style={{
                  top: `${20 + 60 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  left: `${20 + 60 * Math.cos((i * Math.PI * 2) / 6)}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {result.isYes ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.72 0.12 220)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decision button */}
      <button
        onClick={decide}
        disabled={isDeciding}
        className={cn(
          "rounded-2xl px-10 py-3.5 text-lg font-bold shadow-lg transition-all duration-300",
          "bg-primary text-primary-foreground",
          "hover:shadow-xl hover:scale-105 active:scale-95",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          isDeciding && "animate-pulse-glow"
        )}
      >
        {isDeciding ? "思考中..." : "帮我决定!"}
      </button>

      {/* Quick action buttons */}
      {result && (
        <button
          onClick={decide}
          className="mt-4 rounded-xl bg-secondary px-6 py-2 text-sm font-bold text-secondary-foreground shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {"再来一次~"}
        </button>
      )}

      {/* Fun tips */}
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-bold text-foreground">{"小贴士"}</h3>
        <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-muted-foreground">
          <li className="flex items-start gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)" className="mt-0.5 shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{"输入你纠结的问题，让命运来帮你决定"}</span>
          </li>
          <li className="flex items-start gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.72 0.12 220)" className="mt-0.5 shrink-0">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>{"三局两胜更公平哦~"}</span>
          </li>
          <li className="flex items-start gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)" className="mt-0.5 shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>{"所有决定都会记录在历史中"}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
