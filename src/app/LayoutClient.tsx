'use client'

import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/AuthContext'
import { VideoCardSkeleton } from '@/components/skeletons'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  const { loading } = useAuth()
  const pathname = usePathname()

  if (loading && pathname === '/') {
    return (
      <div className={`flex mt-16 lg:mt-24 ${isOpen ? 'lg:ml-60' : 'lg:ml-[70px]'}`}>
        <main className="flex-1 min-w-0 p-3 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <VideoCardSkeleton variant="grid" count={12} />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={`flex mt-16 lg:mt-24 transition-all duration-300 ${isOpen ? 'lg:ml-60' : 'lg:ml-[70px]'}`}>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}