import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return new Response(JSON.stringify({ user: null }), { status: 401 });
    }

    // Mock user data from session
    // In production, validate and decode the session token
    const user = {
      id: '1',
      name: 'Demo User',
      email: 'user@example.com',
      image: null,
      createdAt: new Date(),
    };

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Session error' }), { status: 500 });
  }
}