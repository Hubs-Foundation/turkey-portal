## Hubs Marketing Site

Before Running the app make sure you have a .env.local file set up

ENV = 'local'
CONTENTFUL_TOKEN = XXXXXXXXXXXXXXXXXXXXXXX

To run:

```
npm install
npm run dev
```

Open http://localhost:3030  
To build:

```
npm run build
npm run start
```

Open http://localhost:3030

## Environment Variables

Note: config.ts is where env varibles get initiated for this project NOT Skooner. We use skooner to tell "https://dev.myhubs.net/" and "https://hubs.mozilla.com/" the ENV and CONTENTFUL_TOKEN var only. All other enviorment vars are set off of the ENV var.

- DASH_ROOT_DOMAIN - Root url for dashboard "dashboard.dev.myhubs.net"
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_PAYMENT_URL - subscription payment url
- PRODUCT_ID - subscription payment ID
- PLAN_ID_EA - subscription payment Early Access ID
- ENV - "local" if you are locally developing
- CONTENTFUL_TOKEN - secret api token from contentful, if you do not have a contentful reach out to ngrato@mozilla for help. Keep in mind there are specific tokens for specific enviornments
