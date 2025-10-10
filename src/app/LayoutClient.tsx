'use client'

import { useSidebar } from '@/contexts/SidebarContext'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  return (
    <div className={`flex mt-14 transition-all duration-300 ${isOpen ? 'ml-52' : 'ml-0'}`}>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}