'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Edit, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export default function MyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (!response.ok) {
          router.push('/login');
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load profile');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-purple-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 transition font-medium"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

          {/* Profile Content */}
          <div className="px-6 pb-8">
            {/* Profile Picture & Name */}
            <div className="flex flex-col md:flex-row items-center gap-6 -mt-16 relative z-10">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-white shadow-lg overflow-hidden border-4 border-indigo-600 flex items-center justify-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-indigo-600" />
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{user.name || 'User'}</h1>
                <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={16} />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="mt-12 space-y-6">
              {/* Account Information */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Full Name</label>
                    <p className="text-gray-900 font-medium bg-white px-4 py-2 rounded-lg">
                      {user.name || 'Not set'}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Email Address</label>
                    <p className="text-gray-900 font-medium bg-white px-4 py-2 rounded-lg">
                      {user.email}
                    </p>
                  </div>

                  {/* Member Since */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Member Since</label>
                    <p className="text-gray-900 font-medium bg-white px-4 py-2 rounded-lg">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                  </div>

                  {/* Account Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Account Status</label>
                    <p className="text-green-600 font-medium bg-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Active
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">Account Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/my-profile/update"
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition"
                  >
                    <Edit size={20} />
                    Update Information
                  </Link>
                  <button
                    onClick={() => toast.info('Coming soon: Change password feature')}
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition opacity-50 cursor-not-allowed"
                  >
                    🔒 Change Password
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">0</p>
                  <p className="text-gray-600 text-sm">Orders Placed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">0</p>
                  <p className="text-gray-600 text-sm">Cards Purchased</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">0</p>
                  <p className="text-gray-600 text-sm">Wishlisted Items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}