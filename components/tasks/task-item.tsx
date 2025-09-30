"use client"

import type { Task } from "@/lib/tasks"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import type React from "react"

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  task: Task
  onToggle: (checked: boolean) => void
  onEdit: () => void
  onDelete: () => void
  onDragStart: (id: string) => void
  onDragOver: (id: string) => void
  onDrop: (id: string) => void
}) {
  const due = task.dueDate ? new Date(task.dueDate) : null
  const overdue = due && !task.completed && due.getTime() < new Date().setHours(0, 0, 0, 0)

  return (
    <li
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(e) => {
        e.preventDefault()
        onDragOver(task.id)
      }}
      onDrop={() => onDrop(task.id)}
      style={
        {
          backgroundImage: "linear-gradient(to bottom, #fef3c7, #dbeafe)",
        } as React.CSSProperties
      }
      className={`
        group grid grid-rows-[auto_1fr_auto] grid-cols-1 items-start gap-3
        rounded-[10px] border p-4 aspect-square overflow-hidden
        shadow-[0_8px_14px_rgba(0,0,0,0.08)]
        transition-[transform,box-shadow] transform-gpu
        hover:shadow-[0_12px_22px_rgba(0,0,0,0.12)] hover:scale-[1.02]
      `}
      aria-label={`Task ${task.title}`}
    >
      {/* top row */}
      <Checkbox
        checked={task.completed}
        onCheckedChange={(v) => onToggle(Boolean(v))}
        className="mt-1"
        aria-label="Mark complete"
      />
      {/* middle row */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{task.title}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border">
            {task.priority}
          </span>
        </div>
        {task.description ? <p className="text-sm text-muted-foreground line-clamp-4">{task.description}</p> : null}
        <div className="flex flex-wrap gap-2 text-xs">
          {task.category ? <span className="rounded bg-card px-2 py-0.5 border">#{task.category}</span> : null}
          {due ? (
            <span
              className={`rounded px-2 py-0.5 border ${overdue ? "bg-destructive text-destructive-foreground" : "bg-card"}`}
            >
              Due {due.toLocaleDateString()}
            </span>
          ) : null}
        </div>
      </div>
      {/* bottom row */}
      <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 justify-self-end self-end">
        <Button variant="ghost" size="icon" aria-label="Edit task" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Delete task" onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </li>
  )
}
