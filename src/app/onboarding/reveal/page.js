'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Reveal() {
  const router = useRouter()
  const [count, setCount] = useState(0)
  const targetCount = 47 // Number of matched items

  useEffect(() => {
    // Animate number counter
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = targetCount / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        setCount(targetCount)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  // Confetti particles
  const confettiColors = ['#000', '#333', '#666', '#999']

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* Confetti effect */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: `${20 + Math.random() * 60}%`,
            top: '-5%'
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 0.8, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut'
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-3xl text-center">
        
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto rounded-full border-2 border-black flex items-center justify-center">
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path d="M20 6L9 17l-5-5" />
            </motion.svg>
          </div>
        </motion.div>

        {/* Main Message with Number Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 
            className="text-3xl sm:text-5xl mb-4 font-light text-black"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            We styled{' '}
            <motion.span
              className="inline-block font-normal"
              animate={{ scale: count === targetCount ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {count}
            </motion.span>
            {' '}pieces
          </h1>
          <h2 
            className="text-2xl sm:text-3xl text-black font-light"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            just for <span className="italic">YOU</span>
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-sm sm:text-base text-gray-600 mb-12"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Based on your body shape and measurements
        </motion.p>

        {/* Preview Items (mock - 3 small boxes) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto"
        >
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
              className="aspect-[3/4] bg-gray-100 border border-gray-200"
            >
              {/* Placeholder for preview images */}
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                Item {item}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <button
            onClick={() => router.push('/stylist')} // TODO: Update to actual stylist page route
            className="group relative px-12 py-4 bg-black text-white text-sm uppercase tracking-widest transition-all duration-300 hover:bg-gray-900 overflow-hidden"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              letterSpacing: '0.15em'
            }}
          >
            <span className="relative z-10">See Your Matches</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.1 }}
            />
          </button>
        </motion.div>

        {/* Skip option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          onClick={() => router.push('/stylist')} // TODO: Update to actual stylist page route
          className="mt-6 text-xs text-gray-500 hover:text-black transition-colors duration-200 uppercase tracking-wider"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Skip for now
        </motion.button>

      </div>
    </div>
  )
}
