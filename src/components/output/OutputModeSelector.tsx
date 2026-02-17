"use client"

import type { OutputMode } from "@/lib/types"
import { FileCode, FolderTree } from "lucide-react"

interface OutputModeSelectorProps {
  mode: OutputMode
  onModeChange: (mode: OutputMode) => void
}

export function OutputModeSelector({ mode, onModeChange }: OutputModeSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onModeChange("claude-md")}
        className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
          mode === "claude-md"
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <FileCode className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
            CLAUDE.md + Prompts
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
          A project context file and step-by-step build prompts. Great for getting started quickly.
        </p>
      </button>
      <button
        onClick={() => onModeChange("full-scaffold")}
        className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
          mode === "full-scaffold"
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <FolderTree className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
            Full Scaffold
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
          Everything above plus a project plan, checklists, and coding rules. Best for larger builds.
        </p>
      </button>
    </div>
  )
}
