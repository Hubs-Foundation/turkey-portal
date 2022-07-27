# ---- build stage ----
FROM debian:bullseye-slim as builder
RUN apt-get update -y && apt-get install -y curl \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*
workdir client
COPY . .
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install nodejs
RUN npm install -g yarn
RUN yarn && yarn run build

# ---- app stage ----
FROM debian:bullseye-slim
RUN apt-get update -y && apt-get install -y curl \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install nodejs
RUN npm install -g yarn
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root /client ./
USER nobody
CMD yarn run start
