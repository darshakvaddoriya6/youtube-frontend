'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type SidebarContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

const SIDEBAR_STORAGE_KEY = 'sidebar-state'

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Start with true as default to match desktop behavior and avoid skeleton mismatch
  const [isOpen, setIsOpen] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load sidebar state from localStorage on mount (client-side only)
  useEffect(() => {
    const initializeSidebar = () => {
      try {
        const savedState = localStorage.getItem(SIDEBAR_STORAGE_KEY)
        if (savedState !== null) {
          const parsedState = JSON.parse(savedState)
          setIsOpen(parsedState)
        } else {
          // Default behavior: open on desktop, closed on mobile
          const isDesktop = window.innerWidth >= 1024
          setIsOpen(isDesktop)
        }
      } catch (error) {
        console.error('Failed to load sidebar state:', error)
        // Fallback: open on desktop, closed on mobile
        const isDesktop = window.innerWidth >= 1024
        setIsOpen(isDesktop)
      } finally {
        setIsHydrated(true)
      }
    }

    initializeSidebar()
  }, [])

  // Save sidebar state to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isOpen))
      } catch (error) {
        console.error('Failed to save sidebar state:', error)
      }
    }
  }, [isOpen, isHydrated])

  const value: SidebarContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}