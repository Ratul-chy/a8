import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { name, image } = await request.json();

    // Mock update - In production, update database
    const updatedUser = {
      id: '1',
      name: name || 'User',
      email: 'user@example.com',
      image: image || null,
      createdAt: new Date(),
    };

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Update failed' }),
      { status: 500 }
    );
  }
}