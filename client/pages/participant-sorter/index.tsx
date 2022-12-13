import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import styles from './participant-sorter.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ParticipantSorterTPropsT = {};

const ParticipantSorter = ({}: ParticipantSorterTPropsT) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates: any) => {
    console.log('datres', dates);
    const [start, end] = dates;
    console.log('start', start);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Participation Sorter</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <h1>sorter</h1>

        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
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
