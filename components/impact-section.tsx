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
  "Снижение времени диагностики и числа диагностических ошибок.",
  "Повышение качества маршрутизации и наблюдения пациентов.",
  "Создание единого доверенного источника клинических данных.",
  "Подготовка платформенной базы для новых ИИ-решений и исследований.",
]

export function ImpactSection() {
  return (
    <section id="impact" className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#07111f_0%,#0b1f36_55%,#123b56_100%)] p-8 text-white shadow-[0_24px_90px_rgba(2,6,23,0.28)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">
                Системный эффект
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Редизайн подчёркивает не только проекты, но и итоговый эффект для всей системы
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                В материалах по проектам постоянно повторяются одни и те же мотивы: стандартизация,
                интеграция, безопасность, управляемость и масштабируемость. Именно их и нужно
                визуально сделать главным сообщением платформы.
              </p>

              <div className="mt-8 grid gap-3">
                {outcomes.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/84"
                  >
                    {item}
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
      </div>
    </section>
  )
}
