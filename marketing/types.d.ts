import { StaticImageData } from 'next/image';
import { Document } from '@contentful/rich-text-types';

/**
 * CONTENFUL MEDIA TYPES
 */
export type CustomSectionsT = {
  //Expoand the item type as we add more custom sections
  items: TitleDescriptionT[] | FiftyfiftyT[] | HeroT[] | TileSpotlightT[];
};

export type FiftyfiftyT = {
  desktopImage: ImageT;
  mobileImage: ImageT;
  imageAlt: string;
  accentImage?: ImageT | null;
  accentImageAlt?: string;
  title?: string;
  subtitle?: string;
  ctaTitle?: string;
  ctaHref?: string;
  richText?: {
    json: Document;
  };
  layout?: 'left' | 'right';
  __typename?: string;
};

export type SpotlightTile = {
  image: ImageT;
  imageAlt: string;
  title: string;
  description: string;
  ctaTitle?: string;
  ctaHref?: string;
};

export type TileSpotlightT = {
  title: string;
  body: string;
  background: 'gradient-rainbow' | 'gradient-warm' | 'gradient-cool' | 'none';
  adornment: 'snow' | 'swoosh' | 'none';
  textColor: 'color-text-main' | 'color-text-reverse';
  tilesCollection: {
    items: SpotlightTile[];
  };
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
  cta2Title?: string;
  cta2Href?: string;
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

export type NewContactT = {
  name: string;
  email: string;
  organization: string;
  country: string;
  subject: string;
  activity: string;
  message: string;
};
