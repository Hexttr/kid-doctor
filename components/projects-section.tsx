"use client"

import * as React from "react"
import { ArrowRight, Sparkles } from "lucide-react"

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { projects } from "@/lib/projects"
import { ProjectCard } from "./project-card"

const portfolioHighlights = [
  "ИИ и поддержка принятия решений",
  "Регистры и референтные базы данных",
  "Единая ЭМК и федеральные интеграции",
  "Управленческая аналитика и профосмотры",
]

export function ProjectsSection() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap())
    }

    updateCurrent()
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)

    return () => {
      api.off("select", updateCurrent)
      api.off("reInit", updateCurrent)
    }
  }, [api])

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#eef5fb_0%,#f7fbff_18%,#ffffff_100%)] py-24"
    >
      <div className="absolute inset-x-0 top-16 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_58%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Портфель инициатив
            </div>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                15 проектов, объединённых общей платформенной логикой
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                Портфель охватывает клинические сервисы, регистры, инфраструктуру данных и федеральные
                интеграции, формируя единую цифровую среду для всей экосистемы центра.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portfolioHighlights.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f2fbff_100%)] px-5 py-4 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(14,116,144,0.08)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-sky-100 bg-[linear-gradient(145deg,#07111f_0%,#0b1f36_52%,#103b57_100%)] p-6 text-white shadow-[0_30px_110px_rgba(2,6,23,0.2)] md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_34%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur">
                <Sparkles className="size-4" />
                Витрина приоритетных проектов
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span>Крупный формат слайдов для детального просмотра инициатив</span>
                <ArrowRight className="hidden size-4 lg:block" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden h-1.5 w-40 overflow-hidden rounded-full bg-white/12 md:block">
                <span
                  className="block h-full rounded-full bg-[linear-gradient(90deg,#38bdf8_0%,#22d3ee_100%)] transition-all duration-500"
                  style={{ width: `${((current + 1) / projects.length) * 100}%` }}
                />
              </div>
              <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/84 backdrop-blur">
                Проект {current + 1} из {projects.length}
              </div>
            </div>
          </div>
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              containScroll: "trimSnaps",
            }}
            className="relative mt-8"
          >
            <CarouselContent className="ml-0">
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="basis-full pl-0">
                  <ProjectCard project={project} isActive={index === current} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-white/14 bg-white/10 text-white shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur md:flex" />
            <CarouselNext className="right-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-white/14 bg-white/10 text-white shadow-[0_18px_40px_rgba(2,6,23,0.24)] backdrop-blur md:flex" />
          </Carousel>

          <div className="relative mt-6 text-sm text-white/68">
            Используйте стрелки или жест перетаскивания, чтобы последовательно просматривать все инициативы.
          </div>
        </div>
      </div>
    </section>
  )
}
