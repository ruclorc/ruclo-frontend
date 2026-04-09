import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function GET(request) {
  const token = request.cookies.get('ruclo_session')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    return NextResponse.json({
      authenticated: true,
      customerId: payload.customerId,
      email: payload.email,
    })
  } catch (error) {
    console.error('[auth/me] Invalid token:', error.message)
    return NextResponse.json({ authenticated: false })
  }
}
