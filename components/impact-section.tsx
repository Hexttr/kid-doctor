import { BrainCircuit, Database, ScanSearch, Waypoints } from "lucide-react"

const roadmap = [
  {
    phase: "2026",
    title: "Пилоты и запуск ключевых контуров",
    description:
      "ИИ-сценарии, статистическая платформа, первые рабочие версии проектов, защищённый доступ к регистрам и старт федеральных интеграций.",
  },
  {
    phase: "2026-2027",
    title: "Платформенное масштабирование",
    description:
      "Развитие ревматологической платформы, запуск единой ЭМК, перенос критичных данных во внутренний периметр и рост аналитики.",
  },
  {
    phase: "2027+",
    title: "Тиражирование и экосистемный эффект",
    description:
      "Переиспользуемые модули, новые нозологии, устойчивое управление данными и масштабирование на сеть и регионы.",
  },
]

const outcomes = [
  {
    title: "Снижение времени диагностики и числа диагностических ошибок.",
    icon: ScanSearch,
  },
  {
    title: "Повышение качества маршрутизации и наблюдения пациентов.",
    icon: Waypoints,
  },
  {
    title: "Создание единого доверенного источника клинических данных.",
    icon: Database,
  },
  {
    title: "Подготовка платформенной базы для новых ИИ-решений и исследований.",
    icon: BrainCircuit,
  },
]

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#07111f_0%,#0b1f36_55%,#123b56_100%)] py-24 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                Системный эффект
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Платформа формирует единый эффект для клиники, исследований и управленческого контура
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                Каждое направление усиливает не только собственный клинический сценарий, но и общий
                уровень зрелости данных, качество наблюдения пациентов и скорость внедрения новых цифровых решений.
              </p>

              <div className="mt-8 grid gap-3">
                {outcomes.map(({ title, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/84"
                  >
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/12 text-cyan-200">
                      <Icon className="size-4" />
                    </div>
                    <span>{title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {roadmap.map((item) => (
                <article
                  key={item.phase}
                  className="rounded-[1.75rem] border border-white/10 bg-white/7 p-6 backdrop-blur"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    {item.phase}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
      </div>
    </section>
  )
}
