import { CustomSectionsT } from 'types';
import Head from 'next/head';
import { NavigationT } from 'types';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import { getNavigationLinksEntry } from 'services/contentful.service';
import BlogPost from '@Modules/Blog/BlogPost/BlogPost';
import { getStaticPathEntries } from 'services/contentful.service';

type HomePropsT = {
  navData: NavigationT;
};

const Page = ({ navData }: HomePropsT) => {
  return (
    <LayoutWrapper navData={navData}>
      <div className="page_wrapper">
        <Head>
          <title>Hubs - blog post</title>
        </Head>
        <main>
          <BlogPost />
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Page;

export async function getStaticProps() {
  try {
    const navData = await getNavigationLinksEntry();

    return {
      props: {
        navData,
      },
    };
  } catch (error) {
    console.error('ERROR', error);
    return {
      props: {
        navData: {},
      },
    };
  }
}

export async function getStaticPaths() {
  // Get Entries
  const entries = await getStaticPathEntries('customPage');
  // Create Paths Object
  const paths = entries.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
