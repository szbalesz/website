import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const discordId = searchParams.get('id');

    if (!discordId) {
        return NextResponse.json({ success: false, error: 'Nem lett megadva Discord ID' }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`, {
            cache: 'no-store'
        });

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Hiba a Lanyard lekérésekor' }, { status: 500 });
    }
}