import { HomePageQueryParamT } from 'types';

export const createNavigationQuery = (id: string) => {
  return {
    query: `{
    navigation(id: "${id}") {
      linksCollection {
        items {
          ... on Link {
            href
            label
            text
          }
        }
      }
    }
  }
`,
  };
};

export const createHeroQuery = (id: string) => {
  return {
    query: `{
      hero(id:"${id}"){
        heroAlt
        ctaHref
        title
        mobileImage {
          url
          description
        }
        desktopImage{
          url
          description
        }
        body
      }
    }
`,
  };
};

export const createHomePageQuery = (config: HomePageQueryParamT) => {
  return {
    query: `{
      navigation(id: "${config.navigation}") {
        linksCollection {
          items {
            ... on Link {
              href
              label
              text
            }
          }
        }
      }
      hero(id:"${config.hero}"){
        mobileImage {
          url
          description
        }
        desktopImage{
          url
          description
        }
        title
        body
        heroAlt
        ctaTitle
        ctaHref
      }
    }
`,
  };
};
