"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-mono text-sm font-bold tracking-[0.15em] text-foreground">
            VIBER
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/generate"
              className={`font-mono text-xs font-semibold tracking-wider uppercase ${
                pathname === "/generate" ? "!text-primary" : "!text-muted-foreground"
              }`}
            >
              Generate
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <Settings className={`h-4 w-4 ${pathname === "/settings" ? "text-primary" : "text-muted-foreground"}`} />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
