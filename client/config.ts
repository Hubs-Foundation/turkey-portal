import getConfig from 'next/config';

// source of true
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const PUBLIC_API_SERVER = isServerSide
  ? serverRuntimeConfig.PUBLIC_API_SERVER
  : publicRuntimeConfig.PUBLIC_API_SERVER;
export const HUB_ROOT_DOMAIN = publicRuntimeConfig.HUB_ROOT_DOMAIN;
export const AUTH_SERVER = publicRuntimeConfig.AUTH_SERVER;
export const FXA_SERVER = publicRuntimeConfig.FXA_SERVER;
export const DUMMY = publicRuntimeConfig.dummy;
