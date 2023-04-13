/**
 * Create Navigation Query
 * @param id
 * @returns
 */
export const createNavigationQuery = (id: string) => {
  return `{
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
`;
};

/**
 * Create Custom Page Collection Query
 * @param slug
 * @returns query
 */
export const createCustomPageQuery = (slug: string) => {
  return `{
      customPageCollection(limit:1,where:{slug:"${slug}"}){
        items {
          ... on CustomPage {
            title
            ${sectionsCollection}
          }
        }  
      }
    }
  `;
};

/**
 * Create Section Collection Query
 * @param name
 * @param id
 * @returns query
 */
export const createSectionsQuery = (name: string, id: string) => {
  return `query {${name}(id: "${id}") { ${sectionsCollection} }}`;
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
      title
      body
      background
      adornment
      textColor

      tilesCollection {
        items {
          ... on SpotlightTile {
            image {
              url
              description
            }
            imageAlt
            title
            description
            ctaTitle
            ctaHref
          }
        }
      }
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
      ctaTitle
      ctaHref
      cta2Title
      cta2Href
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
      ctaTitle
      ctaHref
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
