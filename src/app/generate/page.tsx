"use client"

import { useState, useEffect, useCallback } from "react"
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
import { toast } from "sonner"

export default function GeneratePage() {
  const [inputMode, setInputMode] = useState<InputMode>("interactive")
  const [outputMode, setOutputMode] = useState<OutputMode>("claude-md")
  const [showReview, setShowReview] = useState(false)
  const { specs } = useProjectSpecs()
  const { apiKey, model, provider, isLoaded } = useApiKey()
  const { status, files, streamingContent, error, generate, abort, reset } = useGeneration()

  const handleGenerate = useCallback(() => {
    generate(specs, outputMode, apiKey, model, provider)
  }, [generate, specs, outputMode, apiKey, model, provider])

  // Cmd+Enter shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && showReview && apiKey && status === "idle") {
        handleGenerate()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [showReview, apiKey, status, handleGenerate])

  // Toast on generation complete/error
  useEffect(() => {
    if (status === "complete") {
      toast.success("Generation complete")
    } else if (status === "error" && error) {
      toast.error(error)
    }
  }, [status, error])

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
            <h2 className="text-lg font-bold mb-3">Project Specs</h2>
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
                className="font-mono text-[10px] font-semibold tracking-wider uppercase"
              >
                Back to Input
              </Button>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-3">Output</h2>
            <OutputModeSelector mode={outputMode} onModeChange={setOutputMode} />
          </div>

          {!apiKey && (
            <Card>
              <CardContent className="flex items-center gap-3 py-4">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                <div>
                  <p className="font-mono text-xs font-semibold">API key required</p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    <Link href="/settings" className="text-primary hover:underline">Configure your API key</Link> to generate prompts.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {showReview && apiKey && status === "idle" && (
            <div className="space-y-2">
              <Button
                onClick={handleGenerate}
                className="w-full font-mono text-[11px] font-bold tracking-wider uppercase"
                size="lg"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Prompts
              </Button>
              <p className="text-center font-mono text-[10px] text-muted-foreground tracking-wide">
                {navigator.platform?.includes("Mac") ? "Cmd" : "Ctrl"}+Enter
              </p>
            </div>
          )}

          {status === "generating" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="tracking-wider uppercase">Generating...</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={abort}
                  className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                >
                  Cancel
                </Button>
              </div>
              <StreamingOutput content={streamingContent} isStreaming={true} />
            </div>
          )}

          {status === "complete" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                  Generated {files.length} file{files.length !== 1 ? "s" : ""}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
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
                  <p className="font-mono text-xs font-semibold text-destructive tracking-wide uppercase">Generation failed</p>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="font-mono text-[10px] font-semibold tracking-wider uppercase"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {!showReview && status === "idle" && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                  Complete the project specs to start generating.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
