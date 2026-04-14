import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlanStats {
  plan: string
  count: number
}

interface PlanDistributionProps {
  data: PlanStats[]
}

const PLAN_LABELS: Record<string, string> = {
  monthly: "Mensual",
  annual: "Anual",
  lifetime: "Lifetime",
}

const PLAN_COLORS: Record<string, string> = {
  monthly: "text-chart-1",
  annual: "text-chart-2",
  lifetime: "text-chart-3",
}

export function PlanDistribution({ data }: PlanDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Planes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item) => {
          const percentage = total > 0 ? (item.count / total) * 100 : 0
          return (
            <div key={item.plan} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {PLAN_LABELS[item.plan] || item.plan}
                </span>
                <span className="font-medium">
                  {item.count} ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${PLAN_COLORS[item.plan] || "bg-chart-1"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}