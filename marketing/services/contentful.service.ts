import axios, { AxiosResponse } from 'axios';
import { createClient } from 'contentful';
import { LinkT, HeroT, CustomSectionsT, PathCollectionT } from 'types';
import { Entry, EntryCollection } from 'contentful';
import {
  createNavigationQuery,
  createSectionsQuery,
  createCustomPageQuery,
} from './queries';

const CONTENTFUL_TOKEN = process.env.CONTENTFUL_TOKEN;
const SPACE = 'p5qj0ed8ji31';
const BASE_URL = 'https://graphql.contentful.com/content/v1/spaces/';
const URL = `${BASE_URL}${SPACE}`;
const PROTOCOLS = {
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${CONTENTFUL_TOKEN}`,
  },
};

/**
 * Init Contentful Client
 * Note: The client is a nice abstraction to use for getting specific entries. To reduce
 * the number of API calls to Contenful opt into using GraphQl queries and combined calls
 * by default, however, if you only need a specific entery, the Contentful client is a
 * nice way to go.
 */
const client = createClient({
  space: SPACE,
  accessToken: CONTENTFUL_TOKEN ?? '',
});

/**
 * Handle Bad Request
 * @param statusText
 * @returns Boolean
 */
const handleBadRequest = (statusText: string): boolean => {
  const isBad = statusText === 'Bad Request';
  if (isBad) {
    console.error(`GraphQL response error code :${statusText}`);
  }
  return isBad;
};

/**
 * Get Hero Content
 * @param id
 * @returns
 */
export const getHeroEntry = async (id: string): Promise<Entry<HeroT>> =>
  await client.getEntry<HeroT>(id);

/**
 * Get static path for dynamically generated URLS
 * @param type
 * @returns PathCollectionT[]
 */
export const getStaticPathEntries = async (
  type: string
): Promise<EntryCollection<PathCollectionT>> =>
  client.getEntries<PathCollectionT>({
    content_type: type,
  });

/**
 * Get Navigation Content
 * @param id
 * @returns LinkT[]
 */
export const getNavigationLinksEntry = async (id: string): Promise<LinkT[]> => {
  const { data, statusText } = await axios
    .post(URL, { query: createNavigationQuery(id) }, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data);

  // Query is wrong
  if (handleBadRequest(statusText)) {
    throw statusText;
  }

  return data.navigation.linksCollection.items;
};

/**
 * Get Sections Data
 * @param name
 * @param id
 * @returns
 */
export const getSectionsData = async (
  name: string,
  id: string
): Promise<CustomSectionsT> => {
  const { data, statusText } = await axios
    .post(URL, { query: createSectionsQuery(name, id) }, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data);

  // Query is wrong
  if (handleBadRequest(statusText)) {
    throw statusText;
  }
  return data[name].sectionsCollection;
};

/**
 * Get Custom Page Data
 * @param slug
 * @returns
 */
export const getCustomPageData = async (
  slug: string
): Promise<CustomSectionsT> => {
  const { data, statusText } = await axios
    .post(URL, { query: createCustomPageQuery(slug) }, { ...PROTOCOLS })
    .then(({ data }: AxiosResponse) => data);

  // Query is wrong
  if (handleBadRequest(statusText)) {
    throw statusText;
  }

  return data.customPageCollection.items[0].sectionsCollection;
};
