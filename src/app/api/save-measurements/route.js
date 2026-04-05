import { NextResponse } from 'next/server'

export async function POST(request) {
  const { customerId, measurements } = await request.json()
  
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

  const mutation = `
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
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
        userErrors {
          field
          message
        }
      }
    }
  `

  const variables = {
    input: {
      id: customerId,
      metafields: [
        {
          namespace: 'custom',
          key: 'measurements',
          value: JSON.stringify(measurements),
          type: 'json'
        }
      ]
    }
  }

  try {
    const response = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const data = await response.json()
    
    if (data.data?.customerUpdate?.userErrors?.length > 0) {
      return NextResponse.json({ 
        error: data.data.customerUpdate.userErrors[0].message 
      }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: data.data })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to save measurements',
      details: error.message 
    }, { status: 500 })
  }
}
