import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, MessageSquare, FileText, FileCode, FolderTree, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center space-y-4 mb-12">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Zap className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Viber Prompt Factory
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Turn your project specs into engineering-grade CLAUDE.md files and phased build prompts.
          Prompt like a team lead, not a wish-maker.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5" />
              Interactive Q&A
            </CardTitle>
            <CardDescription>
              Answer 7 guided questions about your project — stack, features, architecture, goals.
              Great when starting from scratch.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Paste & Extract
            </CardTitle>
            <CardDescription>
              Paste an existing PRD, spec doc, or project description.
              AI extracts structured specs automatically.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileCode className="h-5 w-5" />
              CLAUDE.md + Prompts
            </CardTitle>
            <CardDescription>
              Get a project context file and phased build prompts — the essentials for any AI-assisted build.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderTree className="h-5 w-5" />
              Full Scaffold
            </CardTitle>
            <CardDescription>
              Get CLAUDE.md, project plan, prompts, checklist, and rules — everything to start building immediately.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <Button size="lg" asChild>
          <Link href="/generate">
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground">
          You&apos;ll need an <Link href="/settings" className="underline">Anthropic API key</Link> to generate prompts.
        </p>
      </div>
    </div>
  )
}
