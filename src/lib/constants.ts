export const FRAMEWORK_OPTIONS = [
  "Next.js 14 (App Router)",
  "Next.js 14 (Pages Router)",
  "React + Vite",
  "Remix",
  "Astro",
  "SvelteKit",
  "Nuxt 3",
  "Express.js",
  "Fastify",
  "Django",
  "Flask",
  "Rails",
  "Laravel",
  "Other",
]

export const LANGUAGE_OPTIONS = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Other",
]

export const STYLING_OPTIONS = [
  "Tailwind CSS",
  "CSS Modules",
  "Styled Components",
  "Emotion",
  "Sass/SCSS",
  "Vanilla CSS",
  "None (API only)",
  "Other",
]

export const DATABASE_OPTIONS = [
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "MongoDB",
  "Supabase",
  "Firebase",
  "PlanetScale",
  "Neon",
  "None",
  "Other",
]

export const ORM_OPTIONS = [
  "Prisma",
  "Drizzle",
  "TypeORM",
  "Sequelize",
  "Mongoose",
  "Knex",
  "SQLAlchemy",
  "None",
  "Other",
]

export const AUTH_OPTIONS = [
  "NextAuth / Auth.js",
  "Clerk",
  "Supabase Auth",
  "Firebase Auth",
  "Passport.js",
  "Custom JWT",
  "None",
  "Other",
]

export const HOSTING_OPTIONS = [
  "Vercel",
  "Netlify",
  "AWS",
  "Google Cloud",
  "Railway",
  "Fly.io",
  "DigitalOcean",
  "Self-hosted",
  "Undecided",
  "Other",
]

export interface QAField {
  key: string
  label: string
  type: "text" | "textarea" | "select"
  placeholder?: string
  options?: string[]
}

export interface QAStep {
  id: string
  title: string
  description: string
  fields: QAField[]
}

export const QA_STEPS: QAStep[] = [
  {
    id: "basics",
    title: "Project Basics",
    description: "What are you building?",
    fields: [
      { key: "projectName", label: "Project Name", type: "text", placeholder: "my-awesome-app" },
      { key: "description", label: "Description", type: "textarea", placeholder: "A brief description of what this project does and who it's for..." },
    ],
  },
  {
    id: "stack",
    title: "Tech Stack",
    description: "What technologies will you use?",
    fields: [
      { key: "framework", label: "Framework", type: "select", options: FRAMEWORK_OPTIONS },
      { key: "language", label: "Language", type: "select", options: LANGUAGE_OPTIONS },
      { key: "styling", label: "Styling", type: "select", options: STYLING_OPTIONS },
    ],
  },
  {
    id: "data",
    title: "Data Layer",
    description: "How will you store and manage data?",
    fields: [
      { key: "database", label: "Database", type: "select", options: DATABASE_OPTIONS },
      { key: "orm", label: "ORM / Query Builder", type: "select", options: ORM_OPTIONS },
      { key: "auth", label: "Authentication", type: "select", options: AUTH_OPTIONS },
    ],
  },
  {
    id: "features",
    title: "Key Features",
    description: "What are the core features? (comma-separated)",
    fields: [
      { key: "features", label: "Features", type: "textarea", placeholder: "User login, Dashboard, API endpoints, File upload..." },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    description: "Any architectural preferences or patterns?",
    fields: [
      { key: "architecture", label: "Architecture Notes", type: "textarea", placeholder: "Monorepo, microservices, serverless, event-driven, etc." },
      { key: "hosting", label: "Hosting / Deployment", type: "select", options: HOSTING_OPTIONS },
    ],
  },
  {
    id: "constraints",
    title: "Constraints",
    description: "Any limitations or non-negotiables?",
    fields: [
      { key: "constraints", label: "Constraints", type: "textarea", placeholder: "Budget limits, timeline, accessibility requirements, browser support..." },
    ],
  },
  {
    id: "ai-goals",
    title: "AI Usage & Goals",
    description: "How will AI agents help build this?",
    fields: [
      { key: "aiUsage", label: "AI Coding Approach", type: "textarea", placeholder: "Using Claude Code CLI, Cursor, Copilot, etc." },
      { key: "goals", label: "Project Goals", type: "textarea", placeholder: "MVP in 2 weeks, production-ready, learning project..." },
    ],
  },
]

export const MODEL_OPTIONS = [
  { value: "claude-sonnet-4-5-20250929", label: "Claude Sonnet 4.5 (Recommended)" },
  { value: "claude-opus-4-6", label: "Claude Opus 4.6 (Most Capable)" },
  { value: "claude-opus-4-5-20251101", label: "Claude Opus 4.5" },
  { value: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 (Fastest)" },
]

export const DEFAULT_MODEL = "claude-sonnet-4-5-20250929"

export const FILE_SEPARATOR = "---FILE:"
export const FILE_SEPARATOR_END = "---"
