# ---- build stage ----
FROM node:18-alpine as builder
arg GITHUB_TOKEN
arg ENV
arg CONTENTFUL_TOKEN
workdir client
COPY . .
ENV GITHUB_TOKEN=$GITHUB_TOKEN
RUN echo "ENV: $ENV, CONTENTFUL_TOKEN-last4: ${CONTENTFUL_TOKEN: -4}"
RUN npm config set -- "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" && npm install && CONTENTFUL_TOKEN=2Ou5lQVJKiR_0_UZn4i_Ro2TRH5hN82UnP93Vn5HGt8 npm run build
# ---- app stage ----
FROM node:18-alpine
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
