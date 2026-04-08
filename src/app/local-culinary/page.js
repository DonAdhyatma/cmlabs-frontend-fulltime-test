'use client';

import { useState, useEffect } from 'react';
import { getAreas } from '@/lib/api';
import SearchBar from '@/components/atoms/SearchBar';
import Link from 'next/link';

export default function LocalCulinaryPage() {
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAreas()
      .then((data) => {
        setAreas(data);
        setFiltered(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const result = areas.filter((area) =>
      area.strArea.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, areas]);

  const areaFlags = {
    American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦',
    Chinese: '🇨🇳', Croatian: '🇭🇷', Dutch: '🇳🇱',
    Egyptian: '🇪🇬', Filipino: '🇵🇭', French: '🇫🇷',
    Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
    Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵',
    Kenyan: '🇰🇪', Malaysian: '🇲🇾', Mexican: '🇲🇽',
    Moroccan: '🇲🇦', Polish: '🇵🇱', Portuguese: '🇵🇹',
    Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
    Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦',
    Vietnamese: '🇻🇳', Algerian: '🇩🇿', Argentinian: '🇦🇷',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Local Culinary
        </h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search culinary..."
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Loading culinary...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No culinary found.</p>
          <p className="text-sm mt-2">Try a different search keyword.</p>
        </div>
      )}

      {/* Areas Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((area) => (
            <Link
              key={area.strArea}
              href={`/local-culinary/${area.strArea}`}
            >
              <div className="group bg-white border border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer aspect-square">
                <span className="text-5xl">
                  {areaFlags[area.strArea] || '🍽️'}
                </span>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {area.strArea}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}