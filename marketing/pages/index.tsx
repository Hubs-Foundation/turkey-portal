import Head from 'next/head';
import Custom from '@Shared/Custom/Custom';
import { CustomSectionsT } from 'types';
// Services
import { getSectionsData } from 'services/contentful.service';
import { getEnvVariable } from 'config';

type HomePropsT = {
  sectionsData: CustomSectionsT;
  dashdomaintest: string;
};

const Home = ({ sectionsData, dashdomaintest }: HomePropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Hubs - Private, virtual 3D worlds in your browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>ENV:{dashdomaintest}</h1>
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
  const sectionsData = await getSectionsData(
    'homePage',
    'iUw7LHBaBcgGaKydU2qKJ'
  );
  console.log('process.env.ENV', process.env.ENV);

  return {
    props: {
      sectionsData,
      dashdomaintest: getEnvVariable(process.env.ENV, 'DASH_ROOT_DOMAIN'),
    },
  };
}
