'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Complete() {
  const router = useRouter()
  const [status, setStatus] = useState('saving')

  useEffect(() => {
    const saveMeasurements = async () => {
      try {
        // Get data from localStorage
        const measurements = localStorage.getItem('userMeasurements')
        const photos = localStorage.getItem('userPhotos')
        
        if (!measurements) {
          router.push('/stylist')
          return
        }

        // Get customer ID from Shopify session (TODO: implement proper session check)
        // For now, save to localStorage as fallback
        const measurementsData = JSON.parse(measurements)
        
        // TODO: Call API to save to Shopify customer metafields
        // const response = await fetch('/api/save-measurements', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ measurements: measurementsData })
        // })

        setStatus('complete')
        
        // Redirect to Stylist after brief moment
        setTimeout(() => {
          router.push('/stylist')
        }, 1000)
        
      } catch (error) {
        console.error('Error saving measurements:', error)
        setStatus('error')
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
