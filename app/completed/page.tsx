import AppShell from "@/components/shell/app-shell"

export default function CompletedPage() {
  return (
    <AppShell>
      <ClientCompleted />
    </AppShell>
  )
}
;("use client")
import { filterTasks } from "@/lib/tasks"
import TaskItem from "@/components/tasks/task-item"
import EditTaskDialog from "@/components/tasks/edit-task-dialog"
import { useState } from "react"
import { useTasks as useTasksClient } from "@/hooks/use-tasks"

function ClientCompleted() {
  const { tasks, complete, remove, update, reorder } = useTasksClient()
  const onlyDone = filterTasks(tasks, { showCompleted: true }).filter((t) => t.completed)

  const [editing, setEditing] = useState<any>()

  // simple reorder for completed list
  const ids = onlyDone.map((t) => t.id)

  return (
    <div className="grid gap-4">
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {onlyDone.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={(v) => complete(t.id, v)}
            onEdit={() => setEditing(t)}
            onDelete={() => remove(t.id)}
            onDragStart={() => {}}
            onDragOver={() => {}}
            onDrop={() => reorder(ids)}
          />
        ))}
        {onlyDone.length === 0 ? <p className="text-sm text-muted-foreground">No completed tasks yet.</p> : null}
      </ul>

      <EditTaskDialog
        open={!!editing}
        onOpenChange={(v) => !v && setEditing(undefined)}
        task={editing}
        onSave={(patch) => editing && update(editing.id, patch)}
      />
    </div>
  )
}
