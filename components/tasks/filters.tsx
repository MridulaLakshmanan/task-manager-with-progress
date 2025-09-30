"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Priority, type Task, type TaskFilters, getCategories } from "@/lib/tasks"

export default function Filters({
  tasks,
  onChange,
}: {
  tasks: Task[]
  onChange: (f: TaskFilters) => void
}) {
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("All")
  const [priority, setPriority] = useState<Priority | "All">("All")
  const [due, setDue] = useState<"overdue" | "today" | "week" | "all">("all")

  const apply = () => onChange({ q, category, priority, due, showCompleted: false })

  return (
    <div className="grid gap-3 rounded-lg border bg-card p-4 md:grid-cols-4">
      <div className="grid gap-2">
        <Label>Search</Label>
        <Input
          placeholder="Search tasks..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onBlur={apply}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>
      <div className="grid gap-2">
        <Label>Category</Label>
        <select
          className="rounded-md border bg-background px-3 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            onChange({ q, category: e.target.value, priority, due, showCompleted: false })
          }}
        >
          {getCategories(tasks).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label>Priority</Label>
        <select
          className="rounded-md border bg-background px-3 py-2"
          value={priority}
          onChange={(e) => {
            const p = e.target.value as Priority | "All"
            setPriority(p)
            onChange({ q, category, priority: p, due, showCompleted: false })
          }}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label>Due</Label>
        <select
          className="rounded-md border bg-background px-3 py-2"
          value={due}
          onChange={(e) => {
            const d = e.target.value as any
            setDue(d)
            onChange({ q, category, priority, due: d, showCompleted: false })
          }}
        >
          <option value="all">Any time</option>
          <option value="overdue">Overdue</option>
          <option value="today">Today</option>
          <option value="week">This week</option>
        </select>
      </div>
    </div>
  )
}
