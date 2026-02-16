'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Upload() {
  const router = useRouter()
  const [photos, setPhotos] = useState({
    front: null,
    side: null,
    face: null
  })
  const [height, setHeight] = useState('')
  const [hoveredBox, setHoveredBox] = useState(null)

  const handlePhotoUpload = (type, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [type]: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const isFormComplete = photos.front && photos.side && photos.face && height

  const handleSubmit = (e) => {
    e.preventDefault()
    // Store data in sessionStorage for processing page
    sessionStorage.setItem('onboardingPhotos', JSON.stringify(photos))
    sessionStorage.setItem('onboardingHeight', height)
    router.push('/onboarding/processing')
  }

  // Generate height options in feet and inches format (4'10" to 7'0")
  const heightOptions = []
  for (let feet = 4; feet <= 7; feet++) {
    const maxInches = feet === 7 ? 0 : 11
    for (let inches = 0; inches <= maxInches; inches++) {
      if (feet === 4 && inches < 10) continue // Start from 4'10"
      heightOptions.push(`${feet}'${inches}"`)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white flex items-center justify-center px-3 sm:px-6 py-6 sm:py-12 md:py-16"
    >
      <div className="w-full max-w-5xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-12 md:mb-16"
        >
          <h1 className="text-xl sm:text-3xl mb-2 sm:mb-4 tracking-tight font-light text-black" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '-0.02em' }}>
            Help us find your perfect fit
          </h1>
          <p className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Upload 3 photos and enter your height
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10 md:space-y-12">
          
          {/* Photo Upload Boxes */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
            
            {/* Front View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label className="block text-[9px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4 text-center text-gray-600" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Front view
              </label>
              <div 
                className="relative aspect-[3/4] bg-white transition-all duration-300 touch-manipulation"
                style={{ 
                  border: hoveredBox === 'front' ? '1px solid #000' : '1px solid #e5e7eb',
                  opacity: hoveredBox === 'front' ? 1 : 0.9
                }}
                onMouseEnter={() => setHoveredBox('front')}
                onMouseLeave={() => setHoveredBox(null)}
              >
                <AnimatePresence mode="wait">
                  {photos.front ? (
                    <motion.img 
                      key="front-image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      src={photos.front} 
                      alt="Front view" 
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
                      style={{ opacity: hoveredBox === 'front' ? 0.8 : 1 }}
                      onClick={() => document.getElementById('front-input').click()}
                    />
                  ) : (
                    <label 
                      htmlFor="front-input" 
                      className="w-full h-full flex items-center justify-center cursor-pointer active:bg-gray-50"
                    >
                      <span className="text-2xl sm:text-3xl font-light text-gray-300 transition-colors duration-300" style={{ color: hoveredBox === 'front' ? '#000' : '#d1d5db' }}>+</span>
                    </label>
                  )}
                </AnimatePresence>
                <input
                  id="front-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handlePhotoUpload('front', e)}
                  className="hidden"
                />
              </div>
            </motion.div>

            {/* Side Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-[9px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4 text-center text-gray-600" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Side profile
              </label>
              <div 
                className="relative aspect-[3/4] bg-white transition-all duration-300 touch-manipulation"
                style={{ 
                  border: hoveredBox === 'side' ? '1px solid #000' : '1px solid #e5e7eb',
                  opacity: hoveredBox === 'side' ? 1 : 0.9
                }}
                onMouseEnter={() => setHoveredBox('side')}
                onMouseLeave={() => setHoveredBox(null)}
              >
                <AnimatePresence mode="wait">
                  {photos.side ? (
                    <motion.img 
                      key="side-image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      src={photos.side} 
                      alt="Side profile" 
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
                      style={{ opacity: hoveredBox === 'side' ? 0.8 : 1 }}
                      onClick={() => document.getElementById('side-input').click()}
                    />
                  ) : (
                    <label 
                      htmlFor="side-input" 
                      className="w-full h-full flex items-center justify-center cursor-pointer active:bg-gray-50"
                    >
                      <span className="text-2xl sm:text-3xl font-light text-gray-300 transition-colors duration-300" style={{ color: hoveredBox === 'side' ? '#000' : '#d1d5db' }}>+</span>
                    </label>
                  )}
                </AnimatePresence>
                <input
                  id="side-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => handlePhotoUpload('side', e)}
                  className="hidden"
                />
              </div>
            </motion.div>

            {/* Face */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-[9px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4 text-center text-gray-600" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                Face
              </label>
              <div 
                className="relative aspect-[3/4] bg-white transition-all duration-300 touch-manipulation"
                style={{ 
                  border: hoveredBox === 'face' ? '1px solid #000' : '1px solid #e5e7eb',
                  opacity: hoveredBox === 'face' ? 1 : 0.9
                }}
                onMouseEnter={() => setHoveredBox('face')}
                onMouseLeave={() => setHoveredBox(null)}
              >
                <AnimatePresence mode="wait">
                  {photos.face ? (
                    <motion.img 
                      key="face-image"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      src={photos.face} 
                      alt="Face" 
                      className="w-full h-full object-cover cursor-pointer transition-opacity duration-300"
                      style={{ opacity: hoveredBox === 'face' ? 0.8 : 1 }}
                      onClick={() => document.getElementById('face-input').click()}
                    />
                  ) : (
                    <label 
                      htmlFor="face-input" 
                      className="w-full h-full flex items-center justify-center cursor-pointer active:bg-gray-50"
                    >
                      <span className="text-2xl sm:text-3xl font-light text-gray-300 transition-colors duration-300" style={{ color: hoveredBox === 'face' ? '#000' : '#d1d5db' }}>+</span>
                    </label>
                  )}
                </AnimatePresence>
                <input
                  id="face-input"
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) => handlePhotoUpload('face', e)}
                  className="hidden"
                />
              </div>
            </motion.div>

          </div>

          {/* Height Dropdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto mt-6 sm:mt-10 md:mt-12"
          >
            <label className="block text-[9px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-4 text-gray-600" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
              Height
            </label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-0 py-2 sm:py-4 bg-white text-sm sm:text-base outline-none transition-colors duration-200"
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                borderBottom: '1px solid #e5e7eb',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cpath fill=\'%23000\' d=\'M5 7L1 3h8z\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0 center',
                paddingRight: '24px',
                color: height ? '#000' : '#9ca3af'
              }}
            >
              <option value="">Select height</option>
              {heightOptions.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-md mx-auto mt-6 sm:mt-12 md:mt-16"
          >
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`w-full py-3 sm:py-4 text-xs uppercase tracking-widest transition-all duration-300 ${
                isFormComplete 
                  ? 'bg-black text-white hover:bg-gray-900 active:bg-gray-800' 
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                letterSpacing: '0.15em'
              }}
            >
              Continue
            </button>
          </motion.div>

        </form>

      </div>
    </motion.div>
  )
}
