'use client'
import { motion } from 'framer-motion'

export default function Signup() {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ruclo-4262.myshopify.com'
  const returnUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/onboarding/complete`

  const handleSignup = () => {
    // Store a flag that user came from onboarding
    localStorage.setItem('redirectAfterLogin', '/stylist')
    
    // Redirect to Shopify signup with return URL pointing to your site
    const fullReturnUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/onboarding/complete`
    window.location.href = `https://${shopifyDomain}/account/register?checkout_url=${encodeURIComponent(fullReturnUrl)}`
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl font-normal text-black mb-6"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Create your account
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-gray-800 mb-8 font-light"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          To save your personalized experience and shop
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSignup}
          className="px-12 py-4 bg-black text-white text-xs uppercase transition-all duration-500 hover:bg-gray-900"
          style={{ 
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            borderRadius: '25px'
          }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}
