import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { SocketProvider } from '@/contexts/SocketContext'
import SocketStatus from '@/components/SocketStatus'
import LayoutClient from './LayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTube Clone',
  description: 'A modern video sharing platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            <SidebarProvider>
              <div className="min-h-screen bg-white">
                <Navbar />
                <Sidebar />
                <SocketStatus />
                <LayoutClient>{children}<Toaster position="top-center" containerClassName="mt-10" /></LayoutClient>
              </div>
            </SidebarProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}