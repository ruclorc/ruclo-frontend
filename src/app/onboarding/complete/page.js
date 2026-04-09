'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Complete() {
  const router = useRouter()
  const [status, setStatus] = useState('saving')

  useEffect(() => {
    const saveMeasurements = async () => {
      try {
        const measurements = localStorage.getItem('userMeasurements')

        if (!measurements) {
          router.push('/stylist')
          return
        }

        const measurementsData = JSON.parse(measurements)

        // Check if user is authenticated
        const authRes = await fetch('/api/auth/me')
        const authData = await authRes.json()

        if (authData.authenticated) {
          const saveRes = await fetch('/api/save-measurements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerId: `gid://shopify/Customer/${authData.customerId}`,
              measurements: measurementsData,
            }),
          })

          const saveData = await saveRes.json()
          if (!saveData.success) {
            console.error('[complete] Failed to save:', saveData.error)
          }
        }

        setStatus('complete')

        setTimeout(() => {
          router.push('/stylist')
        }, 1000)
      } catch (error) {
        console.error('[complete] Error saving measurements:', error)
        setStatus('error')
        setTimeout(() => {
          router.push('/stylist')
        }, 2000)
      }
    }

    saveMeasurements()
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p
          className="text-sm text-gray-800 font-light"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          {status === 'saving' && 'Saving your preferences...'}
          {status === 'complete' && 'All set!'}
          {status === 'error' && 'Something went wrong. Redirecting...'}
        </p>
      </div>
    </div>
  )
}
