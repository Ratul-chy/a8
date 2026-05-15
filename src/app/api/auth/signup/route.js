import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { name, email, password, image } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Mock registration - In production, save to database
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
          name,
          email,
          image: image || null,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Sign up failed' }),
      { status: 500 }
    );
  }
}