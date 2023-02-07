import { createClient } from 'contentful';
import { NavigationT, LinkT, HeroT, HomePageQueryParamT } from 'types';
import {
  createNavigationQuery,
  createHomePageQuery,
  createSectionsQuery,
  createCustomPageQuery,
} from './queries';
const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = 'https://graphql.contentful.com/content/v1/spaces/';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string,
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
 * @returns LinkT[]
 */
export const getNavigationLinksEntry = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${SPACE}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(createNavigationQuery(id)),
    });

    const { data } = await response.json();
    return data.navigation.linksCollection.items as LinkT[];
  } catch (error) {
    console.log(error);
  }
};

export const getHomePageData = async () => {
  console.log('getting home!');

  try {
    const config: HomePageQueryParamT = {
      navigation: '4FsGf6XPSDTPppGDlyFYm9',
      hero: '5Ye30v1zUE0V98AxdchWJK',
    };
    const response = await fetch(`${BASE_URL}${SPACE}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(createHomePageQuery(config)),
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSectionsData = async (name: string, id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${SPACE}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },

      body: JSON.stringify(createSectionsQuery(name, id)),
    });

    if (response.statusText === 'Bad Request') {
      console.error('Bad Request:', response);
      return {};
    }
    const { data } = await response.json();
    console.log('response');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomPageData = async (slug: string) => {
  try {
    const response = await fetch(`${BASE_URL}${SPACE}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(createCustomPageQuery(slug)),
    });

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
