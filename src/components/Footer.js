'use client'

export default function Footer() {
  const shopifyDomain = 'https://ruclo-4262.myshopify.com'

  const footerLinks = [
    { label: 'Stylist', href: '/stylist' },
    { label: 'Editorial', href: `${shopifyDomain}/pages/editorial` },
    { label: 'Menswear', href: `${shopifyDomain}/collections/menswear` },
    { label: 'Womenswear', href: `${shopifyDomain}/collections/womenswear` },
    { label: 'Accessories/Other', href: `${shopifyDomain}/collections/accessories` }
  ]

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-screen-2xl mx-auto px-6">
        
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {footerLinks.map((link, i) => (
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

        {/* Newsletter */}
        <div className="text-center mb-6">
          <a
            href={`${shopifyDomain}/pages/newsletter`}
            className="text-sm text-black hover:text-gray-600 transition-colors duration-300 inline-flex items-center gap-2"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Join the newsletter →
          </a>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-600 gap-4">
          <div style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            © 2026, RUCLO.
          </div>
          <a
            href={`${shopifyDomain}/pages/privacy-policy`}
            className="hover:text-black transition-colors duration-300"
            style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
          >
            Privacy policy
          </a>
          <div style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Powered by Shopify
          </div>
        </div>
      </div>
    </footer>
  )
}
