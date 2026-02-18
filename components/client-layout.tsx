"use client"

import { AppShell } from "@/components/app-shell"
import type { ReactNode } from "react"

export function ClientLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>
}
