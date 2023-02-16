import Head from 'next/head';
import Custom from '@Shared/Custom/Custom';
import { CustomSectionsT } from 'types';
// Services
import { getSectionsData } from 'services/contentful.service';

type HomePropsT = {
  sectionsData: CustomSectionsT;
};

const Home = ({ sectionsData }: HomePropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Hubs - Private, virtual 3D worlds in your browser</title>
        <link rel="icon" href="/favicon.ico" />
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
  );
};

export default Home;

export async function getStaticProps() {
  try {
    const sectionsData = await getSectionsData(
      'homePage',
      'iUw7LHBaBcgGaKydU2qKJ'
    );

    return {
      props: {
        sectionsData,
      },
    };
  } catch {
    return {
      props: {
        sectionsData: {},
      },
    };
  }
}
