import Head from 'next/head';
import { NavigationT } from 'types';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import { getNavigationLinksEntry } from 'services/contentful.service';
import Blog from '@Modules/Blog';

type HomePropsT = {
  navData: NavigationT;
};

const Page = ({ navData }: HomePropsT) => {
  return (
    <LayoutWrapper navData={navData}>
      <div className="page_wrapper">
        <Head>
          <title>Hubs - blog, what's new</title>
        </Head>
        <main>
          <Blog />
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
