"use client"

import { useState } from "react"
import { useProjectSpecs } from "@/hooks/use-project-specs"
import { QA_STEPS } from "@/lib/constants"
import type { ProjectSpecs } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface InteractiveQAProps {
  onComplete: () => void
}

export function InteractiveQA({ onComplete }: InteractiveQAProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { specs, setField } = useProjectSpecs()
  const step = QA_STEPS[currentStep]
  const progress = ((currentStep + 1) / QA_STEPS.length) * 100

  const handleFieldChange = (key: string, value: string) => {
    if (key === "features") {
      setField("features", value.split(",").map((f) => f.trim()).filter(Boolean))
    } else {
      setField(key as keyof ProjectSpecs, value)
    }
  }

  const getFieldValue = (key: string): string => {
    if (key === "features") {
      return specs.features.join(", ")
    }
    return (specs[key as keyof ProjectSpecs] as string) || ""
  }

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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{step.title}</CardTitle>
          <CardDescription className="font-mono text-xs">{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.fields.map((field) => (
            <div key={field.key} className="space-y-1.5">
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
              {field.type === "select" && field.options && (
                <Select
                  value={getFieldValue(field.key)}
                  onValueChange={(v) => handleFieldChange(field.key, v)}
                >
                  <SelectTrigger id={field.key} className="font-mono text-xs">
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt} className="font-mono text-xs">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
          className="font-mono text-[11px] font-semibold tracking-wider uppercase"
        >
          <ChevronLeft className="mr-1 h-3.5 w-3.5" />
          Back
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
