import { Clock } from 'lucide-react'

const WatchLaterEmptyState = () => {
  return (
    <div className="text-center py-20">
      <Clock className="h-20 w-20 mx-auto text-gray-300 mb-4" />
      <p className="text-gray-700 text-xl font-medium">
        Save videos to watch later
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Videos you add to watch later will appear here
      </p>
    </div>
  )
}

export default WatchLaterEmptyState