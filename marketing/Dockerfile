# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
arg ENV
arg CONTENTFUL_TOKEN
workdir client
COPY . .
RUN echo "ENV: $ENV, CONTENTFUL_TOKEN-last4: ${CONTENTFUL_TOKEN: -4}"
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install 
RUN npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
