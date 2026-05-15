'use client';

import { Star, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ card }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover group">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          {card.rarity}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <div className="inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-semibold">
          {card.category}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition">
          {card.name}
        </h3>

        {/* Brand & Year */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{card.brand}</span> • {card.year}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(card.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({card.rating})</span>
        </div>

        {/* Stock Info */}
        <p className="text-sm font-semibold text-gray-700">
          {card.stock > 0 ? (
            <span className="text-green-600">✓ In Stock ({card.stock})</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {/* Condition */}
        <p className="text-xs text-gray-500">Condition: {card.condition}</p>

        {/* Price */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-2xl font-bold gradient-text">${card.price}</span>
          <Link
            href={`/products/${card.id}`}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
          >
            <Eye size={16} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}