import Image from 'next/image';
import Link from 'next/link';

export default function MealCard({ id, name, thumbnail, priority = false }) {
  return (
    <Link href={`/meals/${id}`}>
      <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer hover:shadow-lg transition-all duration-300">

        {/* Meal Image */}
        <Image
          src={thumbnail}
          alt={name}
          fill
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
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