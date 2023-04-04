import { ENV, ENABLE_STARTER_PLAN } from 'config';

export const localFeature = (): boolean => {
  return ENV === 'local';
};

export const devFeature = (): boolean => {
  return ENV === 'dev';
};

export const stagingFeature = (): boolean => {
  return ENV === 'staging';
};

export const prodFeature = (): boolean => {
  return ENV === 'prod';
};

export const enabledStarterPlan = (): boolean => {
  return ENABLE_STARTER_PLAN === 'true';
};
