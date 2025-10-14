'use client'

import { useSidebar } from '@/contexts/SidebarContext'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  return (
    <div className={`flex mt-16 lg:mt-24 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-0'}`}>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}