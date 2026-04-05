'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Stylist() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [showTryOn, setShowTryOn] = useState(false)

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          // Create mock product data
          const mockProducts = data.images.map((img, i) => ({
            id: i,
            image: img,
            title: `Product ${i + 1}`,
            brand: 'Sample Brand',
            price: '₹4,999',
            caption: 'A perfectly tailored piece for the modern wardrobe',
            styledForYou: i % 2 === 0, // Mock: every other product is a "match"
            fitReason: [
              'Relaxed fit for your frame',
              'Length hits at hip (balanced)',
              'Shoulder width suits your build'
            ]
          }))
          setProducts(mockProducts)
        }
      })
  }, [])

  const currentProduct = products[currentIndex]
  
  // Check if current product matches user
  const isMatch = currentProduct ? checkFitMatch(currentProduct) : false

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return (prevIndex + 1) % products.length
      } else {
        return prevIndex === 0 ? products.length - 1 : prevIndex - 1
      }
    })
  }

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      paginate(-1)
    } else if (info.offset.x < -swipeThreshold) {
      paginate(1)
    }
  }

  const handleAddToBag = async () => {
    // For now, redirect to Shopify product page to add to cart
    // TODO: Get actual product variant ID from Shopify
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'ruclo-4262.myshopify.com'
    window.location.href = `https://${shopifyDomain}/cart`
    
    // Future: Use cart API
    // const response = await fetch('/api/add-to-cart', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ variantId: currentProduct.variantId, quantity: 1 })
    // })
  }

  const handleTryOn = () => {
    setShowTryOn(true)
    // TODO: Virtual try-on API call
    setTimeout(() => {
      console.log('Try-on generated')
    }, 2000)
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-800 font-light" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
          Loading...
        </p>
      </div>
    )
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center relative">

      {/* Left Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-sm text-gray-400 transition-colors duration-300 hover:text-black"
        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
      >
        {'<'}
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-sm text-gray-400 transition-colors duration-300 hover:text-black"
        style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
      >
        {'>'}
      </button>

      {/* Main Content */}
      <div className="w-full max-w-lg mx-auto px-4">
        
        {/* Product Image */}
        <div className="relative">
          
      {/* Badge */}
      {hasOnboarded && isMatch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 right-4 z-20 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase"
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                borderRadius: '25px',
                backgroundColor: '#007AFF'
              }}
            >
              Styled for you
            </motion.div>
          )}
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="w-full aspect-[3/4] object-cover pointer-events-none"
                style={{ borderRadius: '6px' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption + Buttons */}
        <div className="mt-4 text-center">
          
          {/* Caption */}
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg text-gray-800 mb-3 font-light"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            {currentProduct.caption}
          </motion.p>

          {/* Unlock Personalization Button (if not onboarded) */}
          {!hasOnboarded && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => router.push('/onboarding')}
              className="w-full mb-4 px-8 py-3 bg-blue-500 text-white text-xs uppercase transition-all duration-500 hover:bg-blue-600"
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                borderRadius: '25px',
                backgroundColor: '#007AFF'
              }}
            >
              Unlock Personalization
            </motion.button>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 justify-center">
            {hasOnboarded && isMatch && (
              <button
                onClick={() => setShowModal(true)}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-white border border-gray-200 text-black text-xs sm:text-sm uppercase transition-all duration-500 hover:border-black"
                style={{ 
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  borderRadius: '25px'
                }}
              >
                Why this fits
              </button>
            )}
            
            <button
              onClick={handleAddToBag}
              className={`px-6 sm:px-10 py-3 sm:py-4 bg-black text-white text-xs sm:text-sm uppercase transition-all duration-500 hover:bg-gray-900 ${
                !hasOnboarded || !isMatch ? 'w-full' : ''
              }`}
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                borderRadius: '25px'
              }}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
      </div>

      <Footer />

      {/* Modal - Why This Fits + Try On */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setShowModal(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 px-6 py-8"
              style={{ borderRadius: '16px 16px 0 0' }}
            >
              <div className="max-w-md mx-auto">
                
                <h2 
                  className="text-xl font-normal text-black mb-6"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  Why this will fit you
                </h2>

                <ul className="space-y-3 mb-8">
                  {currentProduct.fitReason.map((reason, i) => (
                    <li 
                      key={i}
                      className="text-sm text-gray-800 font-light"
                      style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                    >
                      • {reason}
                    </li>
                  ))}
                </ul>

                {/* Try On Button */}
                <button
                  onClick={handleTryOn}
                  disabled={showTryOn}
                  className={`w-full py-3 text-xs uppercase transition-all duration-500 mb-3 ${
                    showTryOn
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-900'
                  }`}
                  style={{ 
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    borderRadius: '25px'
                  }}
                >
                  {showTryOn ? 'Generating...' : 'Try This On Me'}
                </button>

                {/* Close */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-xs uppercase text-gray-600 hover:text-black transition-colors duration-300"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  Close
                </button>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
