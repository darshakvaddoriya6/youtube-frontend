'use client'

import { useSocket } from '@/contexts/SocketContext'

export default function SocketStatus() {
    const { isConnected } = useSocket()
    return null
}