"use client"

import { useState, useCallback } from "react"
import type { ProjectSpecs } from "@/lib/types"

export function useExtractSpecs() {
  const [isExtracting, setIsExtracting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const extractSpecs = useCallback(async (freeText: string, apiKey: string, model: string): Promise<ProjectSpecs | null> => {
    setIsExtracting(true)
    setError(null)

    try {
      const res = await fetch("/api/extract-specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freeText, apiKey, model }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to extract specs")
      }

      const data = await res.json()
      return data.specs as ProjectSpecs
    } catch (err) {
      setError(err instanceof Error ? err.message : "Extraction failed")
      return null
    } finally {
      setIsExtracting(false)
    }
  }, [])

  return { extractSpecs, isExtracting, error }
}
