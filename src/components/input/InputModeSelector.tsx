"use client"

import type { InputMode } from "@/lib/types"
import { MessageSquare, FileText } from "lucide-react"

interface InputModeSelectorProps {
  mode: InputMode
  onModeChange: (mode: InputMode) => void
}

export function InputModeSelector({ mode, onModeChange }: InputModeSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onModeChange("interactive")}
        className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
          mode === "interactive"
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
            Guided Setup
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
          Answer simple questions step by step. Best if you are starting from scratch.
        </p>
      </button>
      <button
        onClick={() => onModeChange("freetext")}
        className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
          mode === "freetext"
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
            Paste & Extract
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
          Already have a doc, PRD, or description? Paste it and AI extracts the specs.
        </p>
      </button>
    </div>
  )
}
