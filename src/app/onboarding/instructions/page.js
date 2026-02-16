'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Instructions() {
  const router = useRouter()

  const instructions = [
    {
      icon: '📸',
      title: 'Front View',
      description: 'Stand 6ft away, face the camera directly'
    },
    {
      icon: '👤',
      title: 'Side Profile',
      description: 'Turn 90° to show your side profile'
    },
    {
      icon: '😊',
      title: 'Face Photo',
      description: 'Clear face shot for proportions'
    }
  ]

  const tips = [
    { icon: '💡', text: 'Good lighting' },
    { icon: '👕', text: 'Wear fitted clothes' },
    { icon: '📏', text: 'Stand straight' },
    { icon: '🚫', text: 'No baggy outfits' }
  ]

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-3xl sm:text-4xl mb-4 tracking-tight font-light text-black"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              letterSpacing: '-0.02em'
            }}
          >
            Help us find your perfect fit
          </h1>
          <p 
            className="text-sm sm:text-base text-gray-500"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            We'll need 3 quick photos to understand your body shape
          </p>
        </motion.div>

        {/* Photo Instructions - 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {instructions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white border border-gray-200 p-6 text-center transition-all duration-300 hover:border-black hover:shadow-sm"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 
                className="text-xs uppercase tracking-wider mb-2 text-black font-medium"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {item.title}
              </h3>
              <p 
                className="text-sm text-gray-600"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h3 
            className="text-xs uppercase tracking-wider text-center text-gray-600 mb-6"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            For best results
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <span 
                  className="text-xs text-gray-600"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  {tip.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={() => router.push('/onboarding/upload')}
            className="px-12 py-4 bg-black text-white text-sm uppercase tracking-widest transition-all duration-300 hover:bg-gray-900"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              letterSpacing: '0.15em'
            }}
          >
            I'm Ready
          </button>
        </motion.div>

      </div>
    </div>
  )
}
