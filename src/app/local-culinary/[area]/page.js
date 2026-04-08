'use client';

import { useState, useEffect, use } from 'react';
import { getMealsByArea } from '@/lib/api';
import MealList from '@/components/molecules/MealList';
import SearchBar from '@/components/atoms/SearchBar';
import Link from 'next/link';

export default function LocalCulinaryDetailPage({ params }) {
  const { area } = use(params);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMealsByArea(area)
      .then((data) => {
        setMeals(data || []);
        setFiltered(data || []);
      })
      .catch(() => {
        setError('Failed to load meals. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [area]);

  useEffect(() => {
    const mealArray = Array.isArray(meals) ? meals : [];
    const result = mealArray.filter((meal) =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, meals]);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-gray-600 transition">
          Home
        </Link>
        <span>›</span>
        <Link href="/local-culinary" className="hover:text-gray-600 transition">
          Local Culinary
        </Link>
        <span>›</span>
        <span className="text-gray-600">{area}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          {area} Cuisine
        </h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search meals..."
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Loading meals...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16 text-red-400">
          <p className="text-lg">{error}</p>
        </div>
      )}

      {/* Meal List */}
      {!loading && !error && (
        <MealList
          meals={filtered}
          originalCount={meals.length}
        />
      )}
    </div>
  );
}