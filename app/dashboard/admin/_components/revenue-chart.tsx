"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MonthlyRevenue {
  month: string
  revenue: number
}

interface RevenueChartProps {
  data: MonthlyRevenue[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((item) => ({
    month: item.month,
    revenue: item.revenue / 1000000,
  }))

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ingresos Mensuales</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
          Sin datos
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos Mensuales</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <BarChart width={500} height={300} data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip
            formatter={(value) => [`$${value}M COP`, "Ingresos"]}
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#f8fafc",
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            itemStyle={{ color: "#e2e8f0" }}
          />
          <Bar dataKey="revenue" fill="#8b5cf6" radius={4} />
        </BarChart>
      </CardContent>
    </Card>
  )
}
