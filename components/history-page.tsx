"use client"

import { useHistory } from "@/components/history-context"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

function formatTime(timestamp: number) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 60000) return "刚刚"
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`

  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function HistoryPage() {
  const { history, clearHistory, loadPreset } = useHistory()
  const router = useRouter()

  const handleLoadPreset = (options: string[]) => {
    loadPreset(options)
    router.push("/wheel")
  }

  return (
    <div className="flex flex-col items-center px-4 pt-6">
      {/* Header */}
      <div className="mb-6 flex w-full max-w-sm items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {"历史记录"}
          </h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {history.length > 0
              ? `共 ${history.length} 条记录`
              : "还没有任何决策记录~"
            }
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="rounded-xl bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground transition-all hover:scale-105 active:scale-95"
          >
            {"清空记录"}
          </button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-muted-foreground opacity-40">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-center text-sm font-semibold text-muted-foreground">
            {"去试试转盘或是否决定吧~"}
          </p>
          <p className="text-center text-xs text-muted-foreground">
            {"你们的每一个决定都会记录在这里"}
          </p>
        </div>
      )}

      {/* History list */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        {history.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border border-border bg-card p-4 shadow-sm transition-all",
              index === 0 && "ring-2 ring-primary/20"
            )}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className="flex items-start gap-3">
              {/* Type icon */}
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                item.type === "wheel" ? "bg-sky-light" : "bg-pink-light"
              )}>
                {item.type === "wheel" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v10l7 4"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="oklch(0.82 0.1 340)">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "rounded-md px-2 py-0.5 text-xs font-bold",
                    item.type === "wheel"
                      ? "bg-sky-light text-primary"
                      : "bg-pink-light text-pink"
                  )}>
                    {item.type === "wheel" ? "转盘" : "是否"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(item.timestamp)}
                  </span>
                  {index === 0 && (
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                      {"最新"}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground truncate">
                  {item.question}
                </p>
                <p className="mt-1 text-base font-bold text-foreground">
                  {item.result}
                </p>
                {item.type === "wheel" && item.options && item.options.length >= 2 && (
                  <button
                    onClick={() => handleLoadPreset(item.options!)}
                    className="mt-2 flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary/20 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    {"使用这组选项"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="h-4" />
    </div>
  )
}
