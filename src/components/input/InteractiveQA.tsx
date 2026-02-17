"use client"

import { useState, useMemo } from "react"
import { useProjectSpecs } from "@/hooks/use-project-specs"
import { QA_STEPS } from "@/lib/constants"
import { getCompatibilityHints } from "@/lib/guidance"
import type { ProjectSpecs } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check, AlertTriangle, Lightbulb } from "lucide-react"
import { StepGuidance } from "@/components/input/StepGuidance"
import { SmartSelect } from "@/components/input/SmartSelect"
import { FeatureSuggestions } from "@/components/input/FeatureSuggestions"
import { StackStarter } from "@/components/input/StackStarter"

interface InteractiveQAProps {
  onComplete: () => void
}

function getRecommended(fieldKey: string, specs: ProjectSpecs): string | undefined {
  switch (fieldKey) {
    case "framework":
      return "Next.js 14 (App Router)"
    case "language":
      return "TypeScript"
    case "styling":
      return specs.framework === "Express.js" || specs.framework === "Fastify"
        ? "None (API only)"
        : "Tailwind CSS"
    case "database":
      return "Supabase"
    case "orm":
      if (specs.database === "MongoDB") return "Mongoose"
      if (specs.database === "None") return "None"
      return "Prisma"
    case "auth":
      if (specs.database === "Supabase") return "Supabase Auth"
      if (specs.database === "Firebase") return "Firebase Auth"
      if (specs.framework?.includes("Next.js")) return "NextAuth / Auth.js"
      return "Clerk"
    case "hosting":
      if (specs.framework?.includes("Next.js")) return "Vercel"
      if (specs.framework === "Astro") return "Netlify"
      if (specs.framework === "Express.js" || specs.framework === "Fastify") return "Railway"
      return "Vercel"
    default:
      return undefined
  }
}

export function InteractiveQA({ onComplete }: InteractiveQAProps) {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = template picker
  const { specs, setField, setSpecs } = useProjectSpecs()
  const progress = currentStep < 0 ? 0 : ((currentStep + 1) / QA_STEPS.length) * 100

  const hints = useMemo(() => getCompatibilityHints(specs), [specs])

  const handleFieldChange = (key: string, value: string) => {
    if (key === "features") {
      setField("features", value.split(",").map((f) => f.trim()).filter(Boolean))
    } else {
      setField(key as keyof ProjectSpecs, value)
    }
  }

  const handleAddFeatures = (newFeatures: string[]) => {
    setField("features", [...specs.features, ...newFeatures])
  }

  const getFieldValue = (key: string): string => {
    if (key === "features") {
      return specs.features.join(", ")
    }
    return (specs[key as keyof ProjectSpecs] as string) || ""
  }

  const handleTemplateSelect = (templateSpecs: Partial<ProjectSpecs>) => {
    setSpecs({ ...specs, ...templateSpecs })
    setCurrentStep(0)
  }

  // Template picker screen
  if (currentStep < 0) {
    return (
      <StackStarter
        onSelect={handleTemplateSelect}
        onSkip={() => setCurrentStep(0)}
      />
    )
  }

  const step = QA_STEPS[currentStep]

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-1" />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Step {String(currentStep + 1).padStart(2, "0")} of {String(QA_STEPS.length).padStart(2, "0")}
        </span>
        <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          {step.title}
        </span>
      </div>

      <StepGuidance stepId={step.id} />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{step.title}</CardTitle>
          <CardDescription className="font-mono text-xs">{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
              {field.type === "select" && field.options ? (
                <SmartSelect
                  id={field.key}
                  value={getFieldValue(field.key)}
                  onValueChange={(v) => handleFieldChange(field.key, v)}
                  options={field.options}
                  fieldKey={field.key}
                  label={field.label}
                  recommended={getRecommended(field.key, specs)}
                />
              ) : (
                <>
                  <Label
                    htmlFor={field.key}
                    className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                  >
                    {field.label}
                  </Label>
                  {field.type === "text" && (
                    <Input
                      id={field.key}
                      value={getFieldValue(field.key)}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="font-mono text-xs"
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.key}
                      value={getFieldValue(field.key)}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="font-mono text-xs"
                    />
                  )}
                </>
              )}
            </div>
          ))}

          {/* Feature suggestions on the features step */}
          {step.id === "features" && (
            <FeatureSuggestions
              currentFeatures={specs.features}
              onAddFeatures={handleAddFeatures}
            />
          )}
        </CardContent>
      </Card>

      {/* Compatibility hints */}
      {hints.length > 0 && (
        <div className="space-y-1.5">
          {hints.map((hint, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${
                hint.type === "warning"
                  ? "border-amber-500/30 bg-amber-500/5 text-amber-300"
                  : "border-primary/30 bg-primary/5 text-primary"
              }`}
            >
              {hint.type === "warning" ? (
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              ) : (
                <Lightbulb className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              )}
              <span className="font-mono text-[11px] leading-relaxed">{hint.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          className="font-mono text-[11px] font-semibold tracking-wider uppercase"
        >
          <ChevronLeft className="mr-1 h-3.5 w-3.5" />
          {currentStep === 0 ? "Templates" : "Back"}
        </Button>

        {currentStep < QA_STEPS.length - 1 ? (
          <Button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            Next
            <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            onClick={onComplete}
            className="font-mono text-[11px] font-bold tracking-wider uppercase"
          >
            <Check className="mr-1 h-3.5 w-3.5" />
            Review Specs
          </Button>
        )}
      </div>
    </div>
  )
}
