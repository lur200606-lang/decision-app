"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface HistoryItem {
  id: string
  type: "wheel" | "yesno"
  question: string
  result: string
  timestamp: number
  options?: string[]
}

interface HistoryContextType {
  history: HistoryItem[]
  addHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void
  clearHistory: () => void
  pendingPreset: string[] | null
  loadPreset: (options: string[]) => void
  clearPendingPreset: () => void
}

const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [pendingPreset, setPendingPreset] = useState<string[] | null>(null)

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "timestamp">) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).slice(2, 9),
      timestamp: Date.now(),
    }
    setHistory((prev) => [newItem, ...prev])
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const loadPreset = useCallback((options: string[]) => {
    setPendingPreset(options)
  }, [])

  const clearPendingPreset = useCallback(() => {
    setPendingPreset(null)
  }, [])

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory, pendingPreset, loadPreset, clearPendingPreset }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const ctx = useContext(HistoryContext)
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider")
  return ctx
}
