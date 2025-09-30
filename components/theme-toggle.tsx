"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark")
    setIsDark(dark)
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = !root.classList.contains("dark")
    root.classList.toggle("dark", next)
    setIsDark(next)
    try {
      localStorage.setItem("tm_theme", next ? "dark" : "light")
    } catch {}
  }

  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
