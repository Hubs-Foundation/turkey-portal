import { StaticImageData } from 'next/image';

export type HomePageQueryParamT = {
  navigation: string;
  hero: string;
};

/**
 * MEDIA IMAGES
 */
export type ImageFileT = {
  url: StaticImageData;
};

export type ImageFieldT = {
  title: string;
  description: string;
  file: ImageFileT;
};

export type ImageT = {
  url: string;
  description: string;
};

/**
 * MEDIA HERO
 */
export type HeroT = {
  desktopImage: ImageT;
  mobileImage: ImageT;
  heroAlt: string;
  title: string;
  body: string;
  ctaTitle: string;
  ctaHref: string;
};

/**
 * MEDIA LINKS
 */
export type LinkT = {
  href: string;
  label: string;
  text: string;
};

export type NavigationT = {
  links: LinkT[];
  name: string;
};

/**
 * COUNTRIES GEO
 */

export type RegionsT = 'DE' | 'US';
