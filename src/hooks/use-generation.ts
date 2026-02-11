"use client"

import { useState, useCallback, useRef } from "react"
import type { ProjectSpecs, GeneratedFile, GenerationState } from "@/lib/types"
import type { OutputMode } from "@/lib/types"
import { FILE_SEPARATOR } from "@/lib/constants"

const initialState: GenerationState = {
  status: "idle",
  files: [],
  currentFileIndex: -1,
  streamingContent: "",
  error: null,
}

export function useGeneration() {
  const [state, setState] = useState<GenerationState>(initialState)
  const abortRef = useRef<AbortController | null>(null)

  const generate = useCallback(async (
    specs: ProjectSpecs,
    outputMode: OutputMode,
    apiKey: string,
    model: string,
  ) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setState({ ...initialState, status: "generating" })

    const endpoint = outputMode === "full-scaffold"
      ? "/api/generate-scaffold"
      : "/api/generate"

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specs, apiKey, model }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Generation failed" }))
        throw new Error(data.error || `HTTP ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response stream")

      const decoder = new TextDecoder()
      let fullText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk

        // Parse files from accumulated text
        const files = parseFiles(fullText)
        const lastFile = files[files.length - 1]

        setState((prev) => ({
          ...prev,
          files: files.filter((f) => f.content.length > 0),
          currentFileIndex: files.length - 1,
          streamingContent: lastFile?.content || fullText,
        }))
      }

      // Final parse
      const files = parseFiles(fullText)
      setState({
        status: "complete",
        files: files.filter((f) => f.content.length > 0),
        currentFileIndex: 0,
        streamingContent: "",
        error: null,
      })
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      setState((prev) => ({
        ...prev,
        status: "error",
        error: err instanceof Error ? err.message : "Generation failed",
      }))
    }
  }, [])

  const abort = useCallback(() => {
    abortRef.current?.abort()
    setState((prev) => ({ ...prev, status: "idle" }))
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState(initialState)
  }, [])

  return { ...state, generate, abort, reset }
}

function parseFiles(text: string): GeneratedFile[] {
  const files: GeneratedFile[] = []
  const separator = FILE_SEPARATOR

  // Check if text contains file separators
  if (!text.includes(separator)) {
    // No separators yet — treat entire text as one file
    return [{ filename: "output.md", content: text.replace(/---END---\s*$/, "").trim() }]
  }

  const parts = text.split(separator)

  // First part before any separator (usually empty or preamble)
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    const newlineIndex = part.indexOf("\n")
    if (newlineIndex === -1) {
      // Separator line hasn't completed yet
      files.push({ filename: part.replace(/---\s*$/, "").trim(), content: "" })
      continue
    }

    const filename = part.substring(0, newlineIndex).replace(/---\s*$/, "").trim()
    let content = part.substring(newlineIndex + 1)

    // Remove trailing ---END--- marker
    content = content.replace(/---END---\s*$/, "").trim()

    files.push({ filename, content })
  }

  return files
}
