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
      <Progress value={progress} className="h-2" />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Step {currentStep + 1} of {QA_STEPS.length}</span>
        <span>{step.title}</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === "text" && (
                <Input
                  id={field.key}
                  value={getFieldValue(field.key)}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
              {field.type === "textarea" && (
                <Textarea
                  id={field.key}
                  value={getFieldValue(field.key)}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                />
              )}
              {field.type === "select" && field.options && (
                <Select
                  value={getFieldValue(field.key)}
                  onValueChange={(v) => handleFieldChange(field.key, v)}
                >
                  <SelectTrigger id={field.key}>
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
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
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        {currentStep < QA_STEPS.length - 1 ? (
          <Button onClick={() => setCurrentStep((s) => s + 1)}>
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onComplete}>
            <Check className="mr-1 h-4 w-4" />
            Review Specs
          </Button>
        )}
      </div>
    </div>
  )
}
