import { CustomSectionsT } from 'types';
import Custom from '@Shared/Custom/Custom';
import {
  getCustomPageData,
  getStaticPathEntries,
} from 'services/contentful.service';

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
        {sectionsData.items ? (
          <div>
            {sectionsData.items.map((section, i) => {
              return <Custom key={i} data={section} />;
            })}
          </div>
        ) : (
          <div>
            You either have no sections or there was an issue loading content
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps({ params }: GetStaticPropsT) {
  try {
    const sectionsData = await getCustomPageData(params.slug);

    return {
      props: {
        sectionsData,
      },
    };
  } catch {
    return {
      props: {
        sectionsData: [],
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
