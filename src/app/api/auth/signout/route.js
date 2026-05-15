import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    
    // Delete session cookie
    cookieStore.delete('session');

    return new Response(
      JSON.stringify({ success: true, message: 'Signed out successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Sign out failed' }),
      { status: 500 }
    );
  }
}