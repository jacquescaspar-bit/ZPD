This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

This will automatically clean build artifacts and start the server with optimal stability settings.

### Development Scripts

- `npm run dev` - **Recommended**: Auto-cleaning stable development server
- `npm run dev:direct` - Direct Next.js dev server (may be less stable)
- `npm run dev:stable` - Next.js with Turbo mode (experimental)
- `npm run dev:turbopack` - Next.js with Turbopack (fastest but may crash)
- `npm run clean` - Manually clean build artifacts

### Troubleshooting

If the dev server crashes frequently:
1. Try `npm run clean` to clear build artifacts
2. Restart with `npm run dev` (recommended)
3. If issues persist, use `npm run dev:direct` for a more stable experience

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
