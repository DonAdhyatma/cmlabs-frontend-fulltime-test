'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          mealapp
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-900 transition">Foods</Link>
          </li>
          <li>
            <Link href="/ingredients" className="hover:text-gray-900 transition">Ingredients</Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-900 transition">Local Culinary</Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm text-gray-600">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-900 transition">Home</Link>
          </li>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-900 transition">Foods</Link>
          </li>
          <li>
            <Link href="/ingredients" onClick={() => setIsOpen(false)} className="hover:text-gray-900 transition">Ingredients</Link>
          </li>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-900 transition">Local Culinary</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}