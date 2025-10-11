import Link from 'next/link'

interface ErrorStateProps {
  error: string | null
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-white text-gray-700">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-semibold mb-2">Channel Not Found</h1>
      <p className="text-gray-500 mb-4">{error}</p>
      <Link href="/" className="text-red-600 hover:underline">← Back to Home</Link>
    </div>
  )
}