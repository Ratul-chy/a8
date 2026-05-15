'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import cards from '@/data/cards.json';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (!response.ok) {
          toast.warning('Please login to view product details');
          router.push('/login');
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const foundCard = cards.find(c => c.id === parseInt(params.id));
    if (foundCard) {
      setCard(foundCard);
    } else {
      toast.error('Card not found');
      router.push('/products');
    }
    setIsLoading(false);
  }, [params.id, router]);

  const handleAddToCart = () => {
    toast.success(`${card.name} added to cart!`);
  };

  const handleWishlist = () => {
    toast.success('Added to wishlist!');
  };

  if (isLoading || !card) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-purple-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 transition font-medium"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      {/* Product Detail */}
      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg shadow-lg p-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              className="max-w-full max-h-full object-contain hover:scale-110 transition duration-300"
            />
          </div>
          <p className="text-sm text-gray-500 text-center">Product Image</p>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4 border-b border-gray-200 pb-6">
            <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {card.category}
            </div>

            <h1 className="text-4xl font-bold text-gray-900">{card.name}</h1>

            <p className="text-lg text-gray-600">
              <span className="font-semibold">{card.brand}</span> • {card.year}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < Math.floor(card.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-700">
                {card.rating} / 5 Rating
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="text-gray-600">Rarity</p>
              <p className="font-bold text-gray-900">{card.rarity}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-gray-600">Year</p>
              <p className="font-bold text-gray-900">{card.year}</p>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg">
              <p className="text-gray-600">Condition</p>
              <p className="font-bold text-gray-900">{card.condition}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-gray-600">Stock</p>
              <p className={`font-bold ${card.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {card.stock > 0 ? `${card.stock} Available` : 'Out of Stock'}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{card.description}</p>
          </div>

          {/* Price & Actions */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="text-4xl font-bold gradient-text">${card.price}</div>

            {card.stock > 0 ? (
              <>
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                      min="1"
                      max={card.stock}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(card.stock, quantity + 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <Heart size={20} />
                    Wishlist
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg font-medium text-center">
                Out of Stock
              </div>
            )}
          </div>

          {/* Trust Badges */}
          <div className="space-y-2 pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">Trust & Safety</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p>✅ 100% Authentic Cards</p>
              <p>✅ Certificate of Authenticity</p>
              <p>✅ Insured Shipping</p>
              <p>✅ Money-back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}