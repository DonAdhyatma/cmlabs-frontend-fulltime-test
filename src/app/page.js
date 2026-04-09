import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/api';

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-12 mb-10 bg-gray-50 rounded-3xl">
        <div className="flex justify-center gap-2 text-3xl mb-3">
          <span>🍜</span>
          <span>🍔</span>
          <span>🍕</span>
        </div>
        <p className="text-md font-bold text-gray-800 mt-5 mb-5">mealapp API website</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-5">
          See All The Delicious Foods
        </h1>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Link
            key={category.idCategory}
            href={`/ingredients/${category.strCategory}`}
          >
            <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-lg transition-all duration-300">

              {/* Category Image */}
              <Image
                src={category.strCategoryThumb}
                alt={category.strCategory}
                fill
                priority={index < 4}
                loading={index < 4 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

              {/* Name */}
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <span className="text-white text-md font-semibold text-center leading-tight">
                  {category.strCategory}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}