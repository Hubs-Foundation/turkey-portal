import { ENV } from 'config';

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
