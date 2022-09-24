import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const {
  AUTH_SERVER,
  FXA_SERVER,
  HUB_ROOT_DOMAIN,
  DASH_ROOT_DOMAIN,
  MARKETING_PAGE_URL,
} = publicRuntimeConfig;

export const DUMMY = publicRuntimeConfig.dummy;
export const PUBLIC_API_SERVER = isServerSide
  ? serverRuntimeConfig.PUBLIC_API_SERVER
  : publicRuntimeConfig.PUBLIC_API_SERVER;
