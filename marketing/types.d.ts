import { StaticImageData } from 'next/image';
import { Document } from '@contentful/rich-text-types';

export type CustomSectionsT = {
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

export type ImageT = {
  url: string;
  description: string;
};

export type RegionsT = 'DE' | 'US';

export type TitleDescriptionT = {
  title: string;
  description: string;
  __typename: string;
};

type PathCollectionT = {
  slug: string;
};
