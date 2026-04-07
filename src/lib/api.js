const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function getIngredients() {
  const res = await fetch(`${BASE_URL}/list.php?i=list`)
  const data = await res.json()
  return data.meals
}

export async function getMealsByIngredient(ingredient) {
  const res = await fetch(`${BASE_URL}/filter.php?i${ingredient}`)
  const data = await res.json()
  return data.meals
}

export async function getMealsByIngredient(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i${id}`)
  const data = await res.json()
  return data.meals[0]
}