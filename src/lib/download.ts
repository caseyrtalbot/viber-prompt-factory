import JSZip from "jszip"
import type { GeneratedFile } from "./types"

export function downloadFile(file: GeneratedFile) {
  const blob = new Blob([file.content], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = file.filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadAllAsZip(files: GeneratedFile[], projectName: string) {
  const zip = new JSZip()
  for (const file of files) {
    zip.file(file.filename, file.content)
  }
  const blob = await zip.generateAsync({ type: "blob" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${projectName || "viber-output"}-prompts.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}
