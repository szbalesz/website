import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return new NextResponse('Hiányzó URL', { status: 400 });
    }

    try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new NextResponse(blob, {
            headers: {
                'Content-Type': res.headers.get('content-type') || 'image/png',
                'Cache-Control': 'public, max-age=86400', // 1 napig cacheljük, hogy ne terheljük a szervert
            },
        });
    } catch (error) {
        return new NextResponse('Hiba a kép letöltésekor', { status: 500 });
    }
}