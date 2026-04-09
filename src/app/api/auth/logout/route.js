import { NextResponse } from 'next/server'

export async function GET(request) {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

  const response = NextResponse.redirect(
    `https://${shopifyDomain}`
  )

  response.cookies.set('ruclo_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })

  return response
}
