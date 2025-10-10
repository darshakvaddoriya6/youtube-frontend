'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  videoFile: string
  thumbnail: string
  title: string
}

export default function VideoPlayer({ videoFile, thumbnail, title }: VideoPlayerProps) {
  const [videoError, setVideoError] = useState<string | null>(null)

  return (
    <div>
      <video
        src={videoFile}
        poster={thumbnail}
        controls
        autoPlay
        className="w-full aspect-video bg-black rounded-lg"
        onError={(e) => {
          const videoElement = e.target as HTMLVideoElement

          if (!videoFile) {
            setVideoError('Video file is not available')
            return
          }

          setTimeout(() => {
            videoElement.load()
          }, 1000)

          setVideoError(`Video file could not be loaded. The file might be corrupted or inaccessible.`)
        }}
        onLoadStart={() => {
          setVideoError(null)
        }}
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
      {videoError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{videoError}</p>
        </div>
      )}
      <h1 className="text-xl font-bold mt-4">{title}</h1>
    </div>
  )
}