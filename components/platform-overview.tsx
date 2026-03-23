import { Activity, Database, Orbit, Shield, Waypoints } from "lucide-react"

const pillars = [
  {
    title: "Клиническая эффективность",
    description:
      "ИИ-диагностика, модули поддержки принятия решений, цифровые протоколы и помощь врачу в реальных клинических сценариях.",
    icon: Activity,
  },
  {
    title: "Данные как актив",
    description:
      "Регистры, когорты, единая ЭМК и внутренние контуры хранения для исследований, аналитики и управленческой прозрачности.",
    icon: Database,
  },
  {
    title: "Федеральная совместимость",
    description:
      "Интеграция с МИС, ЕГИСЗ и РЭМД, контроль качества данных и соответствие регуляторным требованиям.",
    icon: Waypoints,
  },
]

const trustSignals = [
  "Клиническая и научная экспертиза",
  "Регуляторное соответствие и информационная безопасность",
  "Архитектура для масштабирования на новые нозологии",
  "Сценарии для врачей, аналитиков и управленцев",
]

export function PlatformOverview() {
  return (
    <section id="platform" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-800">
              <Orbit className="size-4" />
              Архитектура платформы
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              От отдельных инициатив к единой цифровой системе детского здравоохранения
            </h2>
            <p className="text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Дополнительная информация из проектных материалов усиливает главный тезис:
              каждая инициатива создаёт не только локальный сервис, но и компонент общей
              инфраструктуры данных, клинической поддержки и федерального взаимодействия.
            </p>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Основа доверия</p>
              <div className="mt-5 grid gap-3">
                {trustSignals.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-200"
                  >
                    <Shield className="size-4 text-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            {pillars.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(20,184,166,0.14))] text-sky-700">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
