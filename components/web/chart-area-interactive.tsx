// components/web/chart-area-interactive.tsx
'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"

// Mock data: Monthly response collection trend for FeedLoop
const responseTrendData = [
  { month: 'Jul', responses: 120 },
  { month: 'Aug', responses: 180 },
  { month: 'Sep', responses: 340 },
  { month: 'Oct', responses: 520 },
  { month: 'Nov', responses: 780 },
  { month: 'Dec', responses: 1240 },
  { month: 'Jan', responses: 1847 },
]

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()

  return (
    <Card className="glass overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Response Collection Trend
        </CardTitle>
        <CardDescription className="text-sm">
          Total feedback responses collected over the last 7 months — growing steadily!
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 pt-4">
        <div className={isMobile ? "h-60" : "h-80"}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={responseTrendData}
              margin={{
                top: isMobile ? 5 : 10,
                right: isMobile ? 10 : 30,
                left: isMobile ? 0 : 0,
                bottom: isMobile ? 5 : 0,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted/40" 
                vertical={isMobile ? false : true} // Hide vertical grid on mobile for cleanliness
              />

              <XAxis 
                dataKey="month" 
                stroke="#888888" 
                fontSize={isMobile ? 10 : 12} 
                tickLine={false} 
                axisLine={false} 
                interval={isMobile ? 'preserveStartEnd' : 0} // Fewer ticks on mobile
                angle={isMobile ? -45 : 0} // Rotate labels on small screens
                textAnchor="end"
              />

              <YAxis 
                stroke="#888888" 
                fontSize={isMobile ? 10 : 12} 
                tickLine={false} 
                axisLine={false} 
                width={isMobile ? 30 : 40}
                tickFormatter={(value) => `${value}`}
              />

              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 46, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '8px', 
                  backdropFilter: 'blur(8px)',
                  color: '#e0e0e0',
                  padding: '10px 14px',
                  fontSize: '12px'
                }} 
                cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
              />

              <Area
                type="monotone"
                dataKey="responses"
                stroke="#8b5cf6"           // Vibrant purple stroke
                fill="url(#colorResponses)" // Gradient fill
                strokeWidth={2.5}
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 8 }}
              />

              {/* Beautiful gradient fill */}
              <defs>
                <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}