"use client"

import { useState } from "react"
import { useProjectSpecs } from "@/hooks/use-project-specs"
import { useExtractSpecs } from "@/hooks/use-extract-specs"
import { useApiKey } from "@/hooks/use-api-key"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, FileText } from "lucide-react"

interface FreeTextInputProps {
  onComplete: () => void
}

const STARTER_TEMPLATES = [
  {
    label: "SaaS App",
    text: "I want to build a SaaS web application where users can sign up, log in, and manage their account. The app needs a dashboard with key metrics, user settings, and a billing page with Stripe integration for monthly subscriptions. It should have a clean, modern design and work well on mobile devices.",
  },
  {
    label: "Marketplace",
    text: "I want to build a two-sided marketplace where sellers can list products and buyers can browse, search, and purchase items. Sellers need a dashboard to manage their listings, track orders, and see sales analytics. Buyers need a shopping cart, checkout with payment processing, and order history.",
  },
  {
    label: "Internal Tool",
    text: "I need an internal dashboard for my team to manage customer data. It should have a data table with search, filter, and sort capabilities, the ability to create and edit customer records, role-based access control (admin vs. viewer), and export functionality for reports. Only team members with approved email domains should be able to log in.",
  },
]

export function FreeTextInput({ onComplete }: FreeTextInputProps) {
  const [freeText, setFreeText] = useState("")
  const { setSpecs } = useProjectSpecs()
  const { extractSpecs, isExtracting, error } = useExtractSpecs()
  const { apiKey, model, provider } = useApiKey()

  const handleExtract = async () => {
    if (!freeText.trim() || !apiKey) return

    const specs = await extractSpecs(freeText, apiKey, model, provider)
    if (specs) {
      setSpecs(specs)
      onComplete()
    }
  }

  return (
    <div className="space-y-4">
      {/* Starter templates */}
      <div className="space-y-1.5">
        <span className="font-mono text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          Start from a template
        </span>
        <div className="flex flex-wrap gap-1.5">
          {STARTER_TEMPLATES.map((t) => (
            <Button
              key={t.label}
              variant="outline"
              size="sm"
              onClick={() => setFreeText(t.text)}
              className="font-mono text-[11px]"
            >
              <FileText className="h-3 w-3" />
              {t.label}
            </Button>
          ))}
        </div>
      </div>

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
          placeholder="Describe what you want to build. Include who will use it, what they can do, and any specific features you need. The more detail you provide, the better your generated prompts will be..."
          rows={12}
          className="font-mono text-xs"
        />
        <p className="font-mono text-[10px] text-muted-foreground tracking-wide">
          Tip: Mention your target users, core features, and how you plan to use AI tools to build it. Our AI will extract all the technical specs automatically.
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
