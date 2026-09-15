import { createClient } from 'redis';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  let client;
  try {
    const cookieStore = await cookies();
    const alreadyVisited = cookieStore.get('visited');

    client = createClient({ url: process.env.REDIS_URL });
    await client.connect();

    if (!alreadyVisited) {
      // Új látogató: számláló növelése
      const views = await client.incr('page_views');
      await client.disconnect();

      const response = NextResponse.json({ views }, { status: 200 });
      // Cookie beállítása 24 órára
      response.cookies.set('visited', '1', {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
      });
      return response;
    } else {
      // Visszatérő látogató: csak lekérdezés, nem növelünk
      const views = await client.get('page_views');
      await client.disconnect();
      return NextResponse.json({ views: Number(views) || 0 }, { status: 200 });
    }
  } catch (error) {
    if (client?.isOpen) await client.disconnect();
    console.error('Redis error:', error);
    return NextResponse.json({ views: null }, { status: 500 });
  }
}
