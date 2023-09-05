import Head from 'next/head';
import { BlogT, NavigationT } from 'types';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import {
  getBlogData,
  getNavigationLinksEntry,
} from 'services/contentful.service';
import Blog from '@Modules/Blog';

type HomePropsT = {
  navData: NavigationT;
  blogData: BlogT;
};

const Page = ({ navData, blogData }: HomePropsT) => {
  return (
    <LayoutWrapper navData={navData}>
      <div className="page_wrapper">
        <Head>
          <title>{blogData ? blogData.name : 'Hubs Blog'}</title>
        </Head>
        <main>
          {blogData ? (
            <Blog blogData={blogData} />
          ) : (
            <div className="text-center p-60">
              There was a problem loading the blog
            </div>
          )}
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Page;

export async function getStaticProps() {
  try {
    const blogData = await getBlogData();
    const navData = await getNavigationLinksEntry();
    return {
      props: {
        navData,
        blogData,
      },
    };
  } catch (error) {
    console.error('ERROR', error);
    return {
      props: {
        navData: {},
        blogData: {},
      },
    };
  }
}
