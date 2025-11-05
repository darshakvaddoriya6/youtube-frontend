'use client'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSidebar } from '@/contexts/SidebarContext'

const SidebarSkeleton = () => {
  const { isOpen } = useSidebar()

  const renderSkeletonItem = (showText: boolean = true) => (
    <div className="flex items-center px-6 py-2">
      <Skeleton circle width={24} height={24} />
      {showText && <Skeleton width={128} height={16} className="ml-4" />}
    </div>
  )

  return (
    <div className={`fixed left-0 top-16 h-full bg-white z-40 ${isOpen ? 'w-60' : 'w-[70px]'}`}>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="py-[20px] ">
            {/* Menu Items */}
            <div className="mb-6 space-y-3 pb-[16px]">
              {[1, 2].map((item) => (
                <div key={item} className={isOpen ? "px-6" : "flex justify-center"}>
                  {isOpen ? renderSkeletonItem() : <Skeleton circle width={24} height={24} />}
                </div>
              ))}
            </div>

            {/* Library Section */}
            <div className='mb-9'>
              {isOpen && <Skeleton width={80} height={16} className="mb-2 ml-6" />}
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className={isOpen ? "px-6" : "flex justify-center"}>
                    {isOpen ? renderSkeletonItem() : <Skeleton circle width={24} height={24} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Section */}
            <div>
              {isOpen && <Skeleton width={80} height={16} className="mb-2 ml-6" />}
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className={isOpen ? "px-6" : "flex justify-center"}>
                    {isOpen ? renderSkeletonItem() : <Skeleton circle width={24} height={24} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarSkeleton