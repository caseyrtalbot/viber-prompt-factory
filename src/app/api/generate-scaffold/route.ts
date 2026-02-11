import { NextRequest } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt"
import { buildScaffoldPrompt } from "@/lib/prompts/scaffold-prompt"
import type { ProjectSpecs } from "@/lib/types"

export async function POST(req: NextRequest) {
  let body: { specs: ProjectSpecs; apiKey: string; model: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { specs, apiKey, model } = body

  if (!apiKey) {
    return Response.json({ error: "API key is required" }, { status: 400 })
  }
  if (!specs?.projectName) {
    return Response.json({ error: "Project name is required" }, { status: 400 })
  }

  const client = new Anthropic({ apiKey })

  try {
    const stream = client.messages.stream({
      model,
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildScaffoldPrompt(specs) }],
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
              controller.enqueue(new TextEncoder().encode(event.delta.text))
            }
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
    if (message.includes("401") || message.includes("authentication")) {
      return Response.json({ error: "Invalid API key" }, { status: 401 })
    }
    if (message.includes("429") || message.includes("rate")) {
      return Response.json({ error: "Rate limited — please wait a moment and try again" }, { status: 429 })
    }
    return Response.json({ error: message }, { status: 500 })
  }
}
