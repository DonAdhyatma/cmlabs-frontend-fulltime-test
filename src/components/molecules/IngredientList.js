import IngredientCard from '@/components/atoms/IngredientCard';

export default function IngredientList({ ingredients }) {
  const ingredientArray = Array.isArray(ingredients) ? ingredients : [];

  if (ingredientArray.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">No ingredients found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {ingredientArray.map((item, index) => (
        <IngredientCard
          key={item.strIngredient}
          name={item.strIngredient}
          priority={index === 0}
        />
      ))}
    </div>
  );
}