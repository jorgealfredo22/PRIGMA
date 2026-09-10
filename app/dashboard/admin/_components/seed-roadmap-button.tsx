"use client"

import * as React from "react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { seedPrigmateTasksAction } from "../tasks/actions"

export function SeedRoadmapButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSeed() {
    startTransition(async () => {
      const toastId = toast.loading("Precargando las 14 tareas del roadmap de Prigmate...")
      try {
        const res = await seedPrigmateTasksAction()
        if (res.success) {
          toast.success("¡Tareas del roadmap de Prigmate cargadas correctamente!", {
            id: toastId,
          })
          router.refresh()
        } else {
          toast.error(res.error || "No se pudieron precargar las tareas", { id: toastId })
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error inesperado", { id: toastId })
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSeed}
      disabled={isPending}
      className="gap-1.5 text-xs shadow-sm bg-background hover:bg-muted"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-500" />
      ) : (
        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
      )}
      <span>{isPending ? "Precargando..." : "Precargar Roadmap"}</span>
    </Button>
  )
}
