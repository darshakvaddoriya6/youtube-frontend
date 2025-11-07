'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api/api'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  views: number
  owner: {
    _id: string
    username: string
    fullName: string
  }
  createdAt: string
  updatedAt: string
}

interface HistoryItem {
  _id: string
  video: Video
  createdAt: string
  updatedAt: string
}

export function useWatchHistory(isAuthenticated: boolean) {
  const router = useRouter()
  const [watchHistory, setWatchHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [clearingAll, setClearingAll] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const fetchWatchHistory = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!isAuthenticated) {
        setWatchHistory([])
        return
      }

      const response = await api.get('/users/history')

      let historyData = []
      if (response.data?.data?.history) {
        historyData = response.data.data.history
      } else if (response.data?.history) {
        historyData = response.data.history
      }

      setWatchHistory(historyData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteHistory = async (historyId: string) => {
    if (!confirm('Remove from Watch history?')) return

    try {
      setDeletingId(historyId)
      await api.delete(`/users/history/delete/${historyId}`)
      setWatchHistory((prev) => prev.filter((item) => item._id !== historyId))
      setActiveMenu(null)
    } catch (err) {
      console.error('Failed to delete history:', err)
      alert('Failed to delete history item')
    } finally {
      setDeletingId(null)
    }
  }

  const handleClearAllHistory = async () => {
    if (!confirm('Clear all watch history? This action cannot be undone.')) return

    try {
      setClearingAll(true)
      await api.delete('/users/history/watch-history/clear')
      setWatchHistory([])
      setActiveMenu(null)
    } catch (err) {
      console.error('Failed to clear history:', err)
      alert('Failed to clear watch history')
    } finally {
      setClearingAll(false)
    }
  }

  const handleVideoClick = async (video: any) => {
    if (video._id) {
      try {
        await api.post('/users/history/add', { videoId: video._id })
      } catch (err: any) {
        if (err.response?.status === 401) {
          // Handle unauthorized error silently
        }
      }
      router.push(`/watch/${video._id}`)
    }
  }

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  const closeMenu = () => {
    setActiveMenu(null)
  }

  useEffect(() => {
    fetchWatchHistory()
  }, [isAuthenticated])

  return {
    watchHistory,
    loading,
    error,
    deletingId,
    clearingAll,
    activeMenu,
    handleDeleteHistory,
    handleClearAllHistory,
    handleVideoClick,
    toggleMenu,
    closeMenu,
  }
}