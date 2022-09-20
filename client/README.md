This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Make sure database server is running. See 'README' in root project.

Open [http://localhost:3000](http://localhost:3000) with your
browser to see the result.

## Setting Up Lilypad

Configure your local install of NPM itself to be authorized to use Lilypad. To do this we use a .npmrc file.

This file is NOT PART OF YOUR PROJECT. This is a global file in a central location. For Mac/Linux users it goes in your home directory ~/.npmrc.

For Windows users it goes in your home directory as well, though the syntax will be different. Something along the lines of C:\Users\{YOUR_WINDOWS_USERNAME}

Once you have created the file, edit it to include the following information:

~/.npmrc

```
registry=https://registry.npmjs.org/
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN

```

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
