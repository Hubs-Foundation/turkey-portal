/**
 * Create Navigation Query
 * @param id
 * @returns
 */
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

/**
 * Create Custom Page Collection Query
 * @param slug
 * @returns query
 */
export const createCustomPageQuery = (slug: string) => {
  return {
    query: `{
      customPageCollection(limit:1,where:{slug:"${slug}"}){
        items {
          ... on CustomPage {
            title
            ${sectionsCollection}
          }
        }  
      }
    }
  `,
  };
};

/**
 * Create Section Collection Query
 * @param name
 * @param id
 * @returns query
 */
export const createSectionsQuery = (name: string, id: string) => {
  return {
    query: `{${name}(id: "${id}") {
      ${sectionsCollection}
    }}`,
  };
};

/**
 * Query Bank
 */
const sectionsCollection = `
sectionsCollection {
  items {
    ... on EmailSignUp {
      __typename
    }
    ... on Subscribe {
      __typename
    }
    ... on TileSpotlight {
      __typename
    }
    ... on ValueProps {
      __typename
    }
    ... on Testimonial {
      __typename
    }
    ... on Hero {
      __typename
      imageAlt
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
    ... on TitleDescription {
    __typename
      title
      description
    }
    ...on Fiftyfifty {
      __typename
      title
      subtitle
      richText {
        json
       }
      accentImage {
        url
        description
      }
      accentImageAlt
      layout
      imageAlt
      mobileImage{
        url
        description
      }
      desktopImage{
        url
        description
      }
    } 
  }
}`;
