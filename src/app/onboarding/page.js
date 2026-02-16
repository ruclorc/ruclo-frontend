'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-2xl text-center">
        
        {/* RUCLO Logo - Subtle, not loud */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 
            className="text-4xl sm:text-5xl mb-6 text-black font-normal"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
            }}
          >
            RUCLO
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-gray-800 mb-8 font-light"
          style={{ 
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
          }}
        >
          Your personal AI stylist
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => router.push('/onboarding/instructions')}
            className="px-18 py-4 bg-black text-white text-xs uppercase transition-all duration-500 hover:bg-gray-900"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              borderRadius: '25px'
            }}
          >
            Begin
          </button>
        </motion.div>

      </div>
    </div>
  )
}
