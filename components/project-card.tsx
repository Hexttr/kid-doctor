"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/projects"
import {
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
  Calendar,
  Wallet,
  type LucideIcon,
} from "lucide-react"

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

const imageMap: Record<number, string> = {
  1: "/images/projects/project-01-rheumatology-ai.png",
  2: "/images/projects/project-02-rheumatology-platform.png",
  3: "/images/projects/project-03-sma-database.png",
  4: "/images/projects/project-04-preventive-pediatrics.png",
  5: "/images/projects/project-05-regional-statistics.png",
  6: "/images/projects/project-06-neonatal-nutrition.png",
  7: "/images/projects/project-07-health-factors.png",
  8: "/images/projects/project-08-vision-prevention.png",
  9: "/images/projects/project-09-flatfoot-system.png",
  10: "/images/projects/project-10-gastro-registry.png",
  11: "/images/projects/project-11-fever-partnership.png",
  12: "/images/projects/project-12-endoscopy-chatbot.png",
  13: "/images/projects/project-13-digital-ecosystems.png",
  14: "/images/projects/project-14-unified-emr.png",
  15: "/images/projects/project-15-egisz-integration.png",
}

interface ProjectCardProps {
  project: Project
  isActive?: boolean
}

export function ProjectCard({ project, isActive = false }: ProjectCardProps) {
  const Icon = iconMap[project.iconName] || Brain
  const imageSrc = imageMap[project.id]

  return (
    <Card
      className={`group relative overflow-hidden rounded-[2rem] border bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] ring-1 ring-white transition-all duration-500 ${
        isActive
          ? "border-sky-300 shadow-[0_30px_90px_rgba(14,116,144,0.18)]"
          : "border-slate-300 shadow-[0_22px_60px_rgba(15,23,42,0.09)] opacity-90"
      } hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_28px_80px_rgba(14,116,144,0.16)]`}
    >
      <CardContent className="p-0">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#1d4ed8_0%,#0ea5e9_48%,#14b8a6_100%)]" />
        <div className="grid lg:grid-cols-[1.02fr_1.18fr]">
          <div className="relative min-h-[260px] overflow-hidden border-b border-slate-200 lg:min-h-[100%] lg:border-b-0 lg:border-r">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.12)_0%,rgba(7,17,31,0.22)_100%)]" />
            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/18 bg-slate-950/55 text-cyan-200 shadow-[0_12px_30px_rgba(2,6,23,0.24)] backdrop-blur">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Badge className="rounded-full border border-white/14 bg-slate-950/55 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                  {project.status}
                </Badge>
                <Badge className="rounded-full border border-cyan-200/25 bg-cyan-300/12 px-3 py-1 text-[11px] font-medium text-cyan-50 backdrop-blur">
                  {project.category}
                </Badge>
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/12 bg-slate-950/58 p-4 text-white shadow-[0_18px_34px_rgba(2,6,23,0.22)] backdrop-blur-xl">
              <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{project.summary}</p>
            </div>
          </div>

          <div className="p-6 lg:p-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Ключевой фокус
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{project.focus}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-sky-200 bg-[linear-gradient(180deg,#f0f9ff_0%,#ecfeff_100%)] p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Ожидаемый эффект
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{project.effect}</p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Wallet className="h-3.5 w-3.5" />
                <span>{project.budget}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Calendar className="h-3.5 w-3.5" />
                <span>{project.timeline}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-sky-100/80 blur-2xl transition-opacity group-hover:opacity-100" />
      </CardContent>
    </Card>
  )
}
