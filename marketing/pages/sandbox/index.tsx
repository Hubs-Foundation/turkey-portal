import Head from 'next/head';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
type SandboxPropsT = {};

/**
 * This modal is used to sandbox code. feel free to play, this will
 * not show up on prod
 */
const Sandbox = ({}: SandboxPropsT) => {
  return (
    <LayoutWrapper>
      <div className="page_wrapper">
        <Head>
          <title>Sandbox</title>
        </Head>
        <main>
          <h1>Sandbox</h1>
        </main>
      </div>
    </LayoutWrapper>
  );
};

export default Sandbox;

export async function getStaticProps() {
  if (process.env.ENV === 'prod') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
