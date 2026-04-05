import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get('customerId')
  
  if (!customerId) {
    return NextResponse.json({ error: 'Customer ID required' }, { status: 400 })
  }

  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

  const query = `
    query getCustomer($id: ID!) {
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
    }
  `

  try {
    const response = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
      },
      body: JSON.stringify({ 
        query, 
        variables: { id: customerId } 
      }),
    })

    const data = await response.json()
    
    // Extract measurements from metafields
    const measurementsField = data.data?.customer?.metafields?.edges?.find(
      edge => edge.node.namespace === 'custom' && edge.node.key === 'measurements'
    )
    
    const measurements = measurementsField ? JSON.parse(measurementsField.node.value) : null

    return NextResponse.json({ 
      measurements,
      hasOnboarded: !!measurements 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to fetch measurements',
      details: error.message 
    }, { status: 500 })
  }
}
