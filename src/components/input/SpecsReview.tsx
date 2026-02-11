"use client"

import { useProjectSpecs } from "@/hooks/use-project-specs"
import type { ProjectSpecs } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SpecsReview() {
  const { specs, setField } = useProjectSpecs()

  const handleFieldChange = (key: string, value: string) => {
    if (key === "features") {
      setField("features", value.split(",").map((f) => f.trim()).filter(Boolean))
    } else {
      setField(key as keyof ProjectSpecs, value)
    }
  }

  const fields = [
    { key: "projectName", label: "Project Name", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "framework", label: "Framework", type: "text" },
    { key: "language", label: "Language", type: "text" },
    { key: "styling", label: "Styling", type: "text" },
    { key: "database", label: "Database", type: "text" },
    { key: "orm", label: "ORM", type: "text" },
    { key: "auth", label: "Authentication", type: "text" },
    { key: "hosting", label: "Hosting", type: "text" },
    { key: "features", label: "Features", type: "features" },
    { key: "architecture", label: "Architecture", type: "textarea" },
    { key: "constraints", label: "Constraints", type: "textarea" },
    { key: "aiUsage", label: "AI Usage", type: "textarea" },
    { key: "goals", label: "Goals", type: "textarea" },
  ] as const

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Edit Specs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <Label htmlFor={`review-${field.key}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {field.label}
            </Label>
            {field.type === "text" && (
              <Input
                id={`review-${field.key}`}
                value={(specs[field.key as keyof ProjectSpecs] as string) || ""}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="h-8 text-sm"
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                id={`review-${field.key}`}
                value={(specs[field.key as keyof ProjectSpecs] as string) || ""}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                rows={2}
                className="text-sm"
              />
            )}
            {field.type === "features" && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {specs.features.map((f, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
                <Input
                  id={`review-${field.key}`}
                  value={specs.features.join(", ")}
                  onChange={(e) => handleFieldChange("features", e.target.value)}
                  placeholder="Comma-separated features"
                  className="h-8 text-sm"
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
