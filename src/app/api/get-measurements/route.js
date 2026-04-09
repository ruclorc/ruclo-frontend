import { NextResponse } from 'next/server'
import { shopifyAdminQuery } from '@/lib/shopify-admin'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get('customerId')

  if (!customerId) {
    return NextResponse.json({ success: false, error: 'customerId required' }, { status: 400 })
  }

  try {
    const data = await shopifyAdminQuery(
      `query getCustomer($id: ID!) {
        customer(id: $id) {
          id
          email
          metafields(first: 10) {
            edges {
              node {
                namespace
                key
                value
              }
            }
          }
        }
      }`,
      { id: customerId }
    )

    const measurementsField = data?.customer?.metafields?.edges?.find(
      edge => edge.node.namespace === 'custom' && edge.node.key === 'measurements'
    )

    const measurements = measurementsField ? JSON.parse(measurementsField.node.value) : null

    return NextResponse.json({
      success: true,
      measurements,
      hasOnboarded: !!measurements,
    })
  } catch (error) {
    console.error('[get-measurements]', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch measurements' }, { status: 500 })
  }
}
