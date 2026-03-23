"use client"

import { useActionState, useState } from "react"
import { Eye, EyeOff, LoaderCircle, LockKeyhole, ShieldCheck, UserRound } from "lucide-react"

import { loginAction, type LoginState } from "@/app/login/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const initialState: LoginState = {}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="username" className="text-sm font-medium text-slate-700">
          Логин
        </label>
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="username"
            name="username"
            autoComplete="username"
            placeholder="Введите логин"
            className="h-11 rounded-2xl border-slate-200 bg-white px-11 text-[15px] shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur transition focus-visible:border-cyan-300"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Пароль
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Введите пароль"
            className="h-11 rounded-2xl border-slate-200 bg-white px-11 pr-12 text-[15px] shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur transition focus-visible:border-cyan-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700 shadow-sm">
          {state.error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full rounded-2xl bg-[linear-gradient(135deg,#2f6df6_0%,#00b8d9_100%)] text-[15px] font-semibold text-white shadow-[0_18px_34px_rgba(47,109,246,0.25)] transition hover:scale-[1.01] hover:shadow-[0_22px_42px_rgba(47,109,246,0.3)] disabled:opacity-70"
      >
        {isPending ? <LoaderCircle className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
        Войти в защищённый контур
      </Button>

      <div className="grid gap-2.5 rounded-[1.5rem] border border-slate-200 bg-slate-50/90 p-3.5 text-[13px] text-slate-600 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-4 text-cyan-600" />
          <span>Доступ проверяется на сервере, а сессия хранится в защищённой служебной куки.</span>
        </div>
        <div className="flex items-start gap-3">
          <LockKeyhole className="mt-0.5 size-4 text-cyan-600" />
          <span>Пароль не лежит в коде приложения и сохранён только в виде хэша в локальном файле настроек.</span>
        </div>
      </div>
    </form>
  )
}
