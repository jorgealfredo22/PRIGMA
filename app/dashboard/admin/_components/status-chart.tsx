"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatusData {
  status: string
  count: number
}

interface StatusChartProps {
  data: StatusData[]
}

export function StatusChart({ data }: StatusChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Estado de Licencias</CardTitle>
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
        <CardTitle>Estado de Licencias</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <BarChart width={500} height={300} data={data}>
          <XAxis dataKey="status" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} allowDecimals={false} />
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
          <Bar dataKey="count" fill="#8b5cf6" radius={4} />
        </BarChart>
      </CardContent>
    </Card>
  )
}
