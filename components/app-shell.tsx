"use client"

import { BottomNav } from "@/components/bottom-nav"
import { FloatingDecorations } from "@/components/floating-decorations"
import { HistoryProvider } from "@/components/history-context"
import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <HistoryProvider>
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
        <FloatingDecorations />
        <main className="relative z-10 flex-1 pb-20">
          {children}
        </main>
        <BottomNav />
      </div>
    </HistoryProvider>
  )
}
