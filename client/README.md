This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Setup Lilypad

First, create an access token on Github to fetch our maintained Lilypad component library on npm, you need to create an access token on github and enable Mozilla organization on the access token.

Configure your local install of NPM itself to be authorized to use Lilypad. To do this we use a `.npmrc` file. This file is NOT PART OF YOUR PROJECT. This is a global file in a central location. For Mac/Linux users it goes in your home directory ~/.npmrc.

For Windows users it goes in your home directory as well, though the syntax will be different. Something along the lines of C:\Users\{YOUR_WINDOWS_USERNAME}

Once you have created the file, edit it to include the following information:

~/.npmrc

```
registry=https://registry.npmjs.org/
@YOUR_GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN

```

This will allow you to get updates from lilypad during development!

### 2. Install dependencies in the `/client` directory (this directory) and run dev

```bash
npm i
npm run dev
```

### 3. Ensure Phoenix API server is Running

See [/README.md](/README.md) 'README' in root project.

### 4. Open [http://localhost:3000](http://localhost:3000)

**NOTE: If you keep getting redirected, you may need to navigate to [http://localhost:3000/subscribe?redirect=false](http://localhost:3000/subscribe?redirect=false) to paste the Auth Cookies in the [/README.md](/README.md)**

## Production environment variables

- PUBLIC_API_SERVER - public server url ( todo more info here )
- HUB_ROOT_DOMAIN - Root url for cluster ( todo more info here )
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"
- MARKETING_PAGE_URL - URL to the marketing page that we use as logged out homepage for the Dashboard e.g. "https://marketing.page"
- FXA_PAYMENT_URL - subscription payment url
- PRODUCT_ID - subscription payment ID
- PLAN_ID_EA - subscription payment Early Access ID
- PLAN_ID_EA_DE - subscription payment Early Access ID for Germany
- ENV - "local" | "dev" | "staging" | "prod"
- SUBPLAT_SUBSCRIPTIONS_LINK - Links to subplats subscriptions pages

To authenticate using local cookies, see [README.md:"Create a local user"](/README.md#create-a-local-user) to paste development cookies into the browser and create a local user with or without a hubs subscription.

## Path Alias

To add or edit the import path aliases refer to [tsconfig.json](https://github.com/mozilla/turkey-portal/blob/main/client/tsconfig.json). Remember to update storybook in file [main.js](https://github.com/mozilla/turkey-portal/blob/main/client/.storybook/main.js) in parallel to match the file paths.

## Media Queries ( React Hooks )

Classic media queries are available for SCSS styling. However, sometimes you will need access to media queries within the JavaScript of your React Component. That's where React Hook Media Queries come in. See [useMediaQuery.tsx](https://github.com/mozilla/turkey-portal/blob/main/client/hooks/useMediaQuery.tsx).
