export type InputMode = "interactive" | "freetext"
export type OutputMode = "claude-md" | "full-scaffold"

export interface ProjectSpecs {
  projectName: string
  description: string
  framework: string
  language: string
  styling: string
  database: string
  orm: string
  auth: string
  hosting: string
  features: string[]
  architecture: string
  constraints: string
  aiUsage: string
  goals: string
}

export interface GeneratedFile {
  filename: string
  content: string
}

export interface GenerationState {
  status: "idle" | "generating" | "complete" | "error"
  files: GeneratedFile[]
  currentFileIndex: number
  streamingContent: string
  error: string | null
}

export const DEFAULT_SPECS: ProjectSpecs = {
  projectName: "",
  description: "",
  framework: "",
  language: "TypeScript",
  styling: "",
  database: "",
  orm: "",
  auth: "",
  hosting: "",
  features: [],
  architecture: "",
  constraints: "",
  aiUsage: "",
  goals: "",
}
