"use client"

import { useState, useEffect } from "react"
import { useProjectSpecs } from "@/hooks/use-project-specs"
import { useApiKey } from "@/hooks/use-api-key"
import { useGeneration } from "@/hooks/use-generation"
import type { InputMode, OutputMode } from "@/lib/types"
import { InputModeSelector } from "@/components/input/InputModeSelector"
import { InteractiveQA } from "@/components/input/InteractiveQA"
import { FreeTextInput } from "@/components/input/FreeTextInput"
import { SpecsReview } from "@/components/input/SpecsReview"
import { OutputModeSelector } from "@/components/output/OutputModeSelector"
import { StreamingOutput } from "@/components/output/StreamingOutput"
import { ResultsPanel } from "@/components/output/ResultsPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Sparkles, RotateCcw, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const [inputMode, setInputMode] = useState<InputMode>("interactive")
  const [outputMode, setOutputMode] = useState<OutputMode>("claude-md")
  const [showReview, setShowReview] = useState(false)
  const { specs } = useProjectSpecs()
  const { apiKey, model, isLoaded } = useApiKey()
  const { status, files, streamingContent, error, generate, abort, reset } = useGeneration()

  const handleGenerate = () => {
    generate(specs, outputMode, apiKey, model)
  }

  // Cmd+Enter shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && showReview && apiKey && status === "idle") {
        handleGenerate()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  const handleReset = () => {
    reset()
    setShowReview(false)
  }

  if (!isLoaded) return null

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Panel */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Project Specs</h2>
            <InputModeSelector mode={inputMode} onModeChange={setInputMode} />
          </div>

          {!showReview ? (
            inputMode === "interactive" ? (
              <InteractiveQA onComplete={() => setShowReview(true)} />
            ) : (
              <FreeTextInput onComplete={() => setShowReview(true)} />
            )
          ) : (
            <div className="space-y-4">
              <SpecsReview />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReview(false)}
              >
                Back to Input
              </Button>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Output</h2>
            <OutputModeSelector mode={outputMode} onModeChange={setOutputMode} />
          </div>

          {!apiKey && (
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="text-sm font-medium">API key required</p>
                  <p className="text-xs text-muted-foreground">
                    <Link href="/settings" className="underline">Configure your API key</Link> to generate prompts.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {showReview && apiKey && status === "idle" && (
            <div className="space-y-2">
              <Button onClick={handleGenerate} className="w-full" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Prompts
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {navigator.platform?.includes("Mac") ? "Cmd" : "Ctrl"}+Enter
              </p>
            </div>
          )}

          {status === "generating" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </div>
                <Button variant="outline" size="sm" onClick={abort}>
                  Cancel
                </Button>
              </div>
              <StreamingOutput content={streamingContent} isStreaming={true} />
            </div>
          )}

          {status === "complete" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Generated {files.length} file{files.length !== 1 ? "s" : ""}
                </p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" />
                  Start Over
                </Button>
              </div>
              <ResultsPanel files={files} projectName={specs.projectName} />
            </div>
          )}

          {status === "error" && (
            <Card className="border-destructive">
              <CardContent className="py-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p className="text-sm font-medium text-destructive">Generation failed</p>
                </div>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {!showReview && status === "idle" && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <p className="text-sm">Complete the project specs to start generating.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
