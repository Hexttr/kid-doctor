import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck, ChevronDown, ShieldCheck, Sparkles } from "lucide-react"

import { LogoutButton } from "@/components/logout-button"

const metrics = [
  { value: "15", label: "приоритетных инициатив" },
  { value: "500+", label: "млн ₽ потенциального портфеля" },
  { value: "2026", label: "год запуска ключевых направлений" },
]

const capabilityTiles = [
  "ИИ для клинических решений",
  "Единая ЭМК и регистры",
  "Федеральные интеграции",
  "Аналитика и управление данными",
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,184,217,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(180deg,#07111f_0%,#0b1f36_48%,#0d2946_100%)] pb-8 pt-4 text-white md:pb-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:88px_88px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="absolute left-[8%] top-20 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-12 right-[6%] h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-1rem)] max-w-7xl flex-col justify-between gap-8 px-6 md:gap-10 md:px-10">
        <header className="flex flex-col gap-4 px-2 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-[6.75rem] items-center justify-center overflow-hidden rounded-[1.55rem] border border-white/18 bg-white p-1.5 shadow-[0_18px_42px_rgba(2,6,23,0.22)]">
              <Image
                src="/images/logo.png"
                alt="НМИЦ здоровья детей"
                width={96}
                height={96}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-cyan-200/80">
                НМИЦ здоровья детей
              </p>
              <div className="mt-1 text-sm font-medium leading-tight text-white/78">
                <div>Российская педиатрическая AI-платформа</div>
                <div>«Детский врач»</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <nav className="mr-4 flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="#platform"
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/76 transition hover:bg-white/8 hover:text-white"
              >
                ПЛАТФОРМА
              </Link>
              <Link
                href="#projects"
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/76 transition hover:bg-white/8 hover:text-white"
              >
                ИНИЦИАТИВЫ
              </Link>
              <Link
                href="#impact"
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/76 transition hover:bg-white/8 hover:text-white"
              >
                ЭФФЕКТ
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Sparkles className="size-4" />
              российская платформа нового поколения для детского здравоохранения
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200/80">
                Российская педиатрическая AI-платформа
                <br />
                «Детский врач»
              </p>
              <h1 className="max-w-4xl text-balance text-[2rem] font-semibold leading-[1.02] tracking-tight text-white md:text-[2.6rem] xl:text-[3.2rem]">
                Единая цифровая среда для врачей, пациентов и управленческих команд
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/72 md:text-lg">
                Портфель НМИЦ объединяет ИИ-сервисы, регистры, аналитику, ЭМК и федеральные
                интеграции в единую платформу для врачей, исследователей и управленческих команд.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="#projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5"
              >
                Смотреть инициативы
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#impact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12"
              >
                Системный эффект
                <ShieldCheck className="size-4" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur-xl"
                >
                  <div className="text-3xl font-semibold text-white md:text-4xl">{metric.value}</div>
                  <p className="mt-2 text-sm leading-5 text-white/68">{metric.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(145deg,rgba(47,109,246,0.22),rgba(0,184,217,0.08),transparent)] blur-2xl" />
            <div className="relative space-y-5 rounded-[2rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                    Архитектурная готовность
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                    Архитектура единой цифровой среды
                  </h2>
                </div>
                <div className="inline-flex min-w-[9.5rem] items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-center text-sm text-emerald-200">
                  готово к развитию
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {capabilityTiles.map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
                  >
                    <div className="flex items-center justify-between text-sm text-white/64">
                      <span>Модуль {index + 1}</span>
                      <BadgeCheck className="size-4 text-cyan-300" />
                    </div>
                    <p className="mt-3 text-base font-medium text-white">{item}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/68">
                  <span className="rounded-full bg-cyan-300/12 px-3 py-1 text-cyan-100">
                    ЕГИСЗ / РЭМД
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1">МИС-интеграции</span>
                  <span className="rounded-full bg-white/8 px-3 py-1">Клинические регистры</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/72">
                  Платформа ускоряет принятие клинических решений, объединяет данные в едином
                  контуре и создаёт основу для масштабирования цифровых сервисов на новые направления.
                </p>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#platform"
          className="mx-auto flex animate-bounce flex-col items-center text-sm text-white/62 transition hover:text-white"
        >
          <span className="mb-2">Прокрутить к архитектуре платформы</span>
          <ChevronDown className="size-5" />
        </a>
      </div>
    </section>
  )
}
