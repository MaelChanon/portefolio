import jwt, { PrivateKey, SignOptions } from 'jsonwebtoken'
import envs from './env'
const secretKey: PrivateKey = envs.JSON_PASSWORD
export function generateToken(payload: object, options = {}) {
  // Default options
  const defaultOptions = {
    expiresIn: '24h', // Token expires in 1 hour
    algorithm: 'HS256', // HMAC SHA-256 signing algorithm
  }
  // Merge default options with provided options
  const tokenOptions = { ...defaultOptions, ...options } as SignOptions

  try {
    // Generate JWT token
    const token = jwt.sign(payload, secretKey, tokenOptions)

    return {
      success: true,
      token: token,
      expiresIn: tokenOptions.expiresIn,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    }
  }
}

export function verifyToken(token: string, secretKey: string) {
  try {
    const decoded = jwt.verify(token, secretKey)
    return {
      success: true,
      decoded: decoded,
    }
  } catch (error: any) {
    return {
      success: false,
      error: error,
    }
  }
}
