"use client"

import { useState } from "react"
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react"
import { STEP_GUIDANCE } from "@/lib/guidance"

interface StepGuidanceProps {
  stepId: string
}

export function StepGuidance({ stepId }: StepGuidanceProps) {
  const [isOpen, setIsOpen] = useState(true)
  const guidance = STEP_GUIDANCE[stepId]

  if (!guidance) return null

  return (
    <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2"
      >
        <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wide text-primary">
          <Lightbulb className="h-3.5 w-3.5 shrink-0" />
          {guidance.headline}
        </span>
        {isOpen ? (
          <ChevronUp className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-2 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {guidance.explanation}
            </p>

            <div className="space-y-1">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Tips
              </span>
              <ul className="space-y-0.5">
                {guidance.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="text-xs text-muted-foreground pl-2"
                  >
                    <span className="mr-1.5">&#8226;</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {guidance.example && (
              <div className="bg-muted/40 rounded-md px-2.5 py-1.5">
                <p className="text-xs text-muted-foreground italic">
                  <span className="font-semibold not-italic">Example:</span>{" "}
                  &ldquo;{guidance.example}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
