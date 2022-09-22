This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, get an access token to fetch our maintained Lilypad component library on npm, you need to create an access token on github and enable Mozilla organization on the access token.

First, install dependencies in the `/client` directory (this directory), then run the development server. (For now, we use `--legacy-peer-deps` because Storybook requires an older version of react to run).

```bash
npm i --legacy-peer-deps
npm run dev
```

Then, make sure the Phoenix API server is running on. See [/README.md](/README.md) 'README' in root project.

Open [http://localhost:3000](http://localhost:3000) with your
browser to see the result.

## Production environment variables

- PUBLIC_API_SERVER - public server url ( todo more info here )
- HUB_ROOT_DOMAIN - Root url for cluster ( todo more info here )
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"

To authenticate using local cookies, see [README.md:"Create a local user"](/README.md#create-a-local-user) to paste development cookies into the browser and create a local user with or without a hubs subscription.

## Path Alias

To add or edit the import path aliases refer to [tsconfig.json](https://github.com/mozilla/turkey-portal/blob/main/client/tsconfig.json). Remember to update storybook in file [main.js](https://github.com/mozilla/turkey-portal/blob/main/client/.storybook/main.js) in parallel to match the file paths.

## Media Queries ( React Hooks )

Classic media queries are available for SCSS styling. However, sometimes you will need access to media queries within the JavaScript of your React Component. That's where React Hook Media Queries come in. See [useMediaQuery.tsx](https://github.com/mozilla/turkey-portal/blob/main/client/hooks/useMediaQuery.tsx).
