"use client"

import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanBreakdown {
  plan: string
  count: number
}

interface LicensesPlanChartProps {
  data: PlanBreakdown[]
}

const PLAN_COLORS: Record<string, string> = {
  monthly: "#8b5cf6",
  annual: "#22c55e",
  lifetime: "#f59e0b",
}

const PLAN_LABELS: Record<string, string> = {
  monthly: "Mensual",
  annual: "Anual",
  lifetime: "Lifetime",
}

export function LicensesPlanChart({ data }: LicensesPlanChartProps) {
  const chartData = data.map((item) => ({
    name: PLAN_LABELS[item.plan] || item.plan,
    value: item.count,
    fill: PLAN_COLORS[item.plan] || "#8b5cf6",
  }))

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Licencias por Plan</CardTitle>
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
        <CardTitle>Licencias por Plan</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <PieChart width={500} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
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
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  )
}
