import Head from 'next/head';

type SandboxPropsT = {};

/**
 * This modal is used to sandbox code. feel free to play, this will
 * not show up on prod
 */
const Sandbox = ({}: SandboxPropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        <h1>Sandbox</h1>
      </main>
    </div>
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
