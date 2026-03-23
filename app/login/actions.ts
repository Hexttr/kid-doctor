"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  authCookieName,
  createSessionToken,
  sessionMaxAgeSeconds,
  verifyCredentials,
} from "@/lib/auth"

export interface LoginState {
  error?: string
}

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!username || !password) {
    return { error: "Введите логин и пароль." }
  }

  if (!verifyCredentials(username, password)) {
    return { error: "Неверный логин или пароль." }
  }

  const cookieStore = await cookies()

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
