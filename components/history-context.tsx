"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

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
  // Load history from localStorage on initial render
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("decision-app-history")
        if (saved) {
          return JSON.parse(saved)
        }
      } catch (error) {
        console.error("Failed to load history from localStorage:", error)
      }
    }
    return []
  })
  
  const [pendingPreset, setPendingPreset] = useState<string[] | null>(null)

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("decision-app-history", JSON.stringify(history))
      } catch (error) {
        console.error("Failed to save history to localStorage:", error)
      }
    }
  }, [history])

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
    if (typeof window !== "undefined") {
      localStorage.removeItem("decision-app-history")
    }
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
