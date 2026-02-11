export function buildExtractSpecsPrompt(freeText: string): string {
  return `Extract structured project specifications from the following free-text description. Return a JSON object matching this exact schema:

{
  "projectName": "string — project name or slug",
  "description": "string — clear one-paragraph description",
  "framework": "string — e.g. 'Next.js 14 (App Router)', 'React + Vite'",
  "language": "string — e.g. 'TypeScript', 'Python'",
  "styling": "string — e.g. 'Tailwind CSS', 'CSS Modules'",
  "database": "string — e.g. 'PostgreSQL', 'MongoDB', 'None'",
  "orm": "string — e.g. 'Prisma', 'Drizzle', 'None'",
  "auth": "string — e.g. 'NextAuth / Auth.js', 'None'",
  "hosting": "string — e.g. 'Vercel', 'AWS', 'Undecided'",
  "features": ["array of key feature strings"],
  "architecture": "string — architectural notes or empty string",
  "constraints": "string — constraints or empty string",
  "aiUsage": "string — how they plan to use AI coding tools or empty string",
  "goals": "string — project goals or empty string"
}

Rules:
- If a field isn't mentioned, make a reasonable inference based on context or use an empty string
- For features, extract distinct capabilities (not implementation details)
- Keep descriptions concise but complete
- Return ONLY valid JSON, no markdown formatting

## User's Project Description:

${freeText}`
}
