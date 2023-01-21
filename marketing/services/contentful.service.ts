import { createClient } from 'contentful';
import { NavigationT, LinkT, HeroT } from 'types';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
});

/**
 * Get Hero Content
 * @param id
 * @returns
 */
export const getHeroEntry = async (id: string) => {
  const data = await client.getEntry<HeroT>(id);
  return data;
};

/**
 * Get Navigation Content
 * @param id
 * @returns
 */
export const getNavigationLinksEntry = async (id: string) => {
  const data = await client.getEntry<NavigationT>(id);
  const links = data.fields.links as LinkT[];
  return links;
};
