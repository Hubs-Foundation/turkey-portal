import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import styles from './participant-sorter.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GroupBuilder from 'components/participantSorter/GroupBuilder/GroupBuilder';
import { Button, Checkbox, Input } from '@mozilla/lilypad';
import Select from '@Shared/Select/Select';

type ParticipantSorterTPropsT = {};

const ParticipantSorter = ({}: ParticipantSorterTPropsT) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  type Group = {
    name: string;
  };
  const groupsInit: Group[] = [{ name: 'Group A' }];
  const [groups, setGroups] = useState<Group[]>(groupsInit);

  const onChange = (dates: any) => {
    console.log('datres', dates);
    const [start, end] = dates;
    console.log('start', start);
    setStartDate(start);
    setEndDate(end);
  };

  const onAddGroupClick = () => {
    const letter = String.fromCharCode(groups.length + 65);

    setGroups((state) => {
      const updateGroups = [...state, { name: `Group ${letter}` }];
      return updateGroups;
    });
  };

  const onDeleteGroup = () => {
    setGroups((state) => {
      const updateGroups = [...state];
      updateGroups.pop();
      console.log(updateGroups);
      return updateGroups;
    });
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Participation Sorter</title>
        <meta name="description" content="" />
      </Head>

      <main className="flex-justify-center mt-95-dt mt-40-mb">
        <div className={`primary-card mb-45 ${styles.card}`}>
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
            <div className="flex-align-start">
              <Checkbox
                classProp="content-box ml-13 mr-12 flex-start"
                checked={true}
                onChange={() => {}}
              />
              <Select
                classProp={styles.select_md}
                label="Allow Early Entry"
                name="early_entry"
                id="early_entry"
                value="test"
                options={[
                  { title: '30 Minuts', value: '30' },
                  { title: '35 Minuts', value: '35' },
                ]}
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

            {groups.map((group, i) => {
              return (
                <GroupBuilder
                  key={i}
                  canDelete={i + 1 === groups.length && i !== 0}
                  classProp="mb-24"
                  title={group.name}
                  onDeleteGroup={onDeleteGroup}
                />
              );
            })}

            <Button
              onClick={onAddGroupClick}
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
              value="https://kateshub.myhubs.net/events/Mozilla-SXSW-Exhibition"
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
