"use client"

import { useMemo } from "react"
import { Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FEATURE_TEMPLATES } from "@/lib/guidance"

interface FeatureSuggestionsProps {
  currentFeatures: string[]
  onAddFeatures: (features: string[]) => void
}

export function FeatureSuggestions({
  currentFeatures,
  onAddFeatures,
}: FeatureSuggestionsProps) {
  const templateStates = useMemo(() => {
    const lowerCurrent = new Set(
      currentFeatures.map((f) => f.toLowerCase().trim())
    )

    return FEATURE_TEMPLATES.map((template) => {
      const allAdded = template.features.every((f) =>
        lowerCurrent.has(f.toLowerCase().trim())
      )
      return { ...template, allAdded }
    })
  }, [currentFeatures])

  const handleClick = (template: (typeof templateStates)[number]) => {
    if (template.allAdded) return

    const lowerCurrent = new Set(
      currentFeatures.map((f) => f.toLowerCase().trim())
    )
    const newFeatures = template.features.filter(
      (f) => !lowerCurrent.has(f.toLowerCase().trim())
    )

    if (newFeatures.length > 0) {
      onAddFeatures(newFeatures)
    }
  }

  return (
    <div className="border border-dashed border-border/50 rounded-lg p-3">
      <p className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
        Quick-add feature packs
      </p>
      <p className="text-[10px] text-muted-foreground mb-2">
        Click to add a set of related features to your list
      </p>
      <div className="flex flex-wrap gap-1.5">
        {templateStates.map((template) => (
          <Button
            key={template.label}
            variant={template.allAdded ? "secondary" : "outline"}
            size="sm"
            disabled={template.allAdded}
            onClick={() => handleClick(template)}
            className="font-mono text-[11px]"
          >
            {template.allAdded ? (
              <Check className="h-3 w-3" />
            ) : (
              <Plus className="h-3 w-3" />
            )}
            {template.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
