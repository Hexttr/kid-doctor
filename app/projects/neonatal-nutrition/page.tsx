import type { Metadata } from "next"

import { NeonatalNutritionCalculator } from "@/components/neonatal-nutrition-calculator"

export const metadata: Metadata = {
  title: "Питание недоношенных | Детский врач",
  description:
    "Внутренний модуль проекта «Питание недоношенных» с калькулятором БЖУ и калорийности на основе клинического Excel-шаблона.",
}

export default function NeonatalNutritionProjectPage() {
  return <NeonatalNutritionCalculator />
}
