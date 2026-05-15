'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, User, Image, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

export default function UpdateProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
        reset({
          name: data.user.name,
          image: data.user.image,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load profile');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/auth/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          image: data.image,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        toast.success('Profile updated successfully!');
        setTimeout(() => router.push('/my-profile'), 2000);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Update failed. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

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
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 transition font-medium"
      >
        <ArrowLeft size={20} />
        Back to Profile
      </button>

      {/* Update Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Update Your Information</h1>
          <p className="text-gray-600">Modify your profile details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Avatar */}
          {user.image && (
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Profile Photo URL</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                {...register('image', {
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|webp))$/i,
                    message: 'Please enter a valid image URL (jpg, jpeg, png, gif, webp)',
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            <p className="text-xs text-gray-500">
              Enter a direct URL to an image file (e.g., from Imgur, Postimg, or similar services)
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-800">
              <strong>Note:</strong> Email address cannot be changed. If you need to update your email, please contact support.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isUpdating ? (
              <>
                <Loader size={20} className="animate-spin" />
                Updating...
              </>
            ) : (
              'Update Information'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}