'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type SidebarContextValue = {
  isOpen: boolean
  isInitialized: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

const SIDEBAR_STORAGE_KEY = 'sidebar-state'

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default state to prevent hydration mismatch
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load state from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(SIDEBAR_STORAGE_KEY)
      if (savedState !== null) {
        try {
          setIsOpen(JSON.parse(savedState))
        } catch (error) {
          console.warn('Error parsing saved sidebar state:', error)
          localStorage.removeItem(SIDEBAR_STORAGE_KEY)
        }
      }
      setIsInitialized(true)
    }
  }, [])

  // Save state to localStorage whenever it changes (but only after initialization)
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isOpen))
    }
  }, [isOpen, isInitialized])



  const value: SidebarContextValue = {
    isOpen,
    isInitialized,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v: boolean) => !v),
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}