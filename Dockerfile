# syntax=docker/dockerfile:1
ARG SRC_DIR=/src

# ---- dev stage ----
ARG ALPINE_LINUX_VERSION=3.16.2
ARG ELIXIR_VERSION=1.13.4
ARG ERLANG_VERSION=25.1.1

FROM hexpm/elixir:$ELIXIR_VERSION-erlang-$ERLANG_VERSION-alpine-$ALPINE_LINUX_VERSION AS dev
RUN mix do local.hex --force, local.rebar --force
RUN apk add --no-cache \
    # required by hex:phoenix_live_reload \
    inotify-tools
COPY container/trapped-mix /usr/local/bin/trapped-mix

# ---- build stage ----
FROM elixir:1.13 AS builder
ARG SRC_DIR
RUN apt-get update -y && apt-get install -y build-essential git \
    && apt-get clean && rm -f /var/lib/apt/lists/*_*
RUN mix local.rebar --force \
    && mix local.hex --force
ENV MIX_ENV=prod
WORKDIR $SRC_DIR
COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mkdir config
COPY config/config.exs config/$MIX_ENV.exs config/
RUN mix deps.compile
COPY priv priv
COPY assets assets
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install nodejs
RUN cd assets && npm install react react-dom && cd ..
RUN mix assets.deploy
RUN mix phx.digest
COPY lib ./lib
RUN mix compile
COPY config/runtime.exs config/
# COPY rel rel
RUN mix release

# ---- app stage ----
FROM debian:bullseye-slim
ARG SRC_DIR
RUN apt-get update -y && apt-get install -y libstdc++6 openssl libncurses5 locales \
  && apt-get clean && rm -f /var/lib/apt/lists/*_*
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
WORKDIR "/app"
RUN chown nobody /app
COPY --from=builder --chown=nobody:root $SRC_DIR/_build/prod/rel/dash ./
USER nobody
CMD /app/bin/dash start
