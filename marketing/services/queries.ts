/**
 * Create Navigation Query
 * @param id
 * @returns
 */
export const createNavigationQuery = (id: string) => {
  return `{
    navigation(id: "${id}") {
      ${navCollection}
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

export const createBlogPageQuery = (slug: string, navId: string) => {
  return `{
    navigation(id: "${navId}") {
      ${navCollection}
    }
    blogPostCollection(limit:1,where:{slug:"${slug}"}){
      items {
        ... on BlogPost {
          ${blogCollection}
          post {
            json
           }
          featuredImage {
            url
          }
        }
      }  
    }
  }`;
};

/**
 * Create Blog Query
 * @param name
 * @param id
 * @returns query
 */
export const createBlogQuery = (name: string, id: string) => {
  return `query {${name}(id: "${id}") { 
    name
    blogPostCollection {
      items {
        ... on BlogPost {
          ${blogCollection}
          thumbnailImage {
            url (transform: {
              width: 800,
              height: 800,
              resizeStrategy: FILL,
              resizeFocus: CENTER,
              cornerRadius: 20,
            })
          }
        }
      }
    }
   }}`;
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
const blogCollection = `
sys {
  id
}
slug
title
subtitle
date
preview
imageAlt
`;

const navCollection = `
linksCollection {
  items {
    ... on Link {
      href
      label
      text
    }
  }
}
bannerText 
bannerIcon`;

const sectionsCollection = `
sectionsCollection {
  items {
    ... on Grid {
      __typename
    }
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
        url(transform: {
          width: 500,
          height: 300})
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
      background
      adornment
      ctaTitle
      ctaHref
      ctaStyle
      richText {
        json
       }
      textColor
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
