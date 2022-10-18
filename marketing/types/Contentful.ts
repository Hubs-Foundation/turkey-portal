import { StaticImageData } from 'next/image';

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
