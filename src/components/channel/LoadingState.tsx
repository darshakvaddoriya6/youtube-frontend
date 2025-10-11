export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">Loading channel...</p>
    </div>
  )
}