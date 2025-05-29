
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const response = NextResponse.json({ message: 'Token set' });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',



    });
       
    return response;
  } catch (error) {
    console.error('Failed to parse JSON or set cookie:', error);
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
