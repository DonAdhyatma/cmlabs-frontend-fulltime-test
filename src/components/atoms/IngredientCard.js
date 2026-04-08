import Image from 'next/image';
import Link from 'next/link';

export default function IngredientCard({ name, priority = false }) {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${name}.png`;

  return (
    <Link href={`/ingredients/${name}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square cursor-pointer hover:shadow-lg transition-all duration-300">

        {/* Ingredient Image */}
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

        {/* Name */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <span className="text-white text-md font-semibold text-center leading-tight">
            {name}
          </span>
        </div>

      </div>
    </Link>
  );
}