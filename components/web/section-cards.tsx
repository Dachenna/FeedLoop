import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  IconMessageCircle,
  IconFileDescription,
  IconChartBar,
  IconActivity,
} from '@tabler/icons-react'

export type DashboardStats = {
  surveys: number
  surveysDelta: number
  responses: number
  responsesDelta: string
  responsesUp: boolean
  satisfaction: string
  satisfactionNote: string
  replyRate: string
  replyNote: string
}

export function SectionCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-3">
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
          <IconFileDescription className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.surveys}</div>
          <p className="text-xs text-muted-foreground">
            {stats.surveysDelta >= 0 ? '+' : ''}{stats.surveysDelta} since last month
          </p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Responses</CardTitle>
          <IconMessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.responses.toLocaleString()}</div>
          <p className={`text-xs ${stats.responsesUp ? 'text-green-600' : 'text-red-600'}`}>
            {stats.responsesDelta} from last week
          </p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
          <IconChartBar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.satisfaction}</div>
          <p className="text-xs text-muted-foreground">{stats.satisfactionNote}</p>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <IconActivity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.replyRate}</div>
          <p className="text-xs text-muted-foreground">{stats.replyNote}</p>
        </CardContent>
      </Card>
    </div>
  )
}
