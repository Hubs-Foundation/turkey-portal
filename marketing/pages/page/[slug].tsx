import { CustomSectionsT } from 'types';
import Custom from '@Shared/Custom/Custom';
import { getCustomPageData } from 'services/contentful.service';

// Services
import { getSectionsData } from 'services/contentful.service';

type CustomPagePropsT = {
  sectionsData: CustomSectionsT;
};

type GetStaticPropsT = {
  params: {
    slug: string;
  };
};

const Home = ({ sectionsData }: CustomPagePropsT) => {
  return (
    <div className="page_wrapper">
      <main>
        <h1>im the custom page: </h1>
        <div>
          {sectionsData.items.map((section, i) => {
            return <Custom key={i} data={section} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps({ params }: GetStaticPropsT) {
  const customPageData = await getCustomPageData(params.slug);

  return {
    props: {
      sectionsData:
        customPageData.customPageCollection.items[0].sectionsCollection,
    },
  };
}

export async function getStaticPaths() {
  // TODO need to call contentful and grab all the page slugs
  // that are possible for a custom page....

  return {
    paths: [{ params: { slug: 'nicks-page' } }],
    fallback: 'blocking', //indicates the type of fallback
  };
}
