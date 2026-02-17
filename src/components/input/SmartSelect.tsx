"use client"

import { OPTION_GUIDANCE } from "@/lib/guidance"
import type { OptionGuidance } from "@/lib/guidance"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SmartSelectProps {
  id: string
  value: string
  onValueChange: (value: string) => void
  options: string[]
  fieldKey: string
  label: string
  recommended?: string
}

const DIFFICULTY_CONFIG = {
  beginner: { label: "Beginner", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  intermediate: { label: "Intermediate", className: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  advanced: { label: "Advanced", className: "bg-red-500/15 text-red-400 border-red-500/25" },
} as const

const AI_SUPPORT_CONFIG = {
  excellent: { label: "Excellent", dotClassName: "bg-emerald-400" },
  good: { label: "Good", dotClassName: "bg-amber-400" },
  limited: { label: "Limited", dotClassName: "bg-red-400" },
} as const

function DifficultyBadge({ difficulty }: { difficulty: OptionGuidance["difficulty"] }) {
  const config = DIFFICULTY_CONFIG[difficulty]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider",
        config.className,
      )}
    >
      {config.label}
    </span>
  )
}

function AiSupportIndicator({ level }: { level: OptionGuidance["aiSupport"] }) {
  const config = AI_SUPPORT_CONFIG[level]
  return (
    <span className="inline-flex items-center gap-1">
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dotClassName)} />
      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
        AI: {config.label}
      </span>
    </span>
  )
}

export function SmartSelect({
  id,
  value,
  onValueChange,
  options,
  fieldKey,
  label,
  recommended,
}: SmartSelectProps) {
  const guidanceMap = OPTION_GUIDANCE[fieldKey] ?? {}

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
      >
        {label}
      </Label>
      <div id={id} role="radiogroup" aria-label={label} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const guidance = guidanceMap[option]
          const isSelected = value === option
          const isRecommended = recommended === option

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onValueChange(option)}
              className={cn(
                "group relative flex flex-col gap-1.5 rounded-none border px-3 py-2.5 text-left transition-colors",
                "hover:border-muted-foreground/50 hover:bg-muted/30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card",
              )}
            >
              {/* Top row: name + recommended badge */}
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-mono text-xs font-bold",
                  isSelected ? "text-primary" : "text-foreground",
                )}>
                  {option}
                </span>
                {isRecommended && (
                  <Badge
                    variant="outline"
                    className="border-primary/40 bg-primary/10 px-1.5 py-0 font-mono text-[9px] font-bold uppercase tracking-wider text-primary"
                  >
                    Rec
                  </Badge>
                )}
              </div>

              {/* Guidance details if available */}
              {guidance && (
                <>
                  <p className="font-mono text-[10px] leading-tight text-muted-foreground line-clamp-1">
                    {guidance.summary}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <DifficultyBadge difficulty={guidance.difficulty} />
                    <AiSupportIndicator level={guidance.aiSupport} />
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
