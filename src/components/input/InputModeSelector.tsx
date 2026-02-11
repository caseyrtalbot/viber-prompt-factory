"use client"

import type { InputMode } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText } from "lucide-react"

interface InputModeSelectorProps {
  mode: InputMode
  onModeChange: (mode: InputMode) => void
}

export function InputModeSelector({ mode, onModeChange }: InputModeSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={mode === "interactive" ? "default" : "outline"}
        onClick={() => onModeChange("interactive")}
        className="flex-1 font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        <MessageSquare className="mr-2 h-3.5 w-3.5" />
        Interactive Q&A
      </Button>
      <Button
        variant={mode === "freetext" ? "default" : "outline"}
        onClick={() => onModeChange("freetext")}
        className="flex-1 font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        <FileText className="mr-2 h-3.5 w-3.5" />
        Paste & Extract
      </Button>
    </div>
  )
}
