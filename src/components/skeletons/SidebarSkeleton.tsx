interface SidebarSkeletonProps {
  isOpen?: boolean
}

const SidebarSkeleton = ({ isOpen = true }: SidebarSkeletonProps) => {
  return (
    <>
      {/* Mobile overlay skeleton */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" />
      )}

      {/* Sidebar Skeleton */}
      <div
        className={`fixed left-0 top-16 h-full bg-white z-40 transform transition-all duration-300 ease-in-out lg:block ${
          isOpen ? 'block w-60 lg:w-60' : 'hidden lg:block lg:w-[70px]'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="py-4">
              {/* Main menu items skeleton */}
              <div className="mb-6">
                {[
                  { width: 'w-12' }, // Home
                  { width: 'w-20' }  // Subscriptions
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center py-2 hover:bg-gray-100 ${
                      isOpen ? 'px-6 lg:px-6' : 'px-4 lg:px-4 justify-center'
                    }`}
                  >
                    <div className="h-6 w-6 lg:h-6 lg:w-6 bg-gray-200 rounded animate-pulse"></div>
                    {isOpen && (
                      <div className={`ml-4 lg:ml-4 h-4 ${item.width} bg-gray-200 rounded animate-pulse`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Library section skeleton */}
              <div className="mb-6">
                {/* Library header skeleton */}
                {isOpen && (
                  <div className="px-6 lg:px-6 py-2">
                    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse uppercase font-semibold"></div>
                  </div>
                )}
                
                {/* Library items skeleton */}
                {[
                  { width: 'w-14' }, // History
                  { width: 'w-20' }, // Liked Videos
                  { width: 'w-18' }, // Watch Later
                  { width: 'w-16' }  // Playlists
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center py-2 hover:bg-gray-100 ${
                      isOpen ? 'px-6 lg:px-6' : 'px-4 lg:px-4 justify-center'
                    }`}
                  >
                    <div className="h-6 w-6 lg:h-6 lg:w-6 bg-gray-200 rounded animate-pulse"></div>
                    {isOpen && (
                      <div className={`ml-4 lg:ml-4 h-4 ${item.width} bg-gray-200 rounded animate-pulse`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Settings section skeleton */}
              <div>
                {/* Settings header skeleton */}
                {isOpen && (
                  <div className="px-6 lg:px-6 py-2">
                    <div className="h-3 w-14 bg-gray-200 rounded animate-pulse uppercase font-semibold"></div>
                  </div>
                )}
                
                {/* Settings items skeleton */}
                {[
                  { width: 'w-14' }, // Settings
                  { width: 'w-10' }, // Help
                  { width: 'w-24' }  // Send Feedback
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center py-2 hover:bg-gray-100 ${
                      isOpen ? 'px-6 lg:px-6' : 'px-4 lg:px-4 justify-center'
                    }`}
                  >
                    <div className="h-6 w-6 lg:h-6 lg:w-6 bg-gray-200 rounded animate-pulse"></div>
                    {isOpen && (
                      <div className={`ml-4 lg:ml-4 h-4 ${item.width} bg-gray-200 rounded animate-pulse`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarSkeleton