import { Clock } from 'lucide-react'

const WatchLaterHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Clock className="h-8 w-8 mr-3 text-gray-900" />
        <h1 className="text-3xl font-semibold text-gray-900">Watch Later</h1>
      </div>
    </div>
  )
}

export default WatchLaterHeader