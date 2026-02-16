'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Processing() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  const messages = [
    'Analyzing your body shape...',
    'Measuring proportions...',
    'Calculating fit ranges...',
    'Styling your wardrobe...',
    'Finding your perfect matches...'
  ]

  useEffect(() => {
    // Simulate AI processing
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Navigate to reveal after completion
          setTimeout(() => {
            router.push('/onboarding/reveal')
          }, 800)
          return 100
        }
        return prev + 1
      })
    }, 400) // 40 seconds total (100 * 400ms)

    // Rotate messages every 8 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
    }, 8000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,1) 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,1) 50%)',
            'radial-gradient(circle at 50% 80%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,1) 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,1) 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg text-center">
        
        {/* Animated Circle Loader */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-32 h-32">
            {/* Outer rotating circle */}
            <motion.div
              className="absolute inset-0 border-2 border-gray-800 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -ml-1 -mt-1"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>

            {/* Inner pulsing circle */}
            <motion.div
              className="absolute inset-4 border-2 border-gray-700 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Rotating Messages */}
        <div className="h-16 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl text-white font-light"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          
          {/* Progress Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-gray-500 font-light"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Subtle hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="mt-12 text-xs text-gray-600"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          This will only take a moment...
        </motion.p>

      </div>
    </div>
  )
}
