'use client'

import { useSocket } from '@/contexts/SocketContext'

export default function SocketStatus() {
    const { isConnected } = useSocket()

    return (
        <div className={`fixed top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-50 ${isConnected
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
    )
}