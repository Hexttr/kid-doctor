import { createHmac, scryptSync, timingSafeEqual } from "crypto"

const authCookieName = "mp_session"
const sessionMaxAgeSeconds = 60 * 60 * 8
const maxFailedAttempts = 5
const attemptsWindowMs = 15 * 60 * 1000
const blockDurationMs = 15 * 60 * 1000
const minAttemptIntervalMs = 1200

interface LoginAttemptState {
  failedAttempts: number
  firstFailedAt: number
  lastAttemptAt: number
  blockedUntil?: number
}

const loginAttempts = new Map<string, LoginAttemptState>()

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

function getAttemptKey(identifier: string) {
  return identifier.trim().toLowerCase()
}

function getAttemptState(identifier: string) {
  const key = getAttemptKey(identifier)
  const now = Date.now()
  const state = loginAttempts.get(key)

  if (!state) {
    return { key, state: undefined, now }
  }

  if (state.blockedUntil && state.blockedUntil <= now) {
    loginAttempts.delete(key)
    return { key, state: undefined, now }
  }

  if (now - state.firstFailedAt > attemptsWindowMs && !state.blockedUntil) {
    loginAttempts.delete(key)
    return { key, state: undefined, now }
  }

  return { key, state, now }
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

export function getLoginAttemptStatus(identifier: string) {
  const { state, now } = getAttemptState(identifier)

  if (!state) {
    return { blocked: false, retryAfterSeconds: 0, throttled: false }
  }

  if (state.blockedUntil && state.blockedUntil > now) {
    return {
      blocked: true,
      retryAfterSeconds: Math.max(1, Math.ceil((state.blockedUntil - now) / 1000)),
      throttled: false,
    }
  }

  const throttled = now - state.lastAttemptAt < minAttemptIntervalMs

  return { blocked: false, retryAfterSeconds: 0, throttled }
}

export function registerFailedLogin(identifier: string) {
  const { key, state, now } = getAttemptState(identifier)

  if (!state) {
    loginAttempts.set(key, {
      failedAttempts: 1,
      firstFailedAt: now,
      lastAttemptAt: now,
    })
    return
  }

  const failedAttempts = state.failedAttempts + 1
  const nextState: LoginAttemptState = {
    failedAttempts,
    firstFailedAt: state.firstFailedAt,
    lastAttemptAt: now,
  }

  if (failedAttempts >= maxFailedAttempts) {
    nextState.blockedUntil = now + blockDurationMs
  }

  loginAttempts.set(key, nextState)
}

export function clearFailedLogins(identifier: string) {
  loginAttempts.delete(getAttemptKey(identifier))
}

export async function waitForFailedLoginDelay() {
  await new Promise((resolve) => setTimeout(resolve, 700))
}

export { authCookieName, sessionMaxAgeSeconds }
