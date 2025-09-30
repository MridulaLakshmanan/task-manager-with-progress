import AppShell from "@/components/shell/app-shell"
import ProgressBar from "@/components/progress-bar"
import WeeklyProgress from "@/components/charts/weekly-progress"
import CategoryPie from "@/components/charts/category-pie"
import { useTasks } from "@/hooks/use-tasks"
import NotificationsWatcher from "@/components/notifications-watcher"

export default function DashboardPage() {
  return (
    <AppShell>
      <ClientDashboard />
    </AppShell>
  )
}
;("use client")
import { progress } from "@/lib/tasks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ClientDashboard() {
  const { tasks } = useTasks()
  const p = progress(tasks)

  return (
    <div className="grid gap-4">
      <NotificationsWatcher />
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {p.done}/{p.total} tasks completed ({p.percent}%)
          </p>
          <ProgressBar value={p.percent} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyProgress tasks={tasks} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>By Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPie tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
