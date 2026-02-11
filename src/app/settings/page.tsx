import { ApiKeyForm } from "@/components/settings/ApiKeyForm"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <ApiKeyForm />
    </div>
  )
}
