"use client"

import type { GeneratedFile } from "@/lib/types"
import { downloadAllAsZip } from "@/lib/download"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadAllButtonProps {
  files: GeneratedFile[]
  projectName: string
}

export function DownloadAllButton({ files, projectName }: DownloadAllButtonProps) {
  if (files.length === 0) return null

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => downloadAllAsZip(files, projectName)}
    >
      <Download className="mr-2 h-3.5 w-3.5" />
      Download All (.zip)
    </Button>
  )
}
