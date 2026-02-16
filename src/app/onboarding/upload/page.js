'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

  const instructions = [
    {
      id: 'front',
      number: '01',
      title: 'Front View',
      description: 'Stand 6ft away, face the camera',
      capture: 'environment'
    },
    {
      id: 'side',
      number: '02',
      title: 'Side Profile',
      description: 'Turn 90° to show your side',
      capture: 'environment'
    },
    {
      id: 'face',
      number: '03',
      title: 'Face Photo',
      description: 'Clear face shot for proportions',
      capture: 'user'
    }
  ]

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
    sessionStorage.setItem('onboardingPhotos', JSON.stringify(photos))
    sessionStorage.setItem('onboardingHeight', height)
    router.push('/onboarding/processing')
  }

  // Generate height options in feet and inches format (4'10" to 7'0")
  const heightOptions = []
  for (let feet = 4; feet <= 7; feet++) {
    const maxInches = feet === 7 ? 0 : 11
    for (let inches = 0; inches <= maxInches; inches++) {
      if (feet === 4 && inches < 10) continue
      heightOptions.push(`${feet}'${inches}"`)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-8 sm:py-12">
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-5xl mb-4 sm:mb-6 font-normal text-black" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Upload 3 photos
          </h1>
          <p className="text-sm sm:text-base text-gray-800 font-light" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            To understand your body shape
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          {/* Photo Upload Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {instructions.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <input
                  id={`${item.id}-input`}
                  type="file"
                  accept="image/*"
                  capture={item.capture}
                  onChange={(e) => handlePhotoUpload(item.id, e)}
                  className="hidden"
                />
                
                <label
                  htmlFor={`${item.id}-input`}
                  className={`block bg-white border p-6 sm:p-8 text-center transition-all duration-500 cursor-pointer ${
                    photos[item.id] ? 'border-black' : 'border-gray-200 hover:border-black'
                  }`}
                  style={{ borderRadius: '6px' }}
                  onMouseEnter={() => setHoveredBox(item.id)}
                  onMouseLeave={() => setHoveredBox(null)}
                >
                  <div className="text-xs font-light mb-3 transition-colors duration-300" style={{ 
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    color: photos[item.id] ? '#000' : (hoveredBox === item.id ? '#000' : '#d1d5db')
                  }}>
                    {photos[item.id] ? 'Added' : '+'}
                  </div>
                  
                  <h3 className="text-sm uppercase mb-2 text-black font-normal" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-gray-800 font-light" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    {photos[item.id] ? 'Click to change' : item.description}
                  </p>
                </label>
              </motion.div>
            ))}
          </div>

          {/* Height Dropdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3"
          >
            <label className="text-sm text-gray-800 font-light" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
              Height:
            </label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="px-0 py-2 bg-white text-sm outline-none transition-colors duration-200"
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                border: 'none',
                borderBottom: '1px solid #e5e7eb',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' viewBox=\'0 0 10 10\'%3E%3Cpath fill=\'%23000\' d=\'M5 7L1 3h8z\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0 center',
                paddingRight: '24px',
                width: '120px',
                color: height ? '#000' : '#9ca3af'
              }}
            >
              <option value="">Select</option>
              {heightOptions.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={!isFormComplete}
              className={`px-12 py-4 text-xs uppercase transition-all duration-500 ${
                isFormComplete 
                  ? 'bg-black text-white hover:bg-gray-900' 
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
              style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                borderRadius: '25px'
              }}
            >
              Continue
            </button>
          </motion.div>

        </form>

      </div>
    </div>
  )
}
