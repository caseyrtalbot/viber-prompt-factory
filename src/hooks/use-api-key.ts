"use client"

import { useSyncExternalStore, useCallback } from "react"
import { PROVIDERS, type ProviderId } from "@/lib/constants"

const PROVIDER_STORAGE_KEY = "viber-provider"

function storageKey(provider: string, suffix: string) {
  return `viber-${suffix}-${provider}`
}

let listeners: Array<() => void> = []
function emitChange() {
  for (const listener of listeners) listener()
}
function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => { listeners = listeners.filter((l) => l !== listener) }
}

// Migrate old single-key storage to per-provider storage
if (typeof window !== "undefined") {
  const oldKey = localStorage.getItem("viber-api-key")
  const oldModel = localStorage.getItem("viber-model")
  if (oldKey && !localStorage.getItem(storageKey("anthropic", "api-key"))) {
    localStorage.setItem(storageKey("anthropic", "api-key"), oldKey)
    localStorage.removeItem("viber-api-key")
  }
  if (oldModel && !localStorage.getItem(storageKey("anthropic", "model"))) {
    localStorage.setItem(storageKey("anthropic", "model"), oldModel)
    localStorage.removeItem("viber-model")
  }
}

function getProviderConfig(provider: ProviderId) {
  return PROVIDERS.find((p) => p.id === provider) || PROVIDERS[0]
}

function getProviderSnapshot(): ProviderId {
  if (typeof window === "undefined") return "anthropic"
  return (localStorage.getItem(PROVIDER_STORAGE_KEY) as ProviderId) || "anthropic"
}

function getApiKeySnapshot(): string {
  if (typeof window === "undefined") return ""
  const provider = getProviderSnapshot()
  return localStorage.getItem(storageKey(provider, "api-key")) || ""
}

function getModelSnapshot(): string {
  if (typeof window === "undefined") return PROVIDERS[0].defaultModel
  const provider = getProviderSnapshot()
  const config = getProviderConfig(provider)
  return localStorage.getItem(storageKey(provider, "model")) || config.defaultModel
}

function getServerProviderSnapshot(): ProviderId { return "anthropic" }
function getServerKeySnapshot(): string { return "" }
function getServerModelSnapshot(): string { return PROVIDERS[0].defaultModel }

export function useApiKey() {
  const provider = useSyncExternalStore(subscribe, getProviderSnapshot, getServerProviderSnapshot)
  const apiKey = useSyncExternalStore(subscribe, getApiKeySnapshot, getServerKeySnapshot)
  const model = useSyncExternalStore(subscribe, getModelSnapshot, getServerModelSnapshot)

  const setProvider = useCallback((p: ProviderId) => {
    localStorage.setItem(PROVIDER_STORAGE_KEY, p)
    emitChange()
  }, [])

  const setApiKey = useCallback((key: string) => {
    const p = getProviderSnapshot()
    localStorage.setItem(storageKey(p, "api-key"), key)
    emitChange()
  }, [])

  const setModel = useCallback((m: string) => {
    const p = getProviderSnapshot()
    localStorage.setItem(storageKey(p, "model"), m)
    emitChange()
  }, [])

  const clearApiKey = useCallback(() => {
    const p = getProviderSnapshot()
    localStorage.removeItem(storageKey(p, "api-key"))
    emitChange()
  }, [])

  return { provider, setProvider, apiKey, setApiKey, model, setModel, clearApiKey, isLoaded: true }
}
