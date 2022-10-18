import axios, { AxiosRequestHeaders } from 'axios';
import { createClient } from 'contentful';
import { HeroT } from '../components/shared/Hero/Hero';
import { FiftyFiftyT } from '../components/shared/FiftyFifty/FiftyFifty';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
});

export const getHeroEntry = async (id: string) => {
  const data = await client.getEntry<HeroT>(id);
  return data;
};

export const getFiftyFiftyEntry = async (id: string) => {
  const data = await client.getEntry<FiftyFiftyT>(id);
  return data;
};
