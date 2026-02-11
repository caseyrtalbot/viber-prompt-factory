"use client"

import { useSyncExternalStore, useCallback } from "react"
import { DEFAULT_MODEL } from "@/lib/constants"

const API_KEY_STORAGE_KEY = "viber-api-key"
const MODEL_STORAGE_KEY = "viber-model"

let listeners: Array<() => void> = []
function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}
function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function getApiKeySnapshot(): string {
  if (typeof window === "undefined") return ""
  return localStorage.getItem(API_KEY_STORAGE_KEY) || ""
}

function getModelSnapshot(): string {
  if (typeof window === "undefined") return DEFAULT_MODEL
  return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL
}

function getServerSnapshot(): string {
  return ""
}

function getServerModelSnapshot(): string {
  return DEFAULT_MODEL
}

export function useApiKey() {
  const apiKey = useSyncExternalStore(subscribe, getApiKeySnapshot, getServerSnapshot)
  const model = useSyncExternalStore(subscribe, getModelSnapshot, getServerModelSnapshot)

  const setApiKey = useCallback((key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key)
    emitChange()
  }, [])

  const setModel = useCallback((m: string) => {
    localStorage.setItem(MODEL_STORAGE_KEY, m)
    emitChange()
  }, [])

  const clearApiKey = useCallback(() => {
    localStorage.removeItem(API_KEY_STORAGE_KEY)
    emitChange()
  }, [])

  return { apiKey, setApiKey, model, setModel, clearApiKey, isLoaded: true }
}
