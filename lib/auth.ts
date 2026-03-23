import { createHmac, scryptSync, timingSafeEqual } from "crypto"

const authCookieName = "mp_session"
const sessionMaxAgeSeconds = 60 * 60 * 8

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }

  return value
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function sign(value: string) {
  return createHmac("sha256", getRequiredEnv("SESSION_SECRET")).update(value).digest("base64url")
}

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex")
}

export function verifyCredentials(username: string, password: string) {
  const expectedUsername = getRequiredEnv("AUTH_USERNAME")
  const expectedHash = getRequiredEnv("AUTH_PASSWORD_HASH")
  const salt = getRequiredEnv("AUTH_PASSWORD_SALT")
  const computedHash = hashPassword(password, salt)

  return safeCompare(username, expectedUsername) && safeCompare(computedHash, expectedHash)
}

export function createSessionToken(username: string) {
  const expiresAt = Date.now() + sessionMaxAgeSeconds * 1000
  const payload = `${username}.${expiresAt}`
  const signature = sign(payload)

  return Buffer.from(`${payload}.${signature}`).toString("base64url")
}

export function verifySessionToken(token?: string) {
  if (!token) {
    return false
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")
    const [username, expiresAtRaw, signature] = decoded.split(".")

    if (!username || !expiresAtRaw || !signature) {
      return false
    }

    const payload = `${username}.${expiresAtRaw}`
    const expiresAt = Number(expiresAtRaw)

    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
      return false
    }

    return (
      safeCompare(sign(payload), signature) &&
      safeCompare(username, getRequiredEnv("AUTH_USERNAME"))
    )
  } catch {
    return false
  }
}

export { authCookieName, sessionMaxAgeSeconds }
