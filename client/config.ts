import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const API_SERVER = isServerSide
  ? serverRuntimeConfig.API_SERVER
  : publicRuntimeConfig.API_SERVER;
export const HUB_ROOT_DOMAIN = process.env.HUB_ROOT_DOMAIN;
