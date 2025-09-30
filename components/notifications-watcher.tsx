"use client"

import { useEffect } from "react"
import { dueSoon } from "@/lib/tasks"
import { useTasks } from "@/hooks/use-tasks"

export default function NotificationsWatcher() {
  const { tasks } = useTasks()

  useEffect(() => {
    const ask = async () => {
      try {
        if ("Notification" in window && Notification.permission === "default") {
          await Notification.requestPermission()
        }
      } catch {}
    }
    ask()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const soon = dueSoon(tasks, 24)
      if (soon.length === 0) return
      const msg = `${soon.length} task${soon.length > 1 ? "s" : ""} due within 24h`
      try {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Upcoming tasks", { body: msg })
        } else {
          // fallback
          // eslint-disable-next-line no-alert
          console.log("[v0] Reminder:", msg)
        }
      } catch {}
    }, 60_000) // check every minute
    return () => clearInterval(id)
  }, [tasks])

  return null
}
