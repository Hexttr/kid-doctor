export interface NeonatalNutritionProduct {
  id: string
  name: string
  unit: string
  proteinPer100: number
  fatPer100: number
  carbsPer100: number
  caloriesPer100: number
}

export interface NeonatalNutritionNorm {
  id: string
  label: string
  proteinMin: number
  proteinMax: number
  fatMin: number
  fatMax: number
  carbsMin: number
  carbsMax: number
  caloriesMin: number
  caloriesMax: number
}

export const neonatalNutritionProducts: NeonatalNutritionProduct[] = [
  {
    id: "nutrilak-pre",
    name: "Нутрилак Premium Пре",
    unit: "мл",
    proteinPer100: 2.2,
    fatPer100: 4.2,
    carbsPer100: 8,
    caloriesPer100: 78,
  },
  {
    id: "nutrilak-1",
    name: "Нутрилак Premium 1",
    unit: "мл",
    proteinPer100: 1.3,
    fatPer100: 3.4,
    carbsPer100: 7.6,
    caloriesPer100: 66,
  },
  {
    id: "nutrilak-2",
    name: "Нутрилак Premium 2",
    unit: "мл",
    proteinPer100: 1.4,
    fatPer100: 3.4,
    carbsPer100: 8.1,
    caloriesPer100: 68,
  },
  {
    id: "buckwheat-porridge",
    name: "Гречневая каша Нутрилак б/м",
    unit: "г",
    proteinPer100: 9,
    fatPer100: 1,
    carbsPer100: 78.5,
    caloriesPer100: 364,
  },
  {
    id: "zucchini-puree",
    name: "Пюре кабачок",
    unit: "г",
    proteinPer100: 0.6,
    fatPer100: 0.1,
    carbsPer100: 4.9,
    caloriesPer100: 23,
  },
  {
    id: "pumpkin-puree",
    name: "Пюре тыква",
    unit: "г",
    proteinPer100: 1,
    fatPer100: 0.1,
    carbsPer100: 4.4,
    caloriesPer100: 22,
  },
  {
    id: "carrot-puree",
    name: "Пюре морковь",
    unit: "г",
    proteinPer100: 1.3,
    fatPer100: 0.1,
    carbsPer100: 6.9,
    caloriesPer100: 32,
  },
  {
    id: "broccoli-puree",
    name: "Пюре брокколи",
    unit: "г",
    proteinPer100: 2.8,
    fatPer100: 0.4,
    carbsPer100: 5.2,
    caloriesPer100: 28,
  },
  {
    id: "apple-puree",
    name: "Пюре яблоко (Агуша)",
    unit: "г",
    proteinPer100: 0.4,
    fatPer100: 0,
    carbsPer100: 11.3,
    caloriesPer100: 47,
  },
  {
    id: "pear-puree",
    name: "Пюре груша (Агуша)",
    unit: "г",
    proteinPer100: 0.4,
    fatPer100: 0,
    carbsPer100: 10.3,
    caloriesPer100: 42,
  },
  {
    id: "apple-pumpkin-puree",
    name: "Пюре яблоко-тыква",
    unit: "г",
    proteinPer100: 0.5,
    fatPer100: 0.1,
    carbsPer100: 9.8,
    caloriesPer100: 42,
  },
  {
    id: "turkey-puree",
    name: "Пюре из индейки",
    unit: "г",
    proteinPer100: 11,
    fatPer100: 3,
    carbsPer100: 5,
    caloriesPer100: 90,
  },
  {
    id: "cottage-cheese",
    name: "Творог детский 4.5%",
    unit: "г",
    proteinPer100: 8.5,
    fatPer100: 4.5,
    carbsPer100: 3.5,
    caloriesPer100: 88,
  },
  {
    id: "milk",
    name: "Чудное молоко",
    unit: "мл",
    proteinPer100: 2.8,
    fatPer100: 2.5,
    carbsPer100: 4.7,
    caloriesPer100: 52,
  },
  {
    id: "butter",
    name: "Масло сливочное 82.5%",
    unit: "г",
    proteinPer100: 0.5,
    fatPer100: 82.5,
    carbsPer100: 0.8,
    caloriesPer100: 748,
  },
  {
    id: "vegetable-oil",
    name: "Масло растительное",
    unit: "г",
    proteinPer100: 0,
    fatPer100: 99.9,
    carbsPer100: 0,
    caloriesPer100: 899,
  },
  {
    id: "egg-yolk",
    name: "Желток яйца вареного",
    unit: "г",
    proteinPer100: 16.2,
    fatPer100: 27.7,
    carbsPer100: 0.6,
    caloriesPer100: 322,
  },
]

export const neonatalNutritionNorms: NeonatalNutritionNorm[] = [
  {
    id: "0-3",
    label: "0-3 мес.",
    proteinMin: 2.2,
    proteinMax: 2.5,
    fatMin: 6,
    fatMax: 6.5,
    carbsMin: 12,
    carbsMax: 14,
    caloriesMin: 115,
    caloriesMax: 120,
  },
  {
    id: "4-6",
    label: "4-6 мес.",
    proteinMin: 2.5,
    proteinMax: 3,
    fatMin: 5.5,
    fatMax: 6,
    carbsMin: 12,
    carbsMax: 14,
    caloriesMin: 110,
    caloriesMax: 115,
  },
  {
    id: "7-12",
    label: "7-12 мес.",
    proteinMin: 2.9,
    proteinMax: 3.5,
    fatMin: 5,
    fatMax: 5.5,
    carbsMin: 13,
    carbsMax: 15,
    caloriesMin: 100,
    caloriesMax: 110,
  },
]
