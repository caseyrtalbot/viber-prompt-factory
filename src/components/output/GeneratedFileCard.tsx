"use client"

import { useState } from "react"
import type { GeneratedFile } from "@/lib/types"
import { downloadFile, copyToClipboard } from "@/lib/download"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Check, ChevronDown, ChevronUp } from "lucide-react"
import { toast } from "sonner"

interface GeneratedFileCardProps {
  file: GeneratedFile
}

export function GeneratedFileCard({ file }: GeneratedFileCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = async () => {
    try {
      await copyToClipboard(file.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Copied to clipboard")
    } catch {
      toast.error("Failed to copy")
    }
  }

  const lineCount = file.content.split("\n").length
  const preview = expanded ? file.content : file.content.split("\n").slice(0, 15).join("\n")
  const isTruncated = lineCount > 15

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-mono">{file.filename}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {lineCount} lines
          </Badge>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => downloadFile(file)}>
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap break-words rounded bg-muted p-3 font-mono text-xs leading-relaxed max-h-96 overflow-y-auto">
          {preview}
          {isTruncated && !expanded && "\n..."}
        </pre>
        {isTruncated && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-3 w-3" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-3 w-3" /> Show all {lineCount} lines
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
