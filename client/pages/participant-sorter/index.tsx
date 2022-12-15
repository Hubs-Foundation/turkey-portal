import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import styles from './participant-sorter.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GroupBuilder from 'components/participantSorter/GroupBuilder/GroupBuilder';
import { Button, Checkbox, Input, InputT, Icon } from '@mozilla/lilypad';
//mike
import ToolTip from '../../components/shared/ToolTip/ToolTip';
//mikend

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

      <main className="flex-justify-center mt-95-dt mt-40-mb">
        <div className={`primary-card ${styles.card}`}>
          <div className={styles.card_section}>
            <h1 className="heading-lg mb-44">Configure an Event</h1>
            <h2 className="heading-sm mb-12">Event Details</h2>
            <Input
              classProp="mb-24"
              placeholder="Event Name"
              name="event_name"
              label="Event Name"
              id="event_name"
              value=""
            />

            {/* START TIMES */}
            <div className="flex mb-24">
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                customInput={
                  <Input
                    placeholder="Start Date"
                    name="start_date"
                    label="Start Date"
                    id="start_date"
                    value=""
                  />
                }
              />

              <Input
                placeholder="time"
                name="start_time"
                label="Start Time"
                classProp="pl-14"
                id="start_time"
                type="time"
                value=""
              />
            </div>

            {/* EARLY ENTRY  */}
            <div>
              <Checkbox
                classProp="content-box ml-13"
                label="Allow eary entry"
                onChange={() => {}}
              />
            </div>

            {/* END TIMES  */}
            <div className="flex">
              <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                customInput={
                  <Input
                    placeholder="End Date"
                    name="end_date"
                    label="End Date"
                    id="end_date"
                    value=""
                  />
                }
              />

              {/* mike */}
              <ToolTip 
                name="end_date"
              />
              {/* mikend */}

              <Input
                placeholder="time"
                name="end_time"
                label="End Time"
                classProp="pl-14"
                id="end_time"
                type="time"
                value=""
              />
            </div>
          </div>
          <div className={styles.card_section}>
            <h2 className="heading-sm mb-12">Room Groups</h2>
            <p className="body-md mb-24">
              Condimentum aliquam scelerisque odio cras in nisi id viverra.
              Lacinia ut sit enim donec at egestas faucibus pulvinar. Ut erat
              nisi faucibus in. Risus ac mauris pharetra velit mi sed faucibus
              libero.
            </p>

            <GroupBuilder />

            <Button
              classProp="mt-24"
              label="add group"
              text="Add group"
              icon="plus"
            />
          </div>
          <div className={styles.card_section}>
            <h2 className="heading-sm mb-12">Event URL</h2>
            <Input
              placeholder="Event Url"
              name="event_url"
              label="Event URL"
              id="event_url"
              value=""
            />
          </div>
          <div className="flex-justify-end p-40">
            <Button label="create event" text="create event" />
          </div>
        </div>
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
