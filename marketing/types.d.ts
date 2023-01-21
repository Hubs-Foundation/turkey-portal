import { StaticImageData } from 'next/image';

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
  fields: ImageFieldT;
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

export type LinkFieldT = {
  href: string;
  label: string;
  text: string;
};

export type LinkT = {
  fields: LinkFieldT;
};

export type NavigationT = {
  links: LinkT[];
  name: string;
};

/**
 * COUNTRIES GEO
 */

export type RegionsT = 'DE' | 'US';
