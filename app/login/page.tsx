import Image from "next/image"
import { cookies } from "next/headers"
import {
  Activity,
  DatabaseZap,
  Sparkles,
  Waypoints,
} from "lucide-react"
import { redirect } from "next/navigation"

import { LoginForm } from "@/components/login-form"
import { authCookieName, verifySessionToken } from "@/lib/auth"

const valueCards = [
  {
    title: "Клиническая поддержка",
    description: "Интеллектуальные сценарии для врача, цифровые протоколы и единая маршрутизация.",
    icon: Activity,
  },
  {
    title: "Данные и регистры",
    description: "ЭМК, исследовательские массивы данных и аналитические контуры в одном пространстве.",
    icon: DatabaseZap,
  },
  {
    title: "Федеральная совместимость",
    description: "Интеграционные контуры, преемственность данных и устойчивое масштабирование.",
    icon: Waypoints,
  },
]

export default async function LoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(authCookieName)?.value

  if (verifySessionToken(session)) {
    redirect("/")
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,184,217,0.22),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_26%),linear-gradient(180deg,#eef7ff_0%,#f8fbff_44%,#ffffff_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]" />
      <div className="absolute left-0 top-0 h-[42rem] w-[42rem] rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[34rem] w-[34rem] rounded-full bg-blue-300/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 py-4 lg:grid-cols-[1.22fr_0.78fr] lg:px-10 lg:py-6">
        <section className="space-y-6 lg:pr-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            <Sparkles className="size-4 text-cyan-600" />
            Защищённый вход в цифровую платформу
          </div>

          <div className="flex items-center gap-4">
            <div className="flex size-[4.5rem] items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/55 bg-white p-2 shadow-[0_18px_42px_rgba(15,23,42,0.08)]">
              <Image
                src="/icon.svg"
                alt="Детский врач"
                width={60}
                height={60}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-700">
                НМИЦ здоровья детей
              </p>
              <div className="mt-1.5 text-base font-semibold leading-tight text-slate-950 md:text-lg">
                <div>Российская педиатрическая AI-платформа</div>
                <div>«Детский врач»</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-balance text-[2rem] font-semibold tracking-tight text-slate-950 md:text-[2.4rem] xl:text-[2.9rem] xl:leading-[1.02]">
              Вход в защищённую экосистему цифровых сервисов детского здравоохранения
            </h1>
            <p className="max-w-2xl text-[15px] leading-6 text-slate-600 md:text-base md:leading-7">
              Единая точка доступа к клиническим модулям, регистрам, аналитике, электронной
              медицинской карте и интеграционным контурам федерального уровня.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {valueCards.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[1.5rem] border border-white/80 bg-white/72 p-4 shadow-[0_14px_38px_rgba(15,23,42,0.07)] backdrop-blur-xl"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_10px_22px_rgba(15,23,42,0.16)]">
                  <Icon className="size-4" />
                </div>
                <h2 className="text-[15px] font-semibold text-slate-950">{title}</h2>
                <p className="mt-1.5 text-[13px] leading-5 text-slate-600">{description}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">
              15 стратегических инициатив
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">
              До 120 млн ₽ на проект
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm">
              ЕГИСЗ, РЭМД и клинические регистры
            </span>
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,rgba(47,109,246,0.18),rgba(0,184,217,0.1),rgba(255,255,255,0.28))] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl md:p-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#2563eb_0%,#0ea5e9_50%,#14b8a6_100%)]" />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-700">
                  Защищённый доступ
                </p>
                <h2 className="mt-1.5 text-xl font-semibold text-slate-950 md:text-2xl">Авторизация</h2>
                <p className="mt-2 max-w-sm text-sm leading-5 text-slate-600">
                  Войдите в защищённый контур платформы для доступа к клиническим и аналитическим сервисам.
                </p>
              </div>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
