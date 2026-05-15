import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Mock authentication - In production, validate against database
    if (email && password) {
      const cookieStore = await cookies();
      
      // Set a mock session cookie
      cookieStore.set('session', 'mock-session-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: '1',
            email,
            name: email.split('@')[0],
            image: null,
          },
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      { status: 401 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Sign in failed' }),
      { status: 500 }
    );
  }
}