"use client"

import { useMemo, useRef, useState } from "react"
import TaskItem from "./task-item"
import EditTaskDialog from "./edit-task-dialog"
import { type Task, type TaskFilters, filterTasks } from "@/lib/tasks"
import { useTasks } from "@/hooks/use-tasks"

export default function TaskList({ initialFilters }: { initialFilters?: TaskFilters }) {
  const { tasks, complete, remove, update, reorder } = useTasks()
  const [filters, setFilters] = useState<TaskFilters>(initialFilters || { showCompleted: false })
  const [editing, setEditing] = useState<Task | undefined>()
  const dragRef = useRef<string | null>(null)
  const overRef = useRef<string | null>(null)

  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters])

  const onDragStart = (id: string) => {
    dragRef.current = id
  }
  const onDragOver = (id: string) => {
    overRef.current = id
  }
  const onDrop = async () => {
    const from = dragRef.current
    const to = overRef.current
    if (!from || !to || from === to) return
    const ids = [...tasks].sort((a, b) => a.order - b.order).map((t) => t.id)
    const fromIdx = ids.indexOf(from)
    const toIdx = ids.indexOf(to)
    ids.splice(toIdx, 0, ids.splice(fromIdx, 1)[0])
    await reorder(ids)
    dragRef.current = null
    overRef.current = null
  }

  return (
    <div className="grid gap-4">
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={(v) => complete(t.id, v)}
            onEdit={() => setEditing(t)}
            onDelete={() => remove(t.id)}
            onDragStart={onDragStart}
            onDragOver={() => onDragOver(t.id)}
            onDrop={() => onDrop()}
          />
        ))}
        {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No tasks yet.</p> : null}
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
