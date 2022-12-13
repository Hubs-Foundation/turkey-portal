import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import styles from './participant-sorter.module.scss';

type ParticipantSorterTPropsT = {};

const ParticipantSorter = ({}: ParticipantSorterTPropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Participation Sorter</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <h1>sorter</h1>
      </main>
    </div>
  );
};

export default ParticipantSorter;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
