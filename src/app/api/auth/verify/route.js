import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import crypto from 'crypto'
import { shopifyAdminQuery } from '@/lib/shopify-admin'

const HMAC_SECRET = process.env.HMAC_SECRET
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

function verifyHmac(cid, email, providedHmac) {
  const message = `${cid}:${email}`
  const expectedHmac = crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(message)
    .digest('hex')

  const a = Buffer.from(expectedHmac, 'hex')
  const b = Buffer.from(providedHmac, 'hex')

  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

async function verifyCustomerInShopify(customerId, email) {
  try {
    const data = await shopifyAdminQuery(
      `query getCustomer($id: ID!) {
        customer(id: $id) {
          id
          email
          state
        }
      }`,
      { id: `gid://shopify/Customer/${customerId}` }
    )

    const customer = data?.customer
    if (!customer) return false
    if (customer.email.toLowerCase() !== email.toLowerCase()) return false
    return true
  } catch (error) {
    console.error('[auth/verify] Shopify query error:', error.message)
    return false
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const cid = searchParams.get('cid')
  const email = searchParams.get('email')
  const hmac = searchParams.get('hmac')

  if (!cid || !email || !hmac) {
    return NextResponse.redirect(new URL('/stylist', request.url))
  }

  if (!verifyHmac(cid, email, hmac)) {
    console.error('[auth/verify] HMAC verification failed')
    return NextResponse.redirect(new URL('/stylist', request.url))
  }

  try {
    const isValid = await verifyCustomerInShopify(cid, email)
    if (!isValid) {
      console.error('[auth/verify] Shopify customer verification failed')
      return NextResponse.redirect(new URL('/stylist', request.url))
    }

    const token = await new SignJWT({
      customerId: cid,
      email: email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    const response = NextResponse.redirect(new URL('/stylist', request.url))

    response.cookies.set('ruclo_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[auth/verify]', error)
    return NextResponse.redirect(new URL('/stylist', request.url))
  }
}
