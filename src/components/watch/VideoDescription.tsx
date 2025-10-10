'use client'

interface VideoDescriptionProps {
  views: number
  createdAt: string
  description: string
}

const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
  return `${views} views`
}

export default function VideoDescription({ views, createdAt, description }: VideoDescriptionProps) {
  return (
    <div className="mt-4 bg-gray-50 p-4 rounded-xl">
      <p className="text-sm text-gray-700">
        <span className="font-medium">{formatViews(views)}</span> • {new Date(createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
        {description}
      </p>
    </div>
  )
}