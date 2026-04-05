import { NextResponse } from 'next/server'

export async function POST(request) {
  const { variantId, quantity = 1 } = await request.json()
  
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

  // Create cart or add to existing
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
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
      lines: [
        {
          merchandiseId: variantId,
          quantity: quantity
        }
      ]
    }
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const data = await response.json()
    
    if (data.data?.cartCreate?.userErrors?.length > 0) {
      return NextResponse.json({ 
        error: data.data.cartCreate.userErrors[0].message 
      }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true,
      cart: data.data.cartCreate.cart,
      checkoutUrl: data.data.cartCreate.cart.checkoutUrl
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to add to cart',
      details: error.message 
    }, { status: 500 })
  }
}
