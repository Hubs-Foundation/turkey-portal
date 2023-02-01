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

export const createCustomPageQuery = (slug: string) => {
  return {
    query: `{
      customPageCollection(limit:1,where:{slug:"${slug}"}){
        items {
          ... on CustomPage {
            title
            sectionsCollection {
              items {
                ... on Hero {
                  __typename
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
                ... on TitleDescription {
                __typename
                  title
                  description
                }
                ...on Fiftyfifty {
                  __typename
                  title
                  subtitle
                  accentImage{
                      url
                      description
                    }
                  accentImageAlt
                  layout
                  imageAlt
                  
                  imageMobile{
                      url
                      description
                    }
                  image{
                      url
                      description
                    }
                  }
                }
              }
            }
          }  
        }
    }
  `,
  };
};

export const createSectionsQuery = (id: string) => {
  return {
    query: `{customPage(id: "${id}") {
    sectionsCollection {
      items {
        ... on Hero {
          __typename
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
      ... on TitleDescription {
       __typename
        title
        description
      }
        ...on Fiftyfifty {
          __typename
          title
          subtitle
          accentImage{
              url
              description
            }
          accentImageAlt
          layout
          imageAlt
          
          imageMobile{
              url
              description
            }
          image{
              url
              description
            }
         
        }
        
      }
    }
    sys {
      id
    }
    # add the fields you want to query
  }}`,
  };
};
