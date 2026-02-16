'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      <div className="w-full max-w-2xl text-center">
        
        {/* RUCLO Logo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <svg 
            width="200" 
            height="57" 
            viewBox="0 0 700 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path d="M20 30V170M20 30H90C110.987 30 128 47.0132 128 68C128 88.9868 110.987 106 90 106H20M20 106L100 170" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square" strokeLinejoin="miter"/>
            <path d="M168 30V110C168 138.167 190.833 161 219 161C247.167 161 270 138.167 270 110V30" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
            <path d="M370 68C370 47.0132 352.987 30 332 30C311.013 30 294 47.0132 294 68V132C294 152.987 311.013 170 332 170C352.987 170 370 152.987 370 132" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
            <path d="M410 30V170H500" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
            <circle cx="580" cy="100" r="75" fill="#1A1A1A"/>
            <circle cx="580" cy="100" r="40" fill="#FEFEFE"/>
          </svg>
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
            onClick={() => router.push('/onboarding/upload')}
            className="px-12 py-4 bg-black text-white text-xs uppercase transition-all duration-500 hover:bg-gray-900"
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
