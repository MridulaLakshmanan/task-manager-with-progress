"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { weeklyCompletion } from "@/lib/tasks"

export default function WeeklyProgress({ tasks }: { tasks: any[] }) {
  const data = weeklyCompletion(tasks)
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
          <YAxis allowDecimals={false} stroke="var(--color-muted-foreground)" />
          <Tooltip />
          <Bar dataKey="count" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
