import React from 'react';

interface NavbarSkeletonProps {
    variation: 'default' | 'authenticated'
}

const NavbarSkeleton: React.FC<NavbarSkeletonProps> = ({ variation = 'authenticated' }) => {
    return (
        <div className="flex items-center justify-between w-full px-2">
            {/* Left side - Menu and Logo */}
            <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="w-36 h-6 bg-gray-200 rounded animate-pulse hidden lg:block"></div>
                <div className="w-6 h-5 bg-gray-200 rounded animate-pulse lg:hidden"></div>
            </div>

            {/* Center - Search bar */}
            <div className="flex-1 max-w-2xl mr-4">
                <div className="flex">
                    <div className="flex-1 relative">
                        <div className="w-full h-10 bg-gray-100 rounded-l-full animate-pulse"></div>
                    </div>
                    <div className="w-16 h-10 bg-gray-200 rounded-r-full animate-pulse"></div>
                </div>
            </div>

            {/* Right side - User actions */}
            <div className="flex items-center space-x-2 lg:space-x-4 mr-4">
                {variation === 'authenticated' ? (
                  <>
                    <div className="flex items-center space-x-2 px-2 lg:px-4 py-2 rounded-full bg-gray-100 animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      <div className="hidden lg:block w-12 h-3.5 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gray-300 animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-[76px] h-8 bg-gray-200 rounded animate-pulse"></div>
                  </>
                )}
            </div>
        </div>
    );
};

export default NavbarSkeleton;
