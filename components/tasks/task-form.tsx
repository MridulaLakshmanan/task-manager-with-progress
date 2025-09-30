"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTasks } from "@/hooks/use-tasks"

export default function TaskForm() {
  const { add } = useTasks()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState<string>("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium")
  const [category, setCategory] = useState("General")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    await add({ title, description, dueDate: dueDate || undefined, priority, category })
    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("Medium")
    setCategory("General")
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border bg-card p-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Write status update"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="desc">Description</Label>
        <Textarea
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="due">Due date</Label>
          <Input id="due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="priority">Priority</Label>
          <select
            id="priority"
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
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Work"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  )
}
