// components/web/section-cards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  IconMessageCircle,    // Responses (user feedback)
  IconFileDescription,  // Surveys created
  IconChartBar,         // Average score/trend
  IconActivity,         // Engagement rate or active users
} from "@tabler/icons-react"

export function SectionCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-3">
      {/* Card 1: Total Surveys Created */}
      <Card className="glass"> {/* Keep your glassmorphism if added */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Surveys</CardTitle>
          <IconFileDescription className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+12 since last month</p>
        </CardContent>
      </Card>

      {/* Card 2: Responses Collected */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Responses</CardTitle>
          <IconMessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,342</div>
          <p className="text-xs text-green-600">+18.2% from last week</p>
        </CardContent>
      </Card>

      {/* Card 3: Average Satisfaction / NPS */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Satisfaction</CardTitle>
          <IconChartBar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.7/10</div>
          <p className="text-xs text-green-600">+0.4 from last month</p>
        </CardContent>
      </Card>

      {/* Card 4: Response Rate / Engagement */}
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <IconActivity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42%</div>
          <p className="text-xs text-red-600">-3% from last week</p> {/* Red for negative */}
        </CardContent>
      </Card>
    </div>
  )
}