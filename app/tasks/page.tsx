import AppShell from "@/components/shell/app-shell"
import TaskForm from "@/components/tasks/task-form"
import TaskList from "@/components/tasks/task-list"
import Filters from "@/components/tasks/filters"
import { useTasks } from "@/hooks/use-tasks"

export default function TasksPage() {
  return (
    <AppShell>
      <ClientTasks />
    </AppShell>
  )
}
;("use client")
import { useState } from "react"
import type { TaskFilters } from "@/lib/tasks"

function ClientTasks() {
  const { tasks } = useTasks()
  const [filters, setFilters] = useState<TaskFilters>({ showCompleted: false })

  return (
    <div className="grid gap-4">
      <TaskForm />
      <Filters tasks={tasks} onChange={setFilters} />
      <TaskList initialFilters={filters} />
    </div>
  )
}
