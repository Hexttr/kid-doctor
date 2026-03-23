"use server"

import { cookies } from "next/headers"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import {
  authCookieName,
  clearFailedLogins,
  createSessionToken,
  getLoginAttemptStatus,
  registerFailedLogin,
  sessionMaxAgeSeconds,
  verifyCredentials,
  waitForFailedLoginDelay,
} from "@/lib/auth"

export interface LoginState {
  error?: string
}

function getClientIdentifier(ipAddress: string, username: string) {
  return `${ipAddress}:${username.trim().toLowerCase()}`
}

async function getClientIpAddress() {
  const requestHeaders = await headers()
  const forwardedFor = requestHeaders.get("x-forwarded-for")
  const realIp = requestHeaders.get("x-real-ip")

  return forwardedFor?.split(",")[0]?.trim() || realIp || "unknown"
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!username || !password) {
    return { error: "Введите логин и пароль." }
  }

  const clientIpAddress = await getClientIpAddress()
  const clientIdentifier = getClientIdentifier(clientIpAddress, username)
  const attemptStatus = getLoginAttemptStatus(clientIdentifier)

  if (attemptStatus.blocked) {
    return {
      error: `Слишком много попыток входа. Повторите через ${attemptStatus.retryAfterSeconds} сек.`,
    }
  }

  if (attemptStatus.throttled) {
    await waitForFailedLoginDelay()
    return { error: "Подождите немного и повторите попытку входа." }
  }

  if (!verifyCredentials(username, password)) {
    registerFailedLogin(clientIdentifier)
    await waitForFailedLoginDelay()
    return { error: "Неверный логин или пароль." }
  }

  const cookieStore = await cookies()
  clearFailedLogins(clientIdentifier)

  cookieStore.set(authCookieName, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  })

  redirect("/")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(authCookieName)
  redirect("/login")
}
