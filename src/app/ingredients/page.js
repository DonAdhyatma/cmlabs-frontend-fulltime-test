'use client';

import { useState, useEffect } from 'react';
import { getIngredients } from '@/lib/api';
import IngredientList from '@/components/molecules/IngredientList';
import SearchBar from '@/components/atoms/SearchBar';

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getIngredients().then((data) => {
      setIngredients(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    const result = ingredients.filter((item) =>
      item.strIngredient.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, ingredients]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-black">
          All Ingredients
        </h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search ingredients..."
        />
      </div>

      {/* List */}
      <IngredientList ingredients={filtered} />
    </div>
  );
}