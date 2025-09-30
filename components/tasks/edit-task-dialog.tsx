"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Task } from "@/lib/tasks"

export default function EditTaskDialog({
  open,
  onOpenChange,
  task,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  task?: Task
  onSave: (patch: Partial<Task>) => void
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<string>("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium")
  const [category, setCategory] = useState("General")

  useEffect(() => {
    if (!task) return
    setTitle(task.title)
    setDescription(task.description || "")
    setDueDate(task.dueDate || "")
    setPriority(task.priority)
    setCategory(task.category || "General")
  }, [task])

  const save = () => {
    if (!task) return
    onSave({ title, description, dueDate: dueDate || undefined, priority, category })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="grid gap-2">
              <Label>Due date</Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <select
                className="rounded-md border bg-background px-3 py-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
