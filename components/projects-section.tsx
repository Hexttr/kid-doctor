"use client"

import * as React from "react"

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
    <section id="projects" className="bg-[linear-gradient(180deg,#eef5fb_0%,#f7fbff_24%,#ffffff_100%)] py-24">
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
                Мы показываем не список идей, а сбалансированный портфель клинических,
                инфраструктурных и аналитических направлений с измеримым эффектом.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portfolioHighlights.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              Горизонтальный просмотр инициатив
            </span>
            <span className="hidden h-1 w-20 overflow-hidden rounded-full bg-slate-200 md:block">
              <span
                className="block h-full rounded-full bg-[linear-gradient(90deg,#2563eb_0%,#06b6d4_100%)] transition-all duration-500"
                style={{ width: `${((current + 1) / projects.length) * 100}%` }}
              />
            </span>
          </div>

          <div className="text-sm font-medium text-slate-600">
            Проект {current + 1} из {projects.length}
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            containScroll: "trimSnaps",
          }}
          className="mt-8"
        >
          <CarouselContent className="-ml-5">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="pl-5 md:basis-[88%] xl:basis-[82%] 2xl:basis-[78%]"
              >
                <ProjectCard project={project} isActive={index === current} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full border-slate-200 bg-white/90 text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur md:flex" />
          <CarouselNext className="right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full border-slate-200 bg-white/90 text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur md:flex" />
        </Carousel>

        <div className="mt-5 text-sm text-slate-500">
          Перетаскивайте слайды или используйте стрелки для плавного просмотра всех направлений.
        </div>
      </div>
    </section>
  )
}
