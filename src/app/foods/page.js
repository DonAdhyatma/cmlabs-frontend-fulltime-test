'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/atoms/SearchBar';

export default function FoodsPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        setFiltered(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const result = categories.filter((cat) =>
      cat.strCategory.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, categories]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          All Foods
        </h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search foods..."
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Loading foods...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No foods found.</p>
          <p className="text-sm mt-2">Try a different search keyword.</p>
        </div>
      )}

      {/* Categories Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((category, index) => (
            <Link
              key={category.idCategory}
              href={`/ingredients/${category.strCategory}`}
            >
              <div className="group bg-white border border-gray-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">

                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    fill
                    priority={index < 3}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {category.strCategory}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-3">
                    {category.strCategoryDescription}
                  </p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}