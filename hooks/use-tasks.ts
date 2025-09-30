"use client"
import useSWR from "swr"
import { type Task, TaskStore } from "@/lib/tasks"

const key = "tasks"

const fetcher = () => TaskStore.list()

export function useTasks() {
  const { data, mutate } = useSWR<Task[]>(key, fetcher, { fallbackData: [] })

  return {
    tasks: data || [],
    refresh: () => mutate(),
    add: async (t: Parameters<typeof TaskStore.add>[0]) => {
      TaskStore.add(t)
      await mutate()
    },
    update: async (id: string, patch: Partial<Task>) => {
      TaskStore.update(id, patch)
      await mutate()
    },
    remove: async (id: string) => {
      TaskStore.remove(id)
      await mutate()
    },
    complete: async (id: string, done: boolean) => {
      TaskStore.complete(id, done)
      await mutate()
    },
    reorder: async (ids: string[]) => {
      TaskStore.reorder(ids)
      await mutate()
    },
  }
}
