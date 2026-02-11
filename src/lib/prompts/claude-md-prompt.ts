import type { ProjectSpecs } from "../types"

export function buildClaudeMdPrompt(specs: ProjectSpecs): string {
  return `Generate a comprehensive CLAUDE.md file for the following project. This file will be loaded into AI coding agents' context at the start of every session.

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

## CLAUDE.md Structure Requirements

The file MUST include these sections:

### 1. Project Overview
- One-paragraph summary of what the project is and does
- Target users and core value proposition

### 2. Tech Stack
- Every technology with version numbers where known
- Package manager preference
- Key dependencies and why they were chosen

### 3. Project Structure
- Directory layout with descriptions
- Where different types of code live
- Naming conventions for files and folders

### 4. Development Commands
- How to install, run dev, build, test, lint
- Database commands (migrate, seed, reset)
- Any custom scripts

### 5. Architecture Decisions
- Key patterns (e.g., server components vs client, API structure)
- State management approach
- Data flow patterns
- Error handling strategy

### 6. Coding Conventions
- Style guide highlights (naming, imports, exports)
- Component patterns
- Type conventions
- Testing patterns

### 7. Current Status
- What's been built so far (scaffold)
- What's in progress
- Known issues or tech debt

### 8. Rules
- Things the AI must ALWAYS do
- Things the AI must NEVER do
- Common mistakes to avoid in this stack

Output ONLY the CLAUDE.md content. Start with \`# ${specs.projectName}\` as the title.`
}
