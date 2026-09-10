"use client"

import * as React from "react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Sparkles,
  Loader2,
  FileCode,
  FileText,
  HelpCircle,
  UploadCloud,
  Check,
  Layers,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  seedPrigmateTasksAction,
  importCustomRoadmapAction,
} from "../tasks/actions"

const EXAMPLE_TEXT_FORMAT = `BE-01 | Controlador de SLA en Rails | Backend Developer | alta | 2
BE-02 | Motor de Roles Personalizados | Backend Developer | alta | 3
BE-03 | Servicio de Triage IA | Backend Developer | urgente | 3
FE-01 | Vista de Configuración IA | Frontend Developer | urgente | 3
AI-01 | Prompt de Clasificación | AI Engineer | urgente | 1
QA-01 | Pruebas de Triage en Chat | QA Tester | alta | 2`

const EXAMPLE_JSON_FORMAT = `[
  {
    "task_code": "BE-01",
    "title": "Controlador de SLA en Rails",
    "description": "Detalles técnicos...",
    "assignee_name": "christianmartinez3h@gmail.com",
    "priority": "high",
    "estimated_days": 2.0
  }
]`

interface RoadmapDialogProps {
  trigger?: React.ReactNode
}

export function RoadmapDialog({ trigger }: RoadmapDialogProps = {}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [mode, setMode] = useState<"merge" | "replace">("merge")
  const [formatType, setFormatType] = useState<"text" | "json">("text")
  const [content, setContent] = useState("")
  const [projectName, setProjectName] = useState("Prigmate")

  function handleLoadPrigmateTemplate() {
    startTransition(async () => {
      const toastId = toast.loading("Cargando las 14 tareas oficiales de Prigmate...")
      try {
        const res = await seedPrigmateTasksAction()
        if (res.success) {
          toast.success("Roadmap de Prigmate cargado exitosamente", { id: toastId })
          setOpen(false)
          router.refresh()
        } else {
          toast.error(res.error || "Error al cargar roadmap", { id: toastId })
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error inesperado", { id: toastId })
      }
    })
  }

  function parseTextLines(text: string) {
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
    return lines.map((line, idx) => {
      const parts = line.split("|").map((p) => p.trim())
      // Format: CODE | Title | Assignee | Priority | Days
      const task_code = parts[0] || `TSK-${idx + 1}`
      const title = parts[1] || parts[0]
      const assignee_name = parts[2] || "Christian"
      let priority = (parts[3] || "media").toLowerCase()
      if (priority.includes("urg")) priority = "urgent"
      else if (priority.includes("alt") || priority.includes("high")) priority = "high"
      else if (priority.includes("baj") || priority.includes("low")) priority = "low"
      else priority = "medium"

      const days = parseFloat(parts[4] || "1")
      const estimated_days = isNaN(days) ? 1.0 : days

      return {
        task_code,
        title,
        assignee_name,
        priority,
        estimated_days,
        project: projectName,
      }
    })
  }

  function handleImportCustom() {
    if (!content.trim()) {
      toast.error("Por favor ingresa o pega el contenido del roadmap")
      return
    }

    startTransition(async () => {
      const toastId = toast.loading("Procesando y guardando nuevo roadmap...")
      try {
        let parsedTasks: any[] = []

        if (formatType === "json") {
          try {
            parsedTasks = JSON.parse(content)
            if (!Array.isArray(parsedTasks)) {
              throw new Error("El JSON debe ser un arreglo de tareas [ { ... } ]")
            }
          } catch (e: any) {
            toast.error(`JSON inválido: ${e.message}`, { id: toastId })
            return
          }
        } else {
          parsedTasks = parseTextLines(content)
        }

        if (parsedTasks.length === 0) {
          toast.error("No se detectaron tareas válidas en el texto", { id: toastId })
          return
        }

        const res = await importCustomRoadmapAction({
          tasks: parsedTasks,
          mode,
          project: projectName,
        })

        if (res.success) {
          toast.success(`¡Roadmap actualizado con éxito (${res.count} tareas)!`, {
            id: toastId,
          })
          setOpen(false)
          setContent("")
          router.refresh()
        } else {
          toast.error(res.error || "No se pudo importar el roadmap", { id: toastId })
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error inesperado", { id: toastId })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs shadow-sm bg-background hover:bg-muted font-medium"
          >
            <Layers className="h-4 w-4 text-primary" />
            <span>Cargar / Cambiar Roadmap</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Gestión y Carga de Roadmap
          </DialogTitle>
          <DialogDescription>
            Aquí puedes precargar el roadmap oficial de Prigmate o pegar tu propia lista de tareas personalizada.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Option 1: Official Prigmate Template */}
          <div className="p-4 rounded-lg border bg-muted/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Roadmap Oficial de Prigmate (14 Tareas)
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Carga las 14 tareas prioritarias de Backend, Frontend, IA y QA del documento técnico.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLoadPrigmateTemplate}
                disabled={isPending}
                className="shrink-0 text-xs"
              >
                {isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                Cargar Prigmate (14 Tareas)
              </Button>
            </div>
          </div>

          {/* Option 2: Custom Roadmap Input */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm flex items-center gap-1.5">
                <UploadCloud className="h-4 w-4 text-blue-500" />
                Cargar o Importar Nuevo Roadmap Personalizado
              </h4>

              {/* Format selector buttons */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-md text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFormatType("text")
                    if (!content) setContent(EXAMPLE_TEXT_FORMAT)
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    formatType === "text"
                      ? "bg-background font-medium shadow-xs text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Texto Simple (Líneas)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormatType("json")
                    if (!content) setContent(EXAMPLE_JSON_FORMAT)
                  }}
                  className={`px-2 py-1 rounded transition-colors ${
                    formatType === "json"
                      ? "bg-background font-medium shadow-xs text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  JSON Estructurado
                </button>
              </div>
            </div>

            {/* Instruction box */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-md text-xs text-blue-800 dark:text-blue-300 space-y-1 border border-blue-200 dark:border-blue-900">
              <p className="font-semibold flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" />
                {formatType === "text"
                  ? "¿Cómo formatear el texto? (Separado por plecas |)"
                  : "¿Cómo formatear el JSON?"}
              </p>
              {formatType === "text" ? (
                <p className="leading-relaxed">
                  Escribe una tarea por renglón con este orden:
                  <code className="block mt-1 font-mono font-bold bg-blue-100/80 dark:bg-blue-900/60 p-1.5 rounded text-[11px]">
                    CÓDIGO | Título de la tarea | Asignado (o correo) | Prioridad (baja/media/alta/urgente) | Días
                  </code>
                </p>
              ) : (
                <p className="leading-relaxed">
                  Pega un arreglo de objetos con las propiedades:
                  <code className="block mt-1 font-mono font-bold bg-blue-100/80 dark:bg-blue-900/60 p-1.5 rounded text-[11px]">
                    task_code, title, assignee_name, priority, estimated_days
                  </code>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="project-name" className="text-xs font-semibold">
                  Nombre del Proyecto
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Prigmate"
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Modo de Carga</Label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="import-mode"
                      value="merge"
                      checked={mode === "merge"}
                      onChange={() => setMode("merge")}
                      className="text-primary"
                    />
                    <span>Agregar a existentes (Merge)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer text-destructive">
                    <input
                      type="radio"
                      name="import-mode"
                      value="replace"
                      checked={mode === "replace"}
                      onChange={() => setMode("replace")}
                      className="text-destructive"
                    />
                    <span>Reemplazar todo</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="roadmap-content" className="text-xs font-semibold">
                  Pega aquí tu lista de tareas:
                </Label>
                <button
                  type="button"
                  onClick={() =>
                    setContent(
                      formatType === "text" ? EXAMPLE_TEXT_FORMAT : EXAMPLE_JSON_FORMAT
                    )
                  }
                  className="text-[11px] text-primary hover:underline"
                >
                  Cargar ejemplo de prueba
                </button>
              </div>
              <Textarea
                id="roadmap-content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  formatType === "text"
                    ? EXAMPLE_TEXT_FORMAT
                    : EXAMPLE_JSON_FORMAT
                }
                className="font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
          <Button
            size="sm"
            onClick={handleImportCustom}
            disabled={isPending || !content.trim()}
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <UploadCloud className="h-3.5 w-3.5 mr-1.5" />
                Cargar este Roadmap
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
