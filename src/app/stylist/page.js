'use client'

export default function Stylist() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 
          className="text-4xl sm:text-5xl font-normal text-black"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Stylist Page
        </h1>
        <p 
          className="text-sm text-gray-800 mt-4 font-light"
          style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
        >
          Coming soon...
        </p>
      </div>
    </div>
  )
}
