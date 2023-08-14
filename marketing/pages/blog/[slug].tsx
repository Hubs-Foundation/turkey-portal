import { BlogPostT, GetStaticPropsT } from 'types';
import Head from 'next/head';
import { NavigationT } from 'types';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import BlogPost from '@Modules/Blog/BlogPost/BlogPost';
import {
  getStaticPathEntries,
  getBlogPageData,
} from 'services/contentful.service';

type PagePropsT = {
  navigation: NavigationT;
  post: BlogPostT;
};

const Page = ({ navigation, post }: PagePropsT) => {
  return (
    <LayoutWrapper navData={navigation}>
      <div className="page_wrapper">
        <Head>
          <title>{post.title}</title>
        </Head>
        <main>
          <BlogPost post={post} />
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Page;

export async function getStaticProps({ params }: GetStaticPropsT) {
  try {
    const { navigation, post } = await getBlogPageData(params.slug);

    return {
      props: {
        navigation,
        post,
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
  const entries = await getStaticPathEntries('blogPost');
  // Create Paths Object
  const paths = entries.items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
