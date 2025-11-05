'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Search, Menu, Plus, LogOut, Settings, User, X } from 'lucide-react'
import UploadVideoModal from './UploadVideoModal'
import { useSidebar } from '@/contexts/SidebarContext'
import { publicApi } from '@/lib/api'
import NavbarSkeleton from './skeletons/NavbarSkeleton'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const [isMounted, setIsMounted] = useState(false)

  const { user, logout, loading } = useAuth()
  const { isOpen: isSidebarOpen, isInitialized, toggle } = useSidebar()
  const router = useRouter()

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const menuDropdownRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setIsMounted(true)

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node

      if (searchInputRef.current && !searchInputRef.current.contains(target)) {
        setShowSuggestions(false)
      }
      const isMenuButton = menuButtonRef.current?.contains(target)
      const isMenuContent = menuDropdownRef.current?.contains(target)
      if (!isMenuButton && !isMenuContent && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [isMenuOpen])



  const fetchSearchSuggestions = async (query: string) => {
    try {
      setIsSearching(true)
      const response = await publicApi.get(`/videos/search?query=${encodeURIComponent(query)}`)

      let videosData = []
      if (response.data?.statusCode && Array.isArray(response.data.statusCode)) {
        videosData = response.data.statusCode
      } else if (Array.isArray(response.data)) {
        videosData = response.data
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        videosData = response.data.data
      }

      const suggestions = videosData.slice(0, 8).map((video: any) => ({
        _id: video._id,
        title: video.title,
        thumbnail: video.thumbnail,
        owner: {
          username: video.Owner?.username || video.owner?.username,
          fullName: video.Owner?.fullName || video.owner?.fullName,
        },
        views: video.views || 0,
      }))

      setSearchSuggestions(suggestions)
    } catch (error) {
      console.error('Error fetching search suggestions:', error)
      setSearchSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value)
    setSelectedSuggestionIndex(-1)

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    if (value.trim().length > 0) {
      setShowSuggestions(true)
      searchTimeoutRef.current = setTimeout(() => {
        fetchSearchSuggestions(value.trim())
      }, 300)
    } else {
      setShowSuggestions(false)
      setSearchSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.title)
    setShowSuggestions(false)
    router.push(`/watch/${suggestion._id}`)
  }

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
    if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
    return views.toString()
  }

  const [skeletonVariant, setSkeletonVariant] = useState<'authenticated' | 'default'>('authenticated');
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    // This effect only runs on the client side
    setIsClientSide(true);
    const userData = localStorage.getItem('user');
    // Only update if we have a user, otherwise keep default
    if (userData) {
      setSkeletonVariant('authenticated');
    }
  }, []);

  // Update variant when user state changes
  useEffect(() => {
    setSkeletonVariant(user ? 'authenticated' : 'default');
  }, [user]);

  // Show skeleton while mounting/loading
  if (!isMounted || loading || !isClientSide) {
    return (
      <nav className="fixed w-full top-0 bg-white px-4 py-3 z-[999] navbar">
        <NavbarSkeleton variation={skeletonVariant} />
      </nav>
    )
  }
  return (
    <nav className="fixed w-full top-0 bg-white px-4 py-3 z-[999]  navbar">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 lg:space-x-4">
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-full"
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>

          <Link href="/" className="text-lg lg:text-xl font-bold text-red-600">
            <span className="hidden lg:inline">YouTube Clone</span>
            <span className="lg:hidden">YT</span>
          </Link>
        </div>

        <div className="flex-1 max-w-2xl mx-2 lg:mx-8 relative" ref={searchInputRef}>
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (selectedSuggestionIndex >= 0 && searchSuggestions[selectedSuggestionIndex]) {
                      e.preventDefault()
                      handleSuggestionClick(searchSuggestions[selectedSuggestionIndex])
                    } else {
                      handleSearch(e)
                    }
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false)
                    setSelectedSuggestionIndex(-1)
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setSelectedSuggestionIndex((prev) =>
                      prev < searchSuggestions.length - 1 ? prev + 1 : prev
                    )
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setSelectedSuggestionIndex((prev) => (prev > -1 ? prev - 1 : -1))
                  }
                }}
                onFocus={() => {
                  if (searchQuery.trim() && searchSuggestions.length > 0) {
                    setShowSuggestions(true)
                  }
                }}
                className="w-full px-3 lg:px-4 py-2 pr-10 text-sm lg:text-base border border-gray-300 rounded-l-full focus:outline-none focus:border-red-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setShowSuggestions(false)
                    setSearchSuggestions([])
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="px-4 lg:px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </form>

          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-[2147483648] max-h-96 overflow-y-auto">
              {isSearching && (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm">Searching...</p>
                </div>
              )}

              {!isSearching && searchSuggestions.length > 0 && (
                <div className="py-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion._id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full flex items-center px-4 py-3 text-left ${index === selectedSuggestionIndex ? 'bg-gray-100' : 'hover:bg-gray-100'
                        }`}
                    >
                      <img
                        src={suggestion.thumbnail}
                        alt={suggestion.title}
                        className="w-16 h-12 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {suggestion.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {suggestion.owner.fullName} • {formatViews(suggestion.views)} views
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4 px-2 lg:px-6">
          {user ? (
            <>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 hover:bg-green-100 rounded-full"
              >
                <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="text-xs lg:text-sm font-medium hidden lg:inline">Upload</span>
              </button>

              <div className="relative">
                <button
                  ref={menuButtonRef}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMenuOpen((prev) => !prev)
                  }}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full"
                  aria-expanded={isMenuOpen}
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-6 w-6 lg:h-8 lg:w-8 rounded-full"
                  />
                </button>

                {isMenuOpen && (
                  <div
                    ref={menuDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[2147483647]"
                  >
                    <div className="py-2">
                      <Link
                        href={`/channel/${user.username}`}
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5 mr-3" />
                        Your Channel
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false)
                          logout()
                        }}
                        className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="px-3 py-2 text-sm  bg-gray-100 hover:bg-gray-200 rounded">
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
              >
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
