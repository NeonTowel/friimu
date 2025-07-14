import { Context, Next } from 'hono'

type Bindings = {
  AUTH0_DOMAIN: string
  AUTH0_AUDIENCE: string
}

interface JWTPayload {
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  azp: string
  scope?: string
}

export async function verifyJWT(token: string, domain: string, audience: string): Promise<JWTPayload> {
  const jwksUrl = `https://${domain}/.well-known/jwks.json`
  
  try {
    const [header] = token.split('.')
    const { kid, alg } = JSON.parse(atob(header))
    
    const jwksResponse = await fetch(jwksUrl)
    const { keys } = await jwksResponse.json()
    
    const key = keys.find((k: any) => k.kid === kid)
    if (!key) throw new Error('Key not found')
    
    const cryptoKey = await crypto.subtle.importKey(
      'jwk',
      key,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const encoder = new TextEncoder()
    const [headerB64, payloadB64, signatureB64] = token.split('.')
    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0))
    
    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      signature,
      data
    )
    
    if (!isValid) throw new Error('Invalid signature')
    
    const payload: JWTPayload = JSON.parse(atob(payloadB64))
    
    if (payload.exp < Date.now() / 1000) throw new Error('Token expired')
    if (payload.aud !== audience) throw new Error('Invalid audience')
    if (!payload.iss.includes(domain)) throw new Error('Invalid issuer')
    
    return payload
  } catch (error) {
    throw new Error(`JWT verification failed: ${error.message}`)
  }
}

export function authMiddleware() {
  return async (c: Context<{ Bindings: Bindings }>, next: Next) => {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Missing or invalid authorization header' }, 401)
    }
    
    const token = authHeader.substring(7)
    
    try {
      const payload = await verifyJWT(token, c.env.AUTH0_DOMAIN, c.env.AUTH0_AUDIENCE)
      c.set('user', payload)
      await next()
    } catch (error) {
      return c.json({ error: 'Invalid token', details: error.message }, 401)
    }
  }
}
