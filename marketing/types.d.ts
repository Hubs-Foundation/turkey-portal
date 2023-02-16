import { StaticImageData } from 'next/image';
import { Document } from '@contentful/rich-text-types';

/**
 * CONTENFUL MEDIA TYPES
 */
export type CustomSectionsT = {
  //Expoand the item type as we add more custom sections
  items: TitleDescriptionT[] | FiftyfiftyT[] | HeroT[];
};

export type FiftyfiftyT = {
  desktopImage: ImageT;
  mobileImage: ImageT;
  imageAlt: string;
  accentImage?: ImageT | null;
  accentImageAlt?: string;
  title?: string;
  subtitle?: string;
  richText?: {
    json: Document;
  };
  layout?: 'left' | 'right';
  __typename?: string;
};

export type HeroT = {
  desktopImage: ImageT;
  mobileImage: ImageT;
  imageAlt: string;
  title?: string;
  body?: string;
  ctaTitle?: string;
  ctaHref?: string;
  __typename?: string;
};

export type LinkT = {
  href: string;
  label: string;
  text: string;
};

export type TitleDescriptionT = {
  title: string;
  description: string;
  __typename: string;
};

export type PathCollectionT = {
  slug: string;
};

export type ImageT = {
  url: string;
  description: string;
};

/**
 * UTILITY TYPES
 */
export type RegionsT = 'DE' | 'US';
