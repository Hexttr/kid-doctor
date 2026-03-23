"use client"

import Link from "next/link"
import {
  Activity,
  ArrowRight,
  Baby,
  BarChart3,
  Brain,
  Dna,
  Eye,
  FileText,
  Footprints,
  Heart,
  Layers,
  MessageSquare,
  Network,
  Send,
  Stethoscope,
  Thermometer,
  Utensils,
  type LucideIcon,
} from "lucide-react"

import { projects } from "@/lib/projects"

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Network,
  Dna,
  Baby,
  BarChart3,
  Utensils,
  Heart,
  Eye,
  Footprints,
  Stethoscope,
  Thermometer,
  MessageSquare,
  Layers,
  FileText,
  Send,
}

export function ProjectsOverviewGrid() {
  return (
    <section
      id="projects-grid"
      className="relative bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)] py-20"
    >
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(14,165,233,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Обзор направлений
            </div>
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Все 15 инициатив в одном минималистичном обзоре
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Быстрый вход в портфель: каждая плитка показывает ключевое направление и ведёт к
                подробной презентации проекта ниже.
              </p>
            </div>
          </div>

          <Link
            href="#projects"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:bg-sky-700"
          >
            Перейти к витрине проектов
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {projects.map((project) => {
            const Icon = iconMap[project.iconName] || Activity

            return (
              <article
                key={project.id}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_54px_rgba(14,116,144,0.12)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(37,99,235,0.1),rgba(20,184,166,0.14))] text-sky-700 transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-4 text-base font-semibold leading-6 text-slate-950">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {project.summary}
                </p>

                <Link
                  href="#projects"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-slate-950"
                >
                  Перейти
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
