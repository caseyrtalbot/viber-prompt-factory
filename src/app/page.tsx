import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, MessageSquare, FileText, FileCode, FolderTree, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="text-center space-y-6 mb-16">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 border border-primary/30 px-3 py-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono text-[10px] font-bold tracking-wider text-primary uppercase">
              Prompt Engineering
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Viber Prompt Factory
        </h1>
        <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Turn your project specs into engineering-grade CLAUDE.md files and phased build prompts.
          Prompt like a team lead, not a wish-maker.
        </p>
        <div className="space-y-3 pt-2">
          <Button size="lg" asChild>
            <Link href="/generate" className="font-mono text-xs font-bold tracking-wider uppercase">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="font-mono text-[11px] text-muted-foreground">
            Requires an <Link href="/settings" className="text-primary hover:underline">Anthropic API key</Link>
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-16">
        <p className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
          How It Works
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Interactive Q&A
                </span>
              </CardTitle>
              <CardDescription className="font-mono text-[11px] leading-relaxed">
                Answer 7 guided questions about your project — stack, features, architecture, goals.
                Great when starting from scratch.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Paste & Extract
                </span>
              </CardTitle>
              <CardDescription className="font-mono text-[11px] leading-relaxed">
                Paste an existing PRD, spec doc, or project description.
                AI extracts structured specs automatically.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  CLAUDE.md + Prompts
                </span>
              </CardTitle>
              <CardDescription className="font-mono text-[11px] leading-relaxed">
                Get a project context file and phased build prompts — the essentials for any AI-assisted build.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-primary" />
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Full Scaffold
                </span>
              </CardTitle>
              <CardDescription className="font-mono text-[11px] leading-relaxed">
                Get CLAUDE.md, project plan, prompts, checklist, and rules — everything to start building immediately.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
