'use client'

import { ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import LikedVideoCard from './LikedVideoCard'
import { LikedVideo } from './LikedVideoCard'

interface LikedVideosListProps {
  groupedHistory: Record<string, LikedVideo[]>
  onVideoClick: (video: any) => void
  onRemoveLikedVideo?: (id: string) => Promise<void>
}

const LikedVideosList = ({
  groupedHistory,
  onVideoClick,
  onRemoveLikedVideo = async () => {},
}: LikedVideosListProps) => {
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleRemove = async (id: string) => {
    try {
      setRemovingId(id)
      await onRemoveLikedVideo(id)
    } finally {
      setRemovingId(null)
      setActiveMenu(null)
    }
  }

  const handleToggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  const handleCloseMenu = () => {
    setActiveMenu(null)
  }

  const allVideos = Object.values(groupedHistory).flat()
  const hasVideos = allVideos.length > 0

  if (!hasVideos) {
    return (
      <div className="text-center py-20">
        <ThumbsUp className="h-20 w-20 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-700 text-xl font-medium">
          No liked videos yet
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Videos you like will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {Object.entries(groupedHistory).map(([date, items]) => (
        <div key={date}>
          <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">
            {date}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:space-y-4 lg:block">
            {items.map((item) => (
              <LikedVideoCard
                key={item._id}
                item={item}
                onVideoClick={onVideoClick}
                onRemove={handleRemove}
                removingId={removingId}
                activeMenu={activeMenu}
                onToggleMenu={handleToggleMenu}
                onCloseMenu={handleCloseMenu}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LikedVideosList