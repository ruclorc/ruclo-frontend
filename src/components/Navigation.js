'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const shopifyDomain = 'https://ruclo-4262.myshopify.com'

  const navLinks = [
    { label: 'Stylist', href: '/stylist' },
    { label: 'Editorial', href: `${shopifyDomain}/pages/editorial` },
    { label: 'Menswear', href: `${shopifyDomain}/collections/menswear` },
    { label: 'Womenswear', href: `${shopifyDomain}/collections/womenswear` },
    { label: 'Accessories/Other', href: `${shopifyDomain}/collections/accessories` }
  ]

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden sm:block border-b border-gray-200 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Left - Nav Links */}
          <div className="flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-black hover:text-gray-600 transition-colors duration-300"
                style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center - Logo */}
          <a href="/stylist" className="absolute left-1/2 -translate-x-1/2">
            <svg 
              width="80" 
              height="23" 
              viewBox="0 0 700 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 30V170M20 30H90C110.987 30 128 47.0132 128 68C128 88.9868 110.987 106 90 106H20M20 106L100 170" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square" strokeLinejoin="miter"/>
              <path d="M168 30V110C168 138.167 190.833 161 219 161C247.167 161 270 138.167 270 110V30" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <path d="M370 68C370 47.0132 352.987 30 332 30C311.013 30 294 47.0132 294 68V132C294 152.987 311.013 170 332 170C352.987 170 370 152.987 370 132" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <path d="M410 30V170H500" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <circle cx="580" cy="100" r="75" fill="#1A1A1A"/>
              <circle cx="580" cy="100" r="40" fill="#FEFEFE"/>
            </svg>
          </a>

          {/* Right - Actions */}
          <div className="flex items-center gap-6">
            <a
              href={`${shopifyDomain}/account/login`}
              className="text-sm text-black hover:text-gray-600 transition-colors duration-300"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Log in
            </a>
            <a
              href={`${shopifyDomain}/search`}
              className="text-sm text-black hover:text-gray-600 transition-colors duration-300"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Search
            </a>
            <a
              href={`${shopifyDomain}/cart`}
              className="text-sm text-black hover:text-gray-600 transition-colors duration-300"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
            >
              Cart 2
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="sm:hidden border-b border-gray-200 bg-white">
        <div className="px-4 py-4 flex items-center justify-between">
          
          {/* Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-sm text-black"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Menu
          </button>

          {/* Logo */}
          <a href="/stylist">
            <svg 
              width="60" 
              height="17" 
              viewBox="0 0 700 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 30V170M20 30H90C110.987 30 128 47.0132 128 68C128 88.9868 110.987 106 90 106H20M20 106L100 170" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square" strokeLinejoin="miter"/>
              <path d="M168 30V110C168 138.167 190.833 161 219 161C247.167 161 270 138.167 270 110V30" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <path d="M370 68C370 47.0132 352.987 30 332 30C311.013 30 294 47.0132 294 68V132C294 152.987 311.013 170 332 170C352.987 170 370 152.987 370 132" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <path d="M410 30V170H500" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
              <circle cx="580" cy="100" r="75" fill="#1A1A1A"/>
              <circle cx="580" cy="100" r="40" fill="#FEFEFE"/>
            </svg>
          </a>

          {/* Cart */}
          <a
            href={`${shopifyDomain}/cart`}
            className="text-sm text-black"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Cart 2
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-200 z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-4 left-4 right-4 bg-white z-50 sm:hidden p-8 shadow-xl"
              style={{ borderRadius: '16px' }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-normal" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  Menu
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl text-black leading-none"
                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {navLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="block text-xl text-black hover:text-gray-600 transition-colors duration-300"
                    style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
