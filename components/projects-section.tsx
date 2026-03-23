"use client"

import * as React from "react"
import { Brain, Database, FileText, Waypoints } from "lucide-react"

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
  { title: "ИИ и поддержка принятия решений", icon: Brain },
  { title: "Регистры и референтные базы данных", icon: Database },
  { title: "Единая ЭМК и федеральные интеграции", icon: FileText },
  { title: "Управленческая аналитика и профосмотры", icon: Waypoints },
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_30%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-950/10 bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm">
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
            {portfolioHighlights.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-3xl border border-slate-950/10 bg-slate-950 px-5 py-4 text-sm font-medium text-white shadow-[0_16px_40px_rgba(15,23,42,0.14)]"
              >
                <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                  <Icon className="size-4" />
                </div>
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-12">
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

            <CarouselPrevious className="left-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-slate-200 bg-white/92 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur md:flex" />
            <CarouselNext className="right-5 top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full border-slate-200 bg-white/92 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.16)] backdrop-blur md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
