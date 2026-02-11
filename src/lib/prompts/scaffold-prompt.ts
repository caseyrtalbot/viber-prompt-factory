import type { ProjectSpecs } from "../types"

export function buildScaffoldPrompt(specs: ProjectSpecs): string {
  return `Generate a COMPLETE project scaffold package for the following project. This includes ALL documentation and prompt files needed to build the project from scratch using AI coding agents.

## Project Details
- **Name**: ${specs.projectName}
- **Description**: ${specs.description}
- **Framework**: ${specs.framework}
- **Language**: ${specs.language}
- **Styling**: ${specs.styling}
- **Database**: ${specs.database}
- **ORM**: ${specs.orm}
- **Auth**: ${specs.auth}
- **Hosting**: ${specs.hosting}
- **Key Features**: ${specs.features.join(", ")}
- **Architecture**: ${specs.architecture}
- **Constraints**: ${specs.constraints}
- **AI Usage**: ${specs.aiUsage}
- **Goals**: ${specs.goals}

## Generate These Files (in order):

### File 1: CLAUDE.md
The project's AI context file. Include:
- Project overview, tech stack, structure, commands
- Architecture decisions, coding conventions, rules
- Current status section (starting from scaffold)

### File 2: PROJECT_PLAN.md
A phased build plan with:
- Phase-by-phase breakdown (4-8 phases)
- Dependencies between phases
- Estimated complexity per phase (S/M/L)
- Success criteria for the whole project

### File 3: PROMPTS.md
All phase prompts in a single file. Each prompt should be:
- Self-contained (can be copy-pasted directly to an AI agent)
- Reference the CLAUDE.md for context
- Include specific file paths, tasks, and verification steps

### File 4: CHECKLIST.md
A master checklist covering:
- Pre-development setup tasks
- Per-phase completion checks
- Pre-launch checklist (testing, security, performance, accessibility)
- Deployment checklist

### File 5: RULES.md
Project-specific rules for AI agents:
- DO rules (patterns to always follow)
- DON'T rules (anti-patterns to avoid)
- Stack-specific gotchas and best practices
- Common mistakes for this tech stack

## Output Format
Separate each file with the marker format:
---FILE: CLAUDE.md---
[content]
---FILE: PROJECT_PLAN.md---
[content]
...and so on.

End with ---END---

Make every file production-quality — specific, actionable, and tailored to this exact project. No generic placeholders.`
}
