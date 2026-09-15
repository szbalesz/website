# SZBALESZ

Személyes profil oldal – közösségi média linkek és elérhetőségek egy helyen.

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Upstash Redis** (látogatószámláló)
- **Vercel** (hosting)

## Fejlesztés

```bash
npm install
npm run dev
```

A `.env.local` fájlba kell a Redis URL:

```
REDIS_URL="redis://..."
```

## Deploy

Push to GitHub → Vercel automatikusan buildeli.
