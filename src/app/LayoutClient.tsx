'use client'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/AuthContext'
import { VideoCardSkeleton } from '@/components/skeletons'
import { useEffect } from 'react'
interface LayoutClientProps {
  children: React.ReactNode
  skeletonCount?: number
}


export default function LayoutClient({ children }: LayoutClientProps) {
  const { isOpen } = useSidebar()
  const { loading } = useAuth()
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  if (loading && pathname === '/') {
    return (
      <div className={`flex py-16 lg:py-24 ${isOpen ? 'lg:ml-60' : 'lg:ml-[70px]'}`}>
        <main className="flex-1 min-w-0 ">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <VideoCardSkeleton variant="grid" count={6} />
            </div>
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className={`flex transition-all duration-300 py-16 lg:py-24 ${isOpen ? 'lg:ml-60' : 'lg:ml-[70px]'}`}>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
    )
}