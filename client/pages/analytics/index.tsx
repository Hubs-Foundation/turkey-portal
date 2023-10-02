import Head from 'next/head';
import styles from './analytics.module.scss';
import Card from '@Shared/Card/Card';

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
        <div className="p-80">
          <Card size="large">
            <h1>Analytics</h1>
          </Card>
        </div>
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
