"use client"

import type { OutputMode } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { FileCode, FolderTree } from "lucide-react"

interface OutputModeSelectorProps {
  mode: OutputMode
  onModeChange: (mode: OutputMode) => void
}

export function OutputModeSelector({ mode, onModeChange }: OutputModeSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={mode === "claude-md" ? "default" : "outline"}
        onClick={() => onModeChange("claude-md")}
        className="flex-1 font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        <FileCode className="mr-2 h-3.5 w-3.5" />
        CLAUDE.md + Prompts
      </Button>
      <Button
        variant={mode === "full-scaffold" ? "default" : "outline"}
        onClick={() => onModeChange("full-scaffold")}
        className="flex-1 font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        <FolderTree className="mr-2 h-3.5 w-3.5" />
        Full Scaffold
      </Button>
    </div>
  )
}
