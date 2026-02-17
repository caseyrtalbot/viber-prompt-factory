import { cn } from "@/lib/utils"
import type { ProviderId } from "@/lib/constants"

interface IconProps {
  className?: string
}

export function AnthropicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-4", className)}>
      <path d="M14 3h3.5L22 21h-4.2l-1.6-4.5H7.8L6.2 21H2L6.5 3H10l2 5.5L14 3Z" />
    </svg>
  )
}

export function OpenAIIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-4", className)}>
      <path
        d="M12 3L19.794 7.5V16.5L12 21L4.206 16.5V7.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  )
}

export function GeminiIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-4", className)}>
      <path d="M12 2C12 8.627 8.627 12 2 12C8.627 12 12 15.373 12 22C12 15.373 15.373 12 22 12C15.373 12 12 8.627 12 2Z" />
    </svg>
  )
}

export function GrokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-4", className)}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ICON_MAP: Record<ProviderId, React.ComponentType<IconProps>> = {
  anthropic: AnthropicIcon,
  openai: OpenAIIcon,
  gemini: GeminiIcon,
  grok: GrokIcon,
}

export function ProviderIcon({ provider, className }: { provider: ProviderId; className?: string }) {
  const Icon = ICON_MAP[provider]
  return <Icon className={className} />
}
