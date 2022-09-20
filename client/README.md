This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Make sure database server is running. See 'README' in root project.

Open [http://localhost:3000](http://localhost:3000) with your
browser to see the result.

## Production environment variables

- PUBLIC_API_SERVER - public server url ( todo more info here )
- HUB_ROOT_DOMAIN - Root url for cluster ( todo more info here )
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"
- FXA_PAYMENT_URL - subscription payment url
- PRODUCT_ID - subscription payment ID
- PLAN_ID_EA - subscription payment Early Access ID

## Path Alias

To add or edit the import path aliases refer to [tsconfig.json](https://github.com/mozilla/turkey-portal/blob/main/client/tsconfig.json). Remember to update storybook in file [main.js](https://github.com/mozilla/turkey-portal/blob/main/client/.storybook/main.js) in parallel to match the file paths.

## Media Queries ( React Hooks )

Classic media queries are available for SCSS styling. However, sometimes you will need access to media queries within the JavaScript of your React Component. That's where React Hook Media Queries come in. See [useMediaQuery.tsx](https://github.com/mozilla/turkey-portal/blob/main/client/hooks/useMediaQuery.tsx).
