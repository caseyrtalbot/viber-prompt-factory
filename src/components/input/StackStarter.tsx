"use client"

import { Rocket, Layout, BarChart3, Zap, ShoppingCart, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RECOMMENDED_STACKS } from "@/lib/guidance"
import type { ProjectSpecs } from "@/lib/types"

interface StackStarterProps {
  onSelect: (specs: Partial<ProjectSpecs>) => void
  onSkip: () => void
}

const STACK_ICONS: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "SaaS Web App": Rocket,
  "Landing Page": Layout,
  "Internal Tool": BarChart3,
  "API Service": Zap,
  "E-commerce Store": ShoppingCart,
  "Mobile-First PWA": Smartphone,
}

function getStackTechSummary(specs: Partial<ProjectSpecs>): string {
  const parts = [specs.framework, specs.database, specs.orm].filter(
    (v) => v && v !== "None"
  )
  return parts.join(" + ")
}

export function StackStarter({ onSelect, onSkip }: StackStarterProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold mb-1">
          Start with a template — or build from scratch
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Pick a starting point and customize it in the next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RECOMMENDED_STACKS.map((template) => {
          const Icon = STACK_ICONS[template.label]
          return (
            <div
              key={template.label}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(template.specs)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onSelect(template.specs)
                }
              }}
              className="border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
                <span className="font-mono text-xs font-bold tracking-wide">
                  {template.label}
                </span>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground">
                {getStackTechSummary(template.specs)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {template.description}
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center pt-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="font-mono text-[11px] tracking-wide text-muted-foreground"
        >
          Skip — I'll configure from scratch
        </Button>
      </div>
    </div>
  )
}
