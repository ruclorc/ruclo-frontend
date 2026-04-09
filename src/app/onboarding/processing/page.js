'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Processing() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [images, setImages] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Fetch product images
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          // Multiply images to create full caterpillar effect (for demo purposes)
          const targetCount = 50
          const repeatedImages = []
          while (repeatedImages.length < targetCount) {
            repeatedImages.push(...data.images)
          }
          setImages(repeatedImages.slice(0, targetCount))
        }
      })
      .catch(err => console.error('Failed to fetch images:', err))

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setIsComplete(true)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 200) // 10 seconds total (faster for mimicking)

    return () => clearInterval(progressInterval)
  }, [router])

  // Path coordinates for images to follow (diamond shape)
  const pathPoints = [
    { x: 0, y: -250 },     // Top
    { x: 350, y: 0 },      // Right
    { x: 0, y: 250 },      // Bottom
    { x: -350, y: 0 },     // Left
    { x: 0, y: -250 }      // Back to top
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Animated Image Trail */}
      <AnimatePresence>
        {!isComplete && images.map((imageUrl, i) => {
          const delay = (i / images.length) * 15 // Spread images along path
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-40px',
                marginTop: '-40px'
              }}
              animate={{
                x: pathPoints.map(p => p.x),
                y: pathPoints.map(p => p.y)
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
                delay: delay
              }}
            >
              <motion.img 
                src={imageUrl} 
                alt="Product"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
                style={{ 
                  borderRadius: '4px',
                  opacity: 0.5
                }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Center Content */}
      <div className="relative z-10 text-center">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-sm sm:text-base text-gray-800 font-light mb-4"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                Analyzing your style...
              </p>

              {/* Progress Bar */}
              <div className="w-48 h-px bg-gray-200 mx-auto">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-3xl sm:text-4xl font-normal text-black mb-8"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {['Your', 'stylist', 'has', 'curated', 'some', 'clothes', 'for', 'you'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.4,
                      delay: i * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 1.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onClick={() => {
                  const height = sessionStorage.getItem('onboardingHeight') || "5'8\""
                  const measurements = {
                    height,
                    chest: 38,
                    waist: 32,
                    hips: 40,
                    inseam: 30,
                    shoulder: 17,
                    photoAnalyzed: true,
                    analyzedAt: new Date().toISOString(),
                  }
                  localStorage.setItem('userMeasurements', JSON.stringify(measurements))
                  localStorage.setItem('hasCompletedOnboarding', 'true')
                  router.push('/stylist')
                }}
                className="px-12 py-4 bg-black text-white text-xs uppercase transition-all duration-500 hover:bg-gray-900"
                style={{ 
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  borderRadius: '25px'
                }}
              >
                View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
