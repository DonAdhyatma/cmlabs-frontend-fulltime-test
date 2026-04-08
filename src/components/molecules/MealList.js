import MealCard from '@/components/atoms/MealCard';
import Link from 'next/link';

export default function MealList({ meals, originalCount = 0 }) {
  const mealArray = Array.isArray(meals) ? meals : [];
  const isApiEmpty = originalCount === 0;
  const isSearchEmpty = originalCount > 0 && mealArray.length === 0;

  if (mealArray.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No meals found.</p>
        {isApiEmpty && (
          <>
            <p className="text-sm mt-2">
              These meals may not be available in the open API tier.
            </p>
            <Link
              href="/ingredients"
              className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-700 underline transition"
            >
              ← Back to Ingredients
            </Link>
          </>
        )}
        {isSearchEmpty && (
          <p className="text-sm mt-2">
            Try a different search keyword.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {mealArray.map((meal, index) => (
        <MealCard
          key={meal.idMeal}
          id={meal.idMeal}
          name={meal.strMeal}
          thumbnail={meal.strMealThumb}
          priority={index === 0}
        />
      ))}
    </div>
  );
}