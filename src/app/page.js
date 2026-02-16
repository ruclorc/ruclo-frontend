'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to onboarding
    router.push('/onboarding')
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse">
        <p className="text-gray-400" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
          Loading...
        </p>
      </div>
    </div>
  )
}
