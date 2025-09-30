import { ls } from "./local-storage"

export type Priority = "Low" | "Medium" | "High"

export interface Task {
  id: string
  title: string
  description?: string
  dueDate?: string // ISO
  priority: Priority
  category?: string
  completed: boolean
  createdAt: number
  updatedAt: number
  completedAt?: number
  order: number
}

const KEY = "tm_tasks_v1"

export function loadTasks(): Task[] {
  const tasks = ls.get<Task[]>(KEY, [])
  return tasks.sort((a, b) => a.order - b.order)
}

function saveTasks(tasks: Task[]) {
  ls.set(KEY, tasks)
}

export const TaskStore = {
  list(): Task[] {
    return loadTasks()
  },
  add(input: Omit<Task, "id" | "createdAt" | "updatedAt" | "order" | "completed">) {
    const tasks = loadTasks()
    const order = tasks.length ? Math.max(...tasks.map((t) => t.order)) + 1 : 1
    const now = Date.now()
    const task: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description || "",
      dueDate: input.dueDate,
      priority: input.priority,
      category: input.category || "General",
      completed: false,
      createdAt: now,
      updatedAt: now,
      order,
    }
    tasks.push(task)
    saveTasks(tasks)
    return task
  },
  update(id: string, patch: Partial<Task>) {
    const tasks = loadTasks()
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx === -1) return
    tasks[idx] = { ...tasks[idx], ...patch, updatedAt: Date.now() }
    saveTasks(tasks)
  },
  remove(id: string) {
    const tasks = loadTasks().filter((t) => t.id !== id)
    saveTasks(tasks)
  },
  complete(id: string, done: boolean) {
    const tasks = loadTasks()
    const t = tasks.find((x) => x.id === id)
    if (!t) return
    t.completed = done
    t.completedAt = done ? Date.now() : undefined
    t.updatedAt = Date.now()
    saveTasks(tasks)
  },
  reorder(idsInOrder: string[]) {
    const tasks = loadTasks()
    const map = new Map(idsInOrder.map((id, i) => [id, i + 1]))
    tasks.forEach((t) => {
      const newOrder = map.get(t.id)
      if (newOrder) t.order = newOrder
    })
    saveTasks(tasks.sort((a, b) => a.order - b.order))
  },
}

export type TaskFilters = {
  q?: string
  category?: string
  priority?: Priority | "All"
  due?: "overdue" | "today" | "week" | "all"
  showCompleted?: boolean
}

export function filterTasks(tasks: Task[], f: TaskFilters): Task[] {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).getTime()

  return tasks.filter((t) => {
    if (f.showCompleted === false && t.completed) return false
    if (f.q && !`${t.title} ${t.description}`.toLowerCase().includes(f.q.toLowerCase())) return false
    if (f.category && f.category !== "All" && t.category !== f.category) return false
    if (f.priority && f.priority !== "All" && t.priority !== f.priority) return false
    if (f.due && f.due !== "all" && t.dueDate) {
      const due = new Date(t.dueDate).getTime()
      if (f.due === "overdue" && due >= startOfToday) return false
      if (f.due === "today" && (due < startOfToday || due >= startOfToday + 86400000)) return false
      if (f.due === "week" && (due < startOfToday || due > endOfWeek)) return false
    }
    return true
  })
}

export function getCategories(tasks: Task[]): string[] {
  const set = new Set<string>(["All"])
  tasks.forEach((t) => set.add(t.category || "General"))
  return Array.from(set)
}

export function progress(tasks: Task[]) {
  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 }
}

export function categoryProgress(tasks: Task[]) {
  const byCat: Record<string, { total: number; done: number }> = {}
  tasks.forEach((t) => {
    const k = t.category || "General"
    byCat[k] ||= { total: 0, done: 0 }
    byCat[k].total++
    if (t.completed) byCat[k].done++
  })
  return Object.entries(byCat).map(([category, { total, done }]) => ({
    category,
    total,
    done,
    percent: total ? Math.round((done / total) * 100) : 0,
  }))
}

export function weeklyCompletion(tasks: Task[]) {
  // last 7 days
  const days = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    d.setHours(0, 0, 0, 0)
    return d
  })
  const counts = days.map((d) => ({
    day: d.toLocaleDateString(undefined, { weekday: "short" }),
    count: tasks.filter(
      (t) =>
        t.completedAt &&
        new Date(t.completedAt).getTime() >= d.getTime() &&
        new Date(t.completedAt).getTime() < d.getTime() + 86400000,
    ).length,
  }))
  return counts
}

export function dueSoon(tasks: Task[], hours = 24) {
  const now = Date.now()
  const cutoff = now + hours * 3600_000
  return tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate).getTime() <= cutoff)
}
