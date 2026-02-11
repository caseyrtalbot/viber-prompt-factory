"use client"

import type { GeneratedFile } from "@/lib/types"
import { downloadAllAsZip } from "@/lib/download"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

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
      className="font-mono text-[10px] font-semibold tracking-wider uppercase"
      onClick={async () => {
        try {
          await downloadAllAsZip(files, projectName)
          toast.success("Downloaded zip")
        } catch {
          toast.error("Download failed")
        }
      }}
    >
      <Download className="mr-2 h-3.5 w-3.5" />
      Download All (.zip)
    </Button>
  )
}
