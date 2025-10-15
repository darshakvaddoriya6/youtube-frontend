'use client'

import { useState, useRef } from 'react'

interface VideoPlayerProps {
  videoFile: string
  thumbnail: string
  title: string
  onTrackView?: () => void
}

export default function VideoPlayer({ videoFile, thumbnail, title, onTrackView }: VideoPlayerProps) {
  const [videoError, setVideoError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [viewTracked, setViewTracked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement
    const error = videoElement.error

    if (!videoFile) {
      setVideoError('Video file is not available')
      return
    }

    // Handle specific error types
    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_NETWORK:
          setVideoError('Network error occurred while loading the video. Please check your connection.')
          break
        case error.MEDIA_ERR_DECODE:
          setVideoError('Video format is not supported or file is corrupted.')
          break
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          setVideoError('Video source is not supported.')
          break
        default:
          setVideoError('An error occurred while loading the video.')
      }
    }

    // Retry loading the video (max 3 attempts)
    if (retryCount < 3) {
      setTimeout(() => {
        videoElement.load()
        setRetryCount(prev => prev + 1)
      }, 2000)
    }
  }

  const handleRetry = () => {
    setVideoError(null)
    setRetryCount(0)
    const videoElement = document.querySelector('video') as HTMLVideoElement
    if (videoElement) {
      videoElement.load()
    }
  }

  const handlePlay = () => {
    // Track view when video starts playing
    if (!viewTracked && onTrackView) {
      onTrackView()
      setViewTracked(true)
    }
  }

  const handleTimeUpdate = () => {
    // Track view after 30 seconds of watching (YouTube-like behavior)
    if (!viewTracked && videoRef.current && onTrackView) {
      const currentTime = videoRef.current.currentTime
      if (currentTime >= 30) {
        onTrackView()
        setViewTracked(true)
      }
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        src={videoFile}
        poster={thumbnail}
        controls
        autoPlay
        className="w-full aspect-video bg-black rounded-lg"
        onError={handleVideoError}
        onLoadStart={() => {
          setVideoError(null)
        }}
        onCanPlay={() => {
          setVideoError(null)
          setRetryCount(0)
        }}
        onPlay={handlePlay}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
        muted={false}
        disablePictureInPicture={false}
        controlsList="nodownload"
      >
        Your browser does not support the video tag.
      </video>
      {videoError && (
        <div className="mt-4 p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 mb-2 text-sm lg:text-base">{videoError}</p>
          <button
            onClick={handleRetry}
            className="px-3 lg:px-4 py-2 text-sm lg:text-base bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry Loading Video
          </button>
        </div>
      )}
      <h1 className="text-lg lg:text-xl font-bold mt-4">{title}</h1>
    </div>
  )
}