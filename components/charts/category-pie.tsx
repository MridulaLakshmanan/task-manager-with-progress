"use client"

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { categoryProgress } from "@/lib/tasks"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const NOTE_COLORS = ["#fef3c7", "#dbeafe"]

export default function CategoryPie({ tasks }: { tasks: any[] }) {
  const data = categoryProgress(tasks).map((c) => ({ name: c.category, value: c.done }))

  return (
    <ChartContainer config={{}} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
            {data.map((_, i) => (
              <Cell key={i} fill={NOTE_COLORS[i % NOTE_COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
