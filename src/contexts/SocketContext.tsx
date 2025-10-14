'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinVideoRoom: (videoId: string) => void
  leaveVideoRoom: (videoId: string) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinVideoRoom: () => {},
  leaveVideoRoom: () => {},
})

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: React.ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000', {
      withCredentials: true,
    })

    socketInstance.on('connect', () => {
      console.log('Connected to server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from server')
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const joinVideoRoom = (videoId: string) => {
    if (socket) {
      socket.emit('join-video', videoId)
    }
  }

  const leaveVideoRoom = (videoId: string) => {
    if (socket) {
      socket.emit('leave-video', videoId)
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinVideoRoom,
        leaveVideoRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}