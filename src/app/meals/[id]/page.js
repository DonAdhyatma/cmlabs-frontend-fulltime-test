'use client';

import { useState, useEffect, use } from 'react';
import { getMealDetail } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function MealDetailPage({ params }) {
  const { id } = use(params);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMealDetail(id)
      .then((data) => {
        setMeal(data);
      })
      .catch(() => {
        setError('Failed to load meal detail. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Extract ingredients & measures dari API
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
      }
    }
    return ingredients;
  };

  // Extract YouTube video ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Loading meal detail...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-400">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg">Meal not found.</p>
        <p className="text-md mt-2">
          This meal may not be available in the open API tier.
        </p>
        <Link
          href="/ingredients"
          className="mt-6 inline-block text-sm text-gray-500 hover:text-black hover:underline transition"
        >
          ← Back to Ingredients
        </Link>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-gray-600 transition">
          Home
        </Link>
        <span>›</span>
        <Link href="/ingredients" className="hover:text-gray-600 transition">
          Ingredients
        </Link>
        <span>›</span>
        <Link
          href={`/ingredients/${meal.strCategory}`}
          className="hover:text-gray-600 transition"
        >
          {meal.strCategory}
        </Link>
        <span>›</span>
        <span className="text-gray-600">{meal.strMeal}</span>
      </nav>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {meal.strMeal}
      </h1>

      {/* Category Tag */}
      {meal.strArea && (
        <span className="text-orange-500 font-semibold text-sm mb-6 inline-block">
          {meal.strArea} Culinary
        </span>
      )}

      {/* Image + Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Instructions
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-3">
            {meal.strInstructions
              .split('\n')
              .filter((line) => line.trim())
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>

      {/* Recipes */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recipes
        </h2>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Tutorials */}
      {youtubeId && (
        <div className="mt-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Tutorials
          </h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} Tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}