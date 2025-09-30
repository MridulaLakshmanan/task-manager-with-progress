import AppShell from "@/components/shell/app-shell"
import WeeklyProgress from "@/components/charts/weekly-progress"
import CategoryPie from "@/components/charts/category-pie"
import { useTasks } from "@/hooks/use-tasks"

export default function AnalyticsPage() {
  return (
    <AppShell>
      <ClientAnalytics />
    </AppShell>
  )
}
;("use client")
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ClientAnalytics() {
  const { tasks } = useTasks()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyProgress tasks={tasks} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPie tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  )
}
