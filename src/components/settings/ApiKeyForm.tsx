"use client"

import { useState } from "react"
import { useApiKey } from "@/hooks/use-api-key"
import { MODEL_OPTIONS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function ApiKeyForm() {
  const { apiKey, setApiKey, model, setModel, clearApiKey, isLoaded } = useApiKey()
  const [showKey, setShowKey] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const testConnection = async () => {
    if (!apiKey) return
    setTestStatus("testing")

    try {
      const res = await fetch("/api/extract-specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          freeText: "A simple test project",
          apiKey,
          model,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Connection failed")
      }

      setTestStatus("success")
      toast.success("Connection successful")
      setTimeout(() => setTestStatus("idle"), 3000)
    } catch (err) {
      setTestStatus("error")
      toast.error(err instanceof Error ? err.message : "Connection failed")
    }
  }

  if (!isLoaded) return null

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>
          Your API key is stored in your browser&apos;s localStorage and sent directly to the Claude API. It never touches our servers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">Anthropic API Key</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MODEL_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={testConnection} disabled={!apiKey || testStatus === "testing"}>
            {testStatus === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {testStatus === "success" && <Check className="mr-2 h-4 w-4" />}
            {testStatus === "error" && <X className="mr-2 h-4 w-4" />}
            Test Connection
          </Button>
          <Button variant="outline" onClick={() => { clearApiKey(); toast("API key cleared") }} disabled={!apiKey}>
            Clear Key
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}
