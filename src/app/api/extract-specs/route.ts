import { NextRequest } from "next/server"
import { buildExtractSpecsPrompt } from "@/lib/prompts/extract-specs-prompt"
import { createCompletion } from "@/lib/ai-client"
import type { ProjectSpecs } from "@/lib/types"
import type { ProviderId } from "@/lib/constants"

export async function POST(req: NextRequest) {
  let body: { freeText: string; apiKey: string; model: string; provider?: ProviderId }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { freeText, apiKey, model, provider = "anthropic" } = body

  if (!apiKey) {
    return Response.json({ error: "API key is required" }, { status: 400 })
  }
  if (!freeText?.trim()) {
    return Response.json({ error: "Project description is required" }, { status: 400 })
  }

  try {
    const text = await createCompletion(provider, apiKey, model, buildExtractSpecsPrompt(freeText), 2048)

    // Parse JSON from response — handle potential markdown code blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ error: "Failed to extract specs from response" }, { status: 500 })
    }

    const specs: ProjectSpecs = JSON.parse(jsonMatch[0])

    // Ensure features is an array
    if (typeof specs.features === "string") {
      specs.features = (specs.features as string).split(",").map((f) => f.trim()).filter(Boolean)
    }

    return Response.json({ specs })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Extraction failed"
    if (message.includes("401") || message.includes("authentication") || message.includes("Unauthorized")) {
      return Response.json({ error: "Invalid API key" }, { status: 401 })
    }
    if (message.includes("credit balance") || message.includes("billing") || message.includes("quota")) {
      return Response.json({ error: "Insufficient API credits" }, { status: 402 })
    }
    if (message.includes("429") || message.includes("rate")) {
      return Response.json({ error: "Rate limited — please wait a moment and try again" }, { status: 429 })
    }
    return Response.json({ error: message }, { status: 500 })
  }
}
