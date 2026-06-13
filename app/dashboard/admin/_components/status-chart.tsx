"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
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
      <CardContent className="h-[300px] w-full pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="status" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis width={40} tickLine={false} tickMargin={10} axisLine={false} allowDecimals={false} />
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
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
