"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowLeft,
  Baby,
  Calculator,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  neonatalNutritionNorms,
  neonatalNutritionProducts,
  type NeonatalNutritionNorm,
} from "@/lib/neonatal-nutrition-data"

type NutritionMetric = "protein" | "fat" | "carbs" | "calories"

interface ProductState {
  selected: boolean
  amount: string
}

const initialProductState = Object.fromEntries(
  neonatalNutritionProducts.map((product) => [
    product.id,
    {
      selected: product.id === "nutrilak-pre",
      amount: product.id === "nutrilak-pre" ? "100" : "",
    },
  ]),
) as Record<string, ProductState>

const metricMeta: Record<
  NutritionMetric,
  {
    label: string
    unit: string
    shortLabel: string
  }
> = {
  protein: { label: "Белки", unit: "г", shortLabel: "Б" },
  fat: { label: "Жиры", unit: "г", shortLabel: "Ж" },
  carbs: { label: "Углеводы", unit: "г", shortLabel: "У" },
  calories: { label: "Калорийность", unit: "ккал", shortLabel: "Ккал" },
}

function roundMetric(value: number) {
  return Number(value.toFixed(2))
}

function formatMetric(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

function getRangeForMetric(norm: NeonatalNutritionNorm, metric: NutritionMetric) {
  if (metric === "protein") return [norm.proteinMin, norm.proteinMax]
  if (metric === "fat") return [norm.fatMin, norm.fatMax]
  if (metric === "carbs") return [norm.carbsMin, norm.carbsMax]
  return [norm.caloriesMin, norm.caloriesMax]
}

function getMetricStatus(value: number, min: number, max: number) {
  if (value < min) {
    return {
      label: "Ниже ориентира",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    }
  }

  if (value > max) {
    return {
      label: "Выше ориентира",
      className: "border-rose-200 bg-rose-50 text-rose-700",
    }
  }

  return {
    label: "В целевом диапазоне",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }
}

export function NeonatalNutritionCalculator() {
  const [weight, setWeight] = useState("2")
  const [ageGroupId, setAgeGroupId] = useState("0-3")
  const [productState, setProductState] = useState(initialProductState)

  const selectedNorm =
    neonatalNutritionNorms.find((norm) => norm.id === ageGroupId) ?? neonatalNutritionNorms[0]

  const selectedProducts = useMemo(() => {
    return neonatalNutritionProducts
      .filter((product) => productState[product.id]?.selected)
      .map((product) => {
        const amount = Number(productState[product.id]?.amount || 0)

        return {
          ...product,
          amount,
          protein: roundMetric((product.proteinPer100 * amount) / 100),
          fat: roundMetric((product.fatPer100 * amount) / 100),
          carbs: roundMetric((product.carbsPer100 * amount) / 100),
          calories: roundMetric((product.caloriesPer100 * amount) / 100),
        }
      })
      .filter((product) => product.amount > 0)
  }, [productState])

  const totals = useMemo(() => {
    return selectedProducts.reduce(
      (acc, product) => ({
        protein: roundMetric(acc.protein + product.protein),
        fat: roundMetric(acc.fat + product.fat),
        carbs: roundMetric(acc.carbs + product.carbs),
        calories: roundMetric(acc.calories + product.calories),
      }),
      { protein: 0, fat: 0, carbs: 0, calories: 0 },
    )
  }, [selectedProducts])

  const weightValue = Number(weight)
  const perKg = useMemo(() => {
    if (!weightValue || weightValue <= 0) {
      return null
    }

    return {
      protein: roundMetric(totals.protein / weightValue),
      fat: roundMetric(totals.fat / weightValue),
      carbs: roundMetric(totals.carbs / weightValue),
      calories: roundMetric(totals.calories / weightValue),
    }
  }, [totals, weightValue])

  const handleToggleProduct = (productId: string, selected: boolean) => {
    setProductState((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        selected,
      },
    }))
  }

  const handleAmountChange = (productId: string, amount: string) => {
    setProductState((current) => ({
      ...current,
      [productId]: {
        ...current[productId],
        amount,
      },
    }))
  }

  return (
    <main
      id="top"
      className="min-h-screen bg-[linear-gradient(180deg,#031120_0%,#0a1f37_32%,#eef6ff_32%,#f8fbff_100%)]"
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_24%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 md:px-10 md:pb-24">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-cyan-50 backdrop-blur transition hover:bg-white/12"
            >
              <ArrowLeft className="size-4" />
              Назад к платформе
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur">
              <CheckCircle2 className="size-4" />
              Внутренний проект НМИЦ
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/8 px-4 py-2 text-sm font-medium text-cyan-50 backdrop-blur">
                <Sparkles className="size-4 text-cyan-300" />
                Проект «Питание недоношенных»
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  Отдельный минилендинг по неонатальному питанию с калькулятором БЖУ и
                  калорийности.
                </h1>
                <p className="max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                  Страница переведена из Excel-логики в защищённый цифровой сервис: врач выбирает
                  рацион, вводит массу ребёнка и сразу получает суточные БЖУ, калорийность и расчёт
                  на 1 кг веса с ориентацией на возрастные нормы.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-4 text-white shadow-[0_18px_34px_rgba(2,6,23,0.18)] backdrop-blur-xl">
                  <Scale className="size-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold">Расчёт на 1 кг веса</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Перевод суточного рациона в клинически значимые показатели.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-4 text-white shadow-[0_18px_34px_rgba(2,6,23,0.18)] backdrop-blur-xl">
                  <Calculator className="size-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold">Продукты и объёмы</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Точный пересчёт Б/Ж/У и ккал по каждому компоненту питания.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-4 text-white shadow-[0_18px_34px_rgba(2,6,23,0.18)] backdrop-blur-xl">
                  <ShieldCheck className="size-5 text-cyan-300" />
                  <p className="mt-3 text-sm font-semibold">Внутренний контур</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Инструмент доступен в защищённой среде платформы для врачей и аналитиков.
                  </p>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[2rem] border-white/12 bg-white/8 py-0 text-white shadow-[0_28px_80px_rgba(2,6,23,0.28)] backdrop-blur-2xl">
              <CardContent className="p-0">
                <div className="bg-[linear-gradient(135deg,rgba(37,99,235,0.28),rgba(14,165,233,0.14),rgba(20,184,166,0.08))] p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-white/12 text-cyan-100">
                      <Baby className="size-6" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-cyan-200">
                        Клинический модуль
                      </p>
                      <h2 className="mt-1 text-2xl font-semibold text-white">
                        Калькулятор БЖУ
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-white/12 bg-slate-950/30 p-4">
                      <p className="text-sm text-slate-300">Источник логики</p>
                      <p className="mt-2 text-base font-semibold">Excel-калькулятор `calc.xlsx`</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-white/12 bg-slate-950/30 p-4">
                      <p className="text-sm text-slate-300">Результат</p>
                      <p className="mt-2 text-base font-semibold">
                        Суточные показатели и контроль по возрастной норме
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative -mt-12 pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[2rem] border-slate-200/80 bg-white py-0 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
              <CardContent className="p-6 md:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-700">
                      Центральная функция
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                      Калькулятор питания
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                      Выберите продукты, введите количество в граммах или миллилитрах и сравните
                      итоговые значения с ориентировочными нормами ВОЗ и ESPGHAN.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:min-w-[17rem] sm:max-w-[17rem]">
                    <div>
                      <label
                        htmlFor="child-weight"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Вес ребёнка, кг
                      </label>
                      <Input
                        id="child-weight"
                        type="number"
                        min="0"
                        step="0.1"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        className="h-11 rounded-2xl border-slate-300 bg-slate-50 text-slate-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="age-group"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Возрастная группа
                      </label>
                      <select
                        id="age-group"
                        value={ageGroupId}
                        onChange={(event) => setAgeGroupId(event.target.value)}
                        className="h-11 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 text-sm text-slate-900 shadow-xs outline-none transition focus:border-cyan-400 focus:ring-[3px] focus:ring-cyan-100"
                      >
                        {neonatalNutritionNorms.map((norm) => (
                          <option key={norm.id} value={norm.id}>
                            {norm.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {neonatalNutritionProducts.map((product) => {
                    const state = productState[product.id]

                    return (
                      <div
                        key={product.id}
                        className="grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-[auto_1fr_11rem]"
                      >
                        <label className="flex items-center gap-3 pt-1 text-sm font-medium text-slate-800">
                          <input
                            type="checkbox"
                            checked={state.selected}
                            onChange={(event) =>
                              handleToggleProduct(product.id, event.target.checked)
                            }
                            className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                          />
                          Включить
                        </label>

                        <div>
                          <p className="text-sm font-semibold text-slate-950">{product.name}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            На 100 {product.unit}: {product.proteinPer100} г белков,{" "}
                            {product.fatPer100} г жиров, {product.carbsPer100} г углеводов,{" "}
                            {product.caloriesPer100} ккал
                          </p>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                            Количество ({product.unit})
                          </label>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            value={state.amount}
                            onChange={(event) => handleAmountChange(product.id, event.target.value)}
                            disabled={!state.selected}
                            className="h-11 rounded-2xl border-slate-300 bg-white text-slate-900 disabled:bg-slate-100"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card className="rounded-[2rem] border-slate-200/80 bg-white py-0 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-cyan-200">
                      <Calculator className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
                        Итог за день
                      </p>
                      <h3 className="text-xl font-semibold text-slate-950">Суммарные показатели</h3>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {(Object.keys(metricMeta) as NutritionMetric[]).map((metric) => (
                      <div
                        key={metric}
                        className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                          {metricMeta[metric].label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-slate-950">
                          {formatMetric(totals[metric])}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{metricMeta[metric].unit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.6rem] border border-cyan-100 bg-[linear-gradient(180deg,#f4fbff_0%,#ecfeff_100%)] p-4">
                    <p className="text-sm font-semibold text-slate-900">На 1 кг веса ребёнка</p>
                    {perKg ? (
                      <div className="mt-4 grid gap-3">
                        {(Object.keys(metricMeta) as NutritionMetric[]).map((metric) => (
                          <div
                            key={metric}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-white bg-white/90 px-4 py-3"
                          >
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {metricMeta[metric].label}
                              </p>
                              <p className="text-xs text-slate-500">
                                {selectedNorm.label} · ориентир{" "}
                                {getRangeForMetric(selectedNorm, metric)[0]}-
                                {getRangeForMetric(selectedNorm, metric)[1]} {metricMeta[metric].unit}
                                /кг
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-slate-950">
                              {formatMetric(perKg[metric])} {metricMeta[metric].unit}/кг
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Введите массу ребёнка, чтобы получить пересчёт на 1 кг веса.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200/80 bg-white py-0 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <FlaskConical className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">
                        Сопоставление
                      </p>
                      <h3 className="text-xl font-semibold text-slate-950">
                        Контроль по возрастной норме
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {(Object.keys(metricMeta) as NutritionMetric[]).map((metric) => {
                      const [min, max] = getRangeForMetric(selectedNorm, metric)
                      const currentValue = perKg?.[metric]
                      const status =
                        currentValue !== undefined && currentValue !== null
                          ? getMetricStatus(currentValue, min, max)
                          : null

                      return (
                        <div
                          key={metric}
                          className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {metricMeta[metric].label}
                              </p>
                              <p className="mt-1 text-sm text-slate-500">
                                Норма: {min}-{max} {metricMeta[metric].unit}/кг
                              </p>
                            </div>
                            {status ? (
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}
                              >
                                {status.label}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-slate-200/80 bg-white py-0 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-950">Выбранные продукты</h3>

                  {selectedProducts.length > 0 ? (
                    <div className="mt-5 space-y-3">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                              <p className="mt-1 text-xs text-slate-500">
                                {product.amount} {product.unit}
                              </p>
                            </div>
                            <div className="text-right text-xs text-slate-600">
                              <p>
                                {metricMeta.protein.shortLabel}: {formatMetric(product.protein)} г
                              </p>
                              <p>
                                {metricMeta.fat.shortLabel}: {formatMetric(product.fat)} г
                              </p>
                              <p>
                                {metricMeta.carbs.shortLabel}: {formatMetric(product.carbs)} г
                              </p>
                              <p>
                                {metricMeta.calories.shortLabel}: {formatMetric(product.calories)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      Отметьте хотя бы один продукт и укажите объём, чтобы сформировать рацион.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Card className="rounded-[2rem] border-slate-200/80 bg-white py-0 shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[0.72fr_1.28fr] md:p-7">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-sky-700">
                  Методика
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Что перенесено из `calc.xlsx`
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
                  В основе страницы лежит точная логика исходного Excel-файла: расчёт БЖУ и
                  калорийности по каждому продукту на 100 г/мл, суммирование за сутки и пересчёт
                  на 1 кг веса ребёнка.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Входные данные</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Масса ребёнка, список продуктов и объём каждого компонента питания.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Расчётные поля</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Белки, жиры, углеводы и калории по каждому продукту, а затем суммарно за день.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Контроль нормы</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Сопоставление результата на 1 кг веса с возрастными диапазонами 0-3, 4-6 и
                    7-12 месяцев.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">Следующий шаг</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Страницу можно расширить экспортом рациона, шаблонами назначения и печатной
                    формой для клинического использования.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-20 hidden xl:block">
        <Button
          asChild
          className="h-12 rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#06b6d4_100%)] px-5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(37,99,235,0.3)]"
        >
          <a href="#top">
            К калькулятору
            <ChevronRight className="size-4" />
          </a>
        </Button>
      </div>
    </main>
  )
}
