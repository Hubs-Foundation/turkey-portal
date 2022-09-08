import getConfig from 'next/config';


// source of true
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const API_SERVER = isServerSide
  ? serverRuntimeConfig.API_SERVER
  : publicRuntimeConfig.API_SERVER;
export const HUB_ROOT_DOMAIN = process.env.HUB_ROOT_DOMAIN;
export const ACCOUNT_ROOT_DOMAIN = process.env.ACCOUNT_ROOT_DOMAIN;

// put all the env in here in the README so other devs
// know what vars are needed to run the project. ..
// - name: dummy
// value: dummy
// - name: PUBLIC_API_SERVER
// value: https://dashboard.dev.myhubs.net