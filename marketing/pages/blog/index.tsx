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

const CustomPage = () => {
  return (
    <div className="page_wrapper">
      <main>i'm a index page.</main>
    </div>
  );
};

export default CustomPage;

// export async function getStaticProps({ params }: GetStaticPropsT) {
//   try {
//     const sectionsData = await getCustomPageData(params.slug);

//     return {
//       props: {
//         sectionsData,
//       },
//     };
//   } catch {
//     return {
//       props: {
//         sectionsData: [],
//       },
//     };
//   }
// }

// export async function getStaticPaths() {
//   // Get Entries
//   const entries = await getStaticPathEntries('customPage');
//   // Create Paths Object
//   const paths = entries.items.map((item) => {
//     return { params: { slug: item.fields.slug } };
//   });

//   return {
//     paths: paths,
//     fallback: 'blocking',
//   };
// }
