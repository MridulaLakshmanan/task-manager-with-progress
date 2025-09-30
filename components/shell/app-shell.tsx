"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import ClickSpark from "@/components/ClickSpark"

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/completed", label: "Completed" },
  { href: "/analytics", label: "Analytics" },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-dvh grid grid-cols-1 md:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-4 font-semibold text-2xl md:text-3xl leading-tight tracking-tight">Task Manager</div>
        <nav className="flex flex-col gap-1 px-2 pb-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-h-dvh flex-col">
        <ClickSpark sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
          <header className="flex items-center justify-between gap-3 border-b px-4 py-3 bg-card">
            <h1 className="text-lg font-semibold text-pretty">Sticky Notes Tasks</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <main className="p-4">{children}</main>
        </ClickSpark>
      </div>
    </div>
  )
}
