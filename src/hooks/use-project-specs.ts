"use client"

import { create } from "zustand"
import type { ProjectSpecs } from "@/lib/types"
import { DEFAULT_SPECS } from "@/lib/types"

interface ProjectSpecsStore {
  specs: ProjectSpecs
  setField: <K extends keyof ProjectSpecs>(key: K, value: ProjectSpecs[K]) => void
  setSpecs: (specs: ProjectSpecs) => void
  reset: () => void
}

export const useProjectSpecs = create<ProjectSpecsStore>((set) => ({
  specs: { ...DEFAULT_SPECS },
  setField: (key, value) =>
    set((state) => ({
      specs: { ...state.specs, [key]: value },
    })),
  setSpecs: (specs) => set({ specs }),
  reset: () => set({ specs: { ...DEFAULT_SPECS } }),
}))
