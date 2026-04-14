"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ClientOnlyChartProps {
  title: string
  loadingText?: string
  height?: number
  children: React.ReactNode
}

export function ClientOnlyChart({
  title,
  loadingText = "Cargando gráfico...",
  height = 300,
  children,
}: ClientOnlyChartProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent style={{ height }} className="flex items-center justify-center">
        {mounted ? (
          children
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">{loadingText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
