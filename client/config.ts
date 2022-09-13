import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const API_SERVER = isServerSide
  ? serverRuntimeConfig.API_SERVER
  : publicRuntimeConfig.API_SERVER;
export const HUB_ROOT_DOMAIN = publicRuntimeConfig.HUB_ROOT_DOMAIN;
export const AUTH_SERVER_URL = publicRuntimeConfig.AUTH_SERVER_URL;
export const PUBLIC_DASH_ROOT_DOMAIN =
  publicRuntimeConfig.PUBLIC_DASH_ROOT_DOMAIN;
