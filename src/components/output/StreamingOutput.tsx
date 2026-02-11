"use client"

interface StreamingOutputProps {
  content: string
  isStreaming: boolean
}

export function StreamingOutput({ content, isStreaming }: StreamingOutputProps) {
  if (!content) return null

  return (
    <div className="relative rounded-lg border border-border bg-muted/50 p-4">
      <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
        {content}
        {isStreaming && (
          <span className="inline-block h-4 w-1.5 animate-pulse bg-primary ml-0.5" />
        )}
      </pre>
    </div>
  )
}
