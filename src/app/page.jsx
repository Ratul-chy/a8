'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Sparkles, Shield, Zap } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import cards from '@/data/cards.json';

export default function Home() {
  const [featuredCards, setFeaturedCards] = useState([]);

  useEffect(() => {
    // Get 3 random cards for featured section
    const shuffled = [...cards].sort(() => 0.5 - Math.random()).slice(0, 3);
    setFeaturedCards(shuffled);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-96 md:h-screen max-h-[600px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml+base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+')] opacity-20"></div>

        <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl animate-fade-in">
            💎 Welcome to <span className="text-white drop-shadow-lg">CardVault</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-100 animate-fade-in">
            Discover the world's finest trading cards. From vintage Pokémon to rare Magic cards, find your next treasure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in">
            <Link
              href="/products"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition inline-flex items-center gap-2 justify-center"
            >
              Explore Cards <ChevronRight size={20} />
            </Link>
            <Link
              href="/register"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-600 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Promo Text */}
          <div className="pt-8 text-sm md:text-base">
            <p className="bg-yellow-400 bg-opacity-20 text-yellow-100 px-4 py-2 rounded-lg inline-block font-semibold">
              🔥 Limited Time: Rare cards up to 40% OFF!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-purple-600" size={24} />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Featured Treasures</h2>
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked collections of the rarest and most sought-after trading cards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCards.map(card => (
            <div key={card.id} className="animate-fade-in">
              <ProductCard card={card} />
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition"
          >
            View All Cards <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12">Why Choose CardVault?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-md hover:shadow-lg transition">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-800">100% Authentic</h3>
            <p className="text-gray-600">Every card is verified and comes with a certificate of authenticity.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-md hover:shadow-lg transition">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Fast Shipping</h3>
            <p className="text-gray-600">Insured shipping available. Your treasures arrive safely and quickly.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-6 space-y-4 shadow-md hover:shadow-lg transition">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-12 h-12 rounded-lg flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-lg text-gray-800">Expert Collectors</h3>
            <p className="text-gray-600">Our team consists of experienced collectors with decades of expertise.</p>
          </div>
        </div>
      </section>

      {/* Care Tips Section */}
      <section className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text">Card Care Tips</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tip 1 */}
          <div className="bg-white rounded-lg p-6 space-y-3 shadow-md border-l-4 border-indigo-600">
            <h3 className="font-bold text-lg text-gray-800">🛡️ Protection</h3>
            <p className="text-gray-600">
              Always store your cards in protective sleeves and archival-quality binders. Avoid exposure to moisture and direct sunlight.
            </p>
          </div>

          {/* Tip 2 */}
          <div className="bg-white rounded-lg p-6 space-y-3 shadow-md border-l-4 border-purple-600">
            <h3 className="font-bold text-lg text-gray-800">🌡️ Storage</h3>
            <p className="text-gray-600">
              Keep cards in a cool, dry place with consistent temperature. Extreme heat or cold can damage valuable cards.
            </p>
          </div>

          {/* Tip 3 */}
          <div className="bg-white rounded-lg p-6 space-y-3 shadow-md border-l-4 border-pink-600">
            <h3 className="font-bold text-lg text-gray-800">🧤 Handling</h3>
            <p className="text-gray-600">
              Always use clean hands or cotton gloves when handling cards. Oils from your skin can damage the card surface.
            </p>
          </div>

          {/* Tip 4 */}
          <div className="bg-white rounded-lg p-6 space-y-3 shadow-md border-l-4 border-yellow-600">
            <h3 className="font-bold text-lg text-gray-800">📸 Documentation</h3>
            <p className="text-gray-600">
              Document your collection with photos. It's useful for insurance purposes and tracking your investment.
            </p>
          </div>
        </div>
      </section>

      {/* Top Brands Section */}
      <section className="space-y-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center gradient-text">Top Brands</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Pokémon TCG', emoji: '🐉' },
            { name: 'Magic: The Gathering', emoji: '✨' },
            { name: 'Yu-Gi-Oh!', emoji: '⚡' },
            { name: 'Sports Cards', emoji: '🏀' },
          ].map(brand => (
            <div key={brand.name} className="bg-white rounded-lg p-6 text-center space-y-3 shadow-md hover:shadow-lg transition card-hover">
              <div className="text-4xl">{brand.emoji}</div>
              <h3 className="font-bold text-gray-800">{brand.name}</h3>
              <p className="text-gray-600 text-sm">Premium & Collectible</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}