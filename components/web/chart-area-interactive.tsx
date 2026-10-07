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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'

export type TrendPoint = { month: string; responses: number }

export function ChartAreaInteractive({ data }: { data: TrendPoint[] }) {
  const isMobile = useIsMobile()
  const total = data.reduce((sum, point) => sum + point.responses, 0)

  return (
    <Card className="glass overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Response Collection Trend</CardTitle>
        <CardDescription className="text-sm">
          {total === 0
            ? 'No responses in the last 7 months yet.'
            : `${total.toLocaleString()} responses on your surveys over the last 7 months.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className={isMobile ? 'h-60' : 'h-80'}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: isMobile ? 5 : 10,
                right: isMobile ? 10 : 30,
                left: 0,
                bottom: isMobile ? 5 : 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" vertical={!isMobile} />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={isMobile ? 10 : 12}
                tickLine={false}
                axisLine={false}
                interval={isMobile ? 'preserveStartEnd' : 0}
                angle={isMobile ? -45 : 0}
                textAnchor="end"
              />
              <YAxis
                stroke="#888888"
                fontSize={isMobile ? 10 : 12}
                tickLine={false}
                axisLine={false}
                width={isMobile ? 30 : 40}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(30, 30, 46, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  padding: '10px 14px',
                  fontSize: '12px',
                }}
                cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="responses"
                stroke="#8b5cf6"
                fill="url(#colorResponses)"
                strokeWidth={2.5}
                dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: isMobile ? 3 : 4 }}
                activeDot={{ r: isMobile ? 5 : 8 }}
              />
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
