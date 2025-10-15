const NavbarSkeleton = () => {
  return (
    <nav className="fixed w-full top-0 bg-white px-2 lg:px-4 py-3 z-[2147483646] navbar border-b border-gray-100">
      <div className="flex items-center justify-between">
        {/* Left - Menu + Logo */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Menu button skeleton */}
          <div className="p-2 rounded-full">
            <div className="h-5 w-5 lg:h-6 lg:w-6 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Logo skeleton */}
          <div className="flex items-center">
            <div className="hidden lg:block w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="lg:hidden w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Center - Search skeleton */}
        <div className="flex-1 max-w-2xl mx-2 lg:mx-8">
          <div className="flex">
            <div className="flex-1 relative">
              <div className="w-full h-10 bg-gray-200 rounded-l-full animate-pulse"></div>
            </div>
            <div className="px-4 lg:px-6 py-2 bg-gray-200 rounded-r-full animate-pulse flex items-center justify-center">
              <div className="h-4 w-4 lg:h-5 lg:w-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right - User actions skeleton */}
        <div className="flex items-center space-x-2 lg:space-x-4 px-2 lg:px-6">
          {/* Upload button skeleton */}
          <div className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 rounded-full">
            <div className="h-4 w-4 lg:h-5 lg:w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden lg:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* User avatar skeleton */}
          <div className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarSkeleton