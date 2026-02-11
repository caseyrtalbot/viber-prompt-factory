"use client"

import type { GeneratedFile } from "@/lib/types"
import { GeneratedFileCard } from "./GeneratedFileCard"
import { DownloadAllButton } from "./DownloadAllButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResultsPanelProps {
  files: GeneratedFile[]
  projectName: string
}

export function ResultsPanel({ files, projectName }: ResultsPanelProps) {
  if (files.length === 0) return null

  if (files.length === 1) {
    return (
      <div className="space-y-3">
        <div className="flex justify-end">
          <DownloadAllButton files={files} projectName={projectName} />
        </div>
        <GeneratedFileCard file={files[0]} />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <DownloadAllButton files={files} projectName={projectName} />
      </div>
      <Tabs defaultValue={files[0].filename}>
        <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
          {files.map((file) => (
            <TabsTrigger key={file.filename} value={file.filename} className="text-xs font-mono">
              {file.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {files.map((file) => (
          <TabsContent key={file.filename} value={file.filename}>
            <GeneratedFileCard file={file} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
