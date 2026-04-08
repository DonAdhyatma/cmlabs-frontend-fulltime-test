const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getIngredients() {
  const res = await fetch(`${BASE_URL}/list.php?i=list`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

export async function getMealsByIngredient(ingredient) {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

export async function getMealDetail(id) {
  const res = await fetch(
    `${BASE_URL}/lookup.php?i=${id}`,
    { cache: 'no-store' }
  );
  const data = await res.json();  
  // Handle invalid ID atau data tidak ditemukan
  if (!data.meals || !Array.isArray(data.meals) || data.meals.length === 0) {
    return null;
  }
  return data.meals[0];
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return Array.isArray(data.categories) ? data.categories : [];
}

export async function getAreas() {
  const res = await fetch(`${BASE_URL}/list.php?a=list`, {
    cache: 'no-store',
  });
  const data = await res.json();
  return Array.isArray(data.meals) ? data.meals : [];
}

export async function getMealsByArea(area) {
  const res = await fetch(
    `${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return Array.isArray(data.meals) ? data.meals : [];
}