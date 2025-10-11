'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Play, History, ThumbsUp, Clock, FolderOpen, Settings, HelpCircle, Flag } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'

const Sidebar = () => {
  const pathname = usePathname()
  const { isOpen, close } = useSidebar()

  const menuItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/subscriptions', icon: Play, label: 'Subscriptions' },
  ]

  const libraryItems = [
    { href: '/history', icon: History, label: 'History' },
    { href: '/liked', icon: ThumbsUp, label: 'Liked Videos' },
    { href: '/playlists', icon: FolderOpen, label: 'Playlists' },
  ]

  const settingsItems = [
    { href: '/settings', icon: Settings, label: 'Settings' },
    { href: '/help', icon: HelpCircle, label: 'Help' },
    { href: '/feedback', icon: Flag, label: 'Send Feedback' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div
      className={`fixed left-0 top-16 h-full bg-white  z-40 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'w-60' : 'w-[70px]'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            <div className="mb-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-2 hover:bg-gray-100 ${
                    isOpen ? 'px-6' : 'px-4 justify-center'
                  } ${isActive(item.href) ? 'bg-gray-100' : ''}`}
                  title={isOpen ? '' : item.label}
               
                >
                  <item.icon className="h-6 w-6" />
                  {isOpen && <span className="text-sm font-medium ml-4">{item.label}</span>}
                </Link>
              ))}
            </div>

            <div className="mb-6">
              {isOpen && (
                <h3 className="px-6 py-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Library
                </h3>
              )}
              {libraryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-2 hover:bg-gray-100 ${
                    isOpen ? 'px-6' : 'px-4 justify-center'
                  } ${isActive(item.href) ? 'bg-gray-100' : ''}`}
                  title={isOpen ? '' : item.label}
                >
                  <item.icon className="h-6 w-6" />
                  {isOpen && <span className="text-sm font-medium ml-4">{item.label}</span>}
                </Link>
              ))}
            </div>

            <div>
              {isOpen && (
                <h3 className="px-6 py-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Settings
                </h3>
              )}
              {settingsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-2 hover:bg-gray-100 ${
                    isOpen ? 'px-6' : 'px-4 justify-center'
                  } ${isActive(item.href) ? 'bg-gray-100' : ''}`}
                  title={isOpen ? '' : item.label}
                  
                >
                  <item.icon className="h-6 w-6" />
                  {isOpen && <span className="text-sm font-medium ml-4">{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar