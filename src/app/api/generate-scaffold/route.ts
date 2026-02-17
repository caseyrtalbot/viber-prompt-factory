import { NextRequest } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt"
import { buildScaffoldPrompt } from "@/lib/prompts/scaffold-prompt"
import { streamCompletion } from "@/lib/ai-client"
import type { ProjectSpecs } from "@/lib/types"
import type { ProviderId } from "@/lib/constants"

export async function POST(req: NextRequest) {
  let body: { specs: ProjectSpecs; apiKey: string; model: string; provider?: ProviderId }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { specs, apiKey, model, provider = "anthropic" } = body

  if (!apiKey) {
    return Response.json({ error: "API key is required" }, { status: 400 })
  }
  if (!specs?.projectName) {
    return Response.json({ error: "Project name is required" }, { status: 400 })
  }

  try {
    const stream = streamCompletion(provider, apiKey, model, buildScaffoldPrompt(specs), 16384, SYSTEM_PROMPT)

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of stream) {
            controller.enqueue(new TextEncoder().encode(text))
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed"
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
