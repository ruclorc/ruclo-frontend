import { URLSearchParams } from 'node:url'

const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET

let token = null
let tokenExpiresAt = 0

export async function getAdminToken() {
  if (token && Date.now() < tokenExpiresAt - 60_000) return token

  const response = await fetch(
    `https://${SHOP}/admin/oauth/access_token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Token request failed (${response.status}): ${text}`)
  }

  const { access_token, expires_in } = await response.json()
  token = access_token
  tokenExpiresAt = Date.now() + expires_in * 1000
  return token
}

export async function shopifyAdminQuery(query, variables = {}) {
  const accessToken = await getAdminToken()

  const response = await fetch(
    `https://${SHOP}/admin/api/2025-01/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`)
  }

  const { data, errors } = await response.json()
  if (errors?.length) {
    throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`)
  }
  return data
}
