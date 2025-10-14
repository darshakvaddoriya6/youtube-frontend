import { ChannelSkeleton } from '@/components/skeletons'

export default function LoadingState() {
  return (
    <div className="p-3 lg:p-6 max-w-6xl mx-auto">
      <ChannelSkeleton />
    </div>
  )
}