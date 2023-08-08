import Head from 'next/head';
import Custom from '@Shared/Custom/Custom';
import { CustomSectionsT, NavigationT } from 'types';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
// Services
import {
  getNavigationLinksEntry,
  getSectionsData,
} from 'services/contentful.service';

type HomePropsT = {
  navData: NavigationT;
  sectionsData: CustomSectionsT;
};

const Home = ({ navData, sectionsData }: HomePropsT) => {
  return (
    <LayoutWrapper navData={navData}>
      <div className="page_wrapper">
        <Head>
          <title>Hubs - Private, virtual 3D worlds in your browser</title>
        </Head>
        <main>
          {sectionsData.items ? (
            <div>
              {sectionsData.items.map((section, i) => {
                return <Custom key={i} data={section} />;
              })}
            </div>
          ) : (
            <div>There was a problem loading this page. please refresh.</div>
          )}
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const sectionsData = await getSectionsData(
      'homePage',
      'iUw7LHBaBcgGaKydU2qKJ'
    );

    const navData = await getNavigationLinksEntry();

    return {
      props: {
        sectionsData,
        navData,
      },
    };
  } catch (error) {
    console.error('ERROR', error);
    return {
      props: {
        sectionsData: {},
        navData: {},
      },
    };
  }
}
