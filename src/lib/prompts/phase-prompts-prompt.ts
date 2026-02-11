import type { ProjectSpecs } from "../types"

export function buildPhasePromptsPrompt(specs: ProjectSpecs): string {
  return `Generate a set of phased build prompts for the following project. Each prompt should be a self-contained instruction that an AI coding agent can execute in a single session.

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

## Prompt Generation Rules

1. **Phase 0 is always Scaffold** — project init, install deps, folder structure, basic config
2. **Phase 1 is always Data Model** — schema, migrations, seed data
3. **Remaining phases** cover features in dependency order
4. **Final phase** is always Polish — error handling, loading states, responsive design, deployment prep

For EACH phase, generate a prompt with this structure:

\`\`\`
# Phase N: [Title]

## Context
[What has been built so far — reference previous phases]

## Objective
[One clear sentence: what this phase delivers]

## Tasks
[Numbered list of specific implementation tasks]
[Include exact file paths to create or modify]

## Technical Details
[Stack-specific implementation guidance]
[Patterns to follow, libraries to use]

## Verification
- [ ] [Specific check 1]
- [ ] [Specific check 2]
- [ ] [Build passes with no errors]
\`\`\`

Generate 4-8 phases depending on project complexity. Each prompt should be 200-400 words — detailed enough to execute without clarification, concise enough to stay focused.

Output each phase prompt as a separate file using the separator format:
---FILE: phase-0-scaffold.md---
[content]
---FILE: phase-1-data-model.md---
[content]
...and so on.

End with ---END---`
}
