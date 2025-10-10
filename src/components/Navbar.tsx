'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Search, Menu, Plus, LogOut, Settings, User } from 'lucide-react'
import UploadVideoModal from './UploadVideoModal'
import { useSidebar } from '@/contexts/SidebarContext'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const { user, logout } = useAuth()
  const { isOpen: isSidebarOpen, toggle } = useSidebar()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search:', searchQuery)
  }

  return (
    <nav className="fixed w-full top-0 bg-white px-4 py-3 z-[2147483646] navbar">
      <div className="flex items-center justify-between">
        {/* Left - Menu + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-full"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isSidebarOpen}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="text-xl font-bold text-red-600">
            YouTube Clone
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Right - User actions */}
        <div className="flex items-center space-x-4 px-6">
          {user ? (
            <>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-full"
              >
                <Plus className="h-5 w-5" />
                <span className="text-sm font-medium">Upload video</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full"
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[2147483647] navbar-dropdown">
                    <div className="py-2">
                      <Link href={`/channel/${user.username}`} className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <User className="h-5 w-5 mr-3" />
                        Your Channel
                      </Link>
                      <Link href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                      </Link>
                      <button onClick={logout} className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2 ">
              <Link href="/login" className="px-4 py-2 text-black hover:bg-blue-50 rounded">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      <UploadVideoModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </nav>
  )
}

export default Navbar