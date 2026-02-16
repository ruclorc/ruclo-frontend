import { NextResponse } from 'next/server'

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    
    // Extract just the image URLs
    const images = data.data.products.edges
      .map(edge => edge.node.images.edges[0]?.node.url)
      .filter(Boolean)

    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products', images: [] }, { status: 500 })
  }
}
