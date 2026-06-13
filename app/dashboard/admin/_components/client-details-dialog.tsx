"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, Copy, Check } from "lucide-react"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={handleCopy} title="Copiar al portapapeles">
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
    </Button>
  )
}

function JsonViewer({ data, level = 0 }: { data: any, level?: number }) {
  if (data === null || data === undefined) return <span className="text-muted-foreground text-sm">Vacío</span>

  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return (
      <div className="flex gap-2 w-full mt-1">
        <Input readOnly value={String(data)} className="flex-1 bg-muted/30" />
        <CopyButton text={String(data)} />
      </div>
    )
  }

  if (Array.isArray(data)) {
    return (
      <div className="flex flex-col gap-3 mt-1 w-full">
        {data.map((item, index) => (
          <div key={index} className="pl-4 border-l-2 border-muted-foreground/30 relative py-1">
            <span className="absolute -left-[9px] top-3 h-4 w-4 rounded-full bg-background border-2 border-muted-foreground/30 flex items-center justify-center text-[8px] font-bold text-muted-foreground">
              {index + 1}
            </span>
            <JsonViewer data={item} level={level + 1} />
          </div>
        ))}
      </div>
    )
  }

  if (typeof data === "object") {
    return (
      <div className="grid gap-4 mt-1 w-full">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className={`space-y-1 ${level > 0 ? 'bg-muted/10 p-4 rounded-lg border' : ''}`}>
            <Label className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
              {key.replace(/_/g, " ")}
            </Label>
            <JsonViewer data={value} level={level + 1} />
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function ClientDetailsDialog({ metadata }: { metadata: any }) {
  const [open, setOpen] = useState(false)
  
  const hasMetadata = metadata && Object.keys(metadata).length > 0
  
  if (!hasMetadata) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Ver información estructurada">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Información Adicional del Cliente</DialogTitle>
        </DialogHeader>
        <div className="mt-4 pb-4">
          <JsonViewer data={metadata} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
