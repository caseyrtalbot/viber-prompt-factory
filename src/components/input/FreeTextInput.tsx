"use client"

import { useState } from "react"
import { useProjectSpecs } from "@/hooks/use-project-specs"
import { useExtractSpecs } from "@/hooks/use-extract-specs"
import { useApiKey } from "@/hooks/use-api-key"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles } from "lucide-react"

interface FreeTextInputProps {
  onComplete: () => void
}

export function FreeTextInput({ onComplete }: FreeTextInputProps) {
  const [freeText, setFreeText] = useState("")
  const { setSpecs } = useProjectSpecs()
  const { extractSpecs, isExtracting, error } = useExtractSpecs()
  const { apiKey, model } = useApiKey()

  const handleExtract = async () => {
    if (!freeText.trim() || !apiKey) return

    const specs = await extractSpecs(freeText, apiKey, model)
    if (specs) {
      setSpecs(specs)
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="freetext"
          className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
        >
          Paste your project specs, PRD, or description
        </Label>
        <Textarea
          id="freetext"
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="Paste your project requirements, PRD, feature specs, or just describe what you want to build in as much detail as possible..."
          rows={12}
          className="font-mono text-xs"
        />
        <p className="font-mono text-[10px] text-muted-foreground tracking-wide">
          The more detail you provide, the better the generated prompts will be.
        </p>
      </div>

      {!apiKey && (
        <p className="font-mono text-xs text-destructive">
          Please configure your API key in Settings first.
        </p>
      )}

      {error && (
        <p className="font-mono text-xs text-destructive">{error}</p>
      )}

      <Button
        onClick={handleExtract}
        disabled={!freeText.trim() || !apiKey || isExtracting}
        className="w-full font-mono text-[11px] font-bold tracking-wider uppercase"
      >
        {isExtracting ? (
          <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-3.5 w-3.5" />
        )}
        {isExtracting ? "Extracting specs..." : "Extract & Review Specs"}
      </Button>
    </div>
  )
}
