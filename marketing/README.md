## Hubs Marketing Site

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

- HUB_ROOT_DOMAIN - Root url for cluster ( todo more info here )
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"
- FXA_PAYMENT_URL - subscription payment url
- PRODUCT_ID - subscription payment ID
- PLAN_ID_EA - subscription payment Early Access ID
