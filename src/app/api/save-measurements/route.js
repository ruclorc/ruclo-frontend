import { NextResponse } from 'next/server'
import { shopifyAdminQuery } from '@/lib/shopify-admin'

export async function POST(request) {
  const { customerId, measurements } = await request.json()

  if (!customerId || !measurements) {
    return NextResponse.json({ success: false, error: 'customerId and measurements required' }, { status: 400 })
  }

  try {
    const data = await shopifyAdminQuery(
      `mutation customerUpdate($input: CustomerInput!) {
        customerUpdate(input: $input) {
          customer {
            id
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        input: {
          id: customerId,
          metafields: [
            {
              namespace: 'custom',
              key: 'measurements',
              value: JSON.stringify(measurements),
              type: 'json',
            },
          ],
        },
      }
    )

    if (data?.customerUpdate?.userErrors?.length > 0) {
      return NextResponse.json({
        success: false,
        error: data.customerUpdate.userErrors[0].message,
      }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[save-measurements]', error)
    return NextResponse.json({ success: false, error: 'Failed to save measurements' }, { status: 500 })
  }
}
