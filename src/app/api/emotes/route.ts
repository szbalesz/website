import { createClient } from 'redis';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  let client;
  try {
    client = createClient({ url: process.env.REDIS_URL });
    await client.connect();

    const count = await client.get('saved_emotes_count');
    await client.disconnect();
    
    return NextResponse.json({ count: Number(count) || 0 }, { status: 200 });
  } catch (error) {
    if (client?.isOpen) await client.disconnect();
    console.error('Redis error (GET /api/emotes):', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let client;
  try {
    const body = await request.json();
    let addCount = Number(body.count) || 0;

    if (addCount <= 0) {
      return NextResponse.json({ error: "Invalid count" }, { status: 400 });
    }

    // Hard limit per request to prevent console hacking (e.g. fetch with {count: 99999})
    if (addCount > 100) {
      addCount = 100;
    }

    client = createClient({ url: process.env.REDIS_URL });
    await client.connect();

    // Basic Rate Limiting: Max 20 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown_ip";
    const rlKey = `rate_limit_emotes_${ip}`;
    
    const requestsCount = await client.incr(rlKey);
    if (requestsCount === 1) {
      await client.expire(rlKey, 60); // 60 seconds window
    }

    if (requestsCount > 20) {
      // Too many requests from this IP. Return current count without adding.
      const currentCount = await client.get('saved_emotes_count');
      await client.disconnect();
      return NextResponse.json({ count: Number(currentCount) || 0 }, { status: 429 });
    }

    const count = await client.incrBy('saved_emotes_count', addCount);
    await client.disconnect();
    
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    if (client?.isOpen) await client.disconnect();
    console.error('Redis error (POST /api/emotes):', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
