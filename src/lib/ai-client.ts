import Anthropic from "@anthropic-ai/sdk"
import OpenAI from "openai"
import type { ProviderId } from "@/lib/constants"

function createOpenAIClient(provider: ProviderId, apiKey: string): OpenAI {
  const baseURLs: Record<string, string> = {
    openai: "https://api.openai.com/v1",
    gemini: "https://generativelanguage.googleapis.com/v1beta/openai/",
    grok: "https://api.x.ai/v1",
  }
  return new OpenAI({ apiKey, baseURL: baseURLs[provider] })
}

function isReasoningModel(model: string): boolean {
  return model.startsWith("o1") || model.startsWith("o3") || model.startsWith("o4")
}

function buildMessages(
  provider: ProviderId,
  model: string,
  userMessage: string,
  system?: string,
): OpenAI.ChatCompletionMessageParam[] {
  const messages: OpenAI.ChatCompletionMessageParam[] = []
  if (system) {
    if (provider === "openai" && isReasoningModel(model)) {
      userMessage = `${system}\n\n${userMessage}`
    } else {
      messages.push({ role: "system", content: system })
    }
  }
  messages.push({ role: "user", content: userMessage })
  return messages
}

export async function* streamCompletion(
  provider: ProviderId,
  apiKey: string,
  model: string,
  userMessage: string,
  maxTokens: number,
  system?: string,
): AsyncGenerator<string> {
  if (provider === "anthropic") {
    const client = new Anthropic({ apiKey })
    const stream = client.messages.stream({
      model,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages: [{ role: "user", content: userMessage }],
    })
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        yield event.delta.text
      }
    }
  } else {
    const client = createOpenAIClient(provider, apiKey)
    const messages = buildMessages(provider, model, userMessage, system)
    const params: Record<string, unknown> = { model, messages, stream: true }
    if (provider === "openai" && isReasoningModel(model)) {
      params.max_completion_tokens = maxTokens
    } else {
      params.max_tokens = maxTokens
    }
    const stream = await client.chat.completions.create(params as unknown as OpenAI.ChatCompletionCreateParamsStreaming)
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) yield text
    }
  }
}

export async function createCompletion(
  provider: ProviderId,
  apiKey: string,
  model: string,
  userMessage: string,
  maxTokens: number,
): Promise<string> {
  if (provider === "anthropic") {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: userMessage }],
    })
    return message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
  } else {
    const client = createOpenAIClient(provider, apiKey)
    const params: Record<string, unknown> = {
      model,
      messages: [{ role: "user", content: userMessage }],
    }
    if (provider === "openai" && isReasoningModel(model)) {
      params.max_completion_tokens = maxTokens
    } else {
      params.max_tokens = maxTokens
    }
    const completion = await client.chat.completions.create(params as unknown as OpenAI.ChatCompletionCreateParamsNonStreaming)
    return completion.choices[0]?.message?.content || ""
  }
}
