import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import styles from './participant-sorter.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GroupBuilder from 'components/participantSorter/GroupBuilder/GroupBuilder';
import { Button, Checkbox, Input } from '@mozilla/lilypad';
import Select from '@Shared/Select/Select';
import { useFormik } from 'formik';
import validate, { FormValues } from 'components/participantSorter/validate';
import ToolTip from '../../components/shared/ToolTip/ToolTip';

type ParticipantSorterTPropsT = {};

const ParticipantSorter = ({}: ParticipantSorterTPropsT) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const Tips = {
    end_date:
      'Participants joining after the event has ended will be routed to your post-event webpage.',
  };
  type Group = {
    name: string;
  };
  const groupsInit: Group[] = [{ name: 'Group A' }];
  const [groups, setGroups] = useState<Group[]>(groupsInit);

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      event_name: 'Mozilla SXSW Exhibition',
      start_date: new Date(),
      start_time: '16:00',
      allow_early_entry: true,
      early_entry_minuts: 20,
    },
    validate,
    onSubmit: (data: FormValues) => {
      onSubmit && onSubmit(data);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('data', data);
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
        <form onSubmit={formik.handleSubmit}>
          <div className={`primary-card mb-45 ${styles.card}`}>
            <div className={styles.card_section}>
              <h1 className="heading-lg mb-44">Configure an Event</h1>
              <h2 className="heading-sm mb-16">Event Details</h2>

              <Input
                classProp="mb-24"
                placeholder="Event Name"
                name="event_name"
                label="Event Name"
                id="event_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.event_name}
              />

              {/* START TIMES */}
              <div className="flex mb-24">
                <DatePicker
                  onChange={(e) => {
                    formik.setFieldValue('start_date', e);
                  }}
                  selected={formik.values.start_date}
                  startDate={formik.values.start_date}
                  name="start_date"
                  id="start_date"
                  customInput={
                    <Input
                      onChange={formik.handleChange}
                      placeholder="Start Date"
                      name="start_date"
                      label="Start Date"
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.start_time}
                />
              </div>

              {/* EARLY ENTRY  */}
              <div className="flex-align-start mb-12">
                <Checkbox
                  classProp="content-box ml-13 mr-12 flex-start"
                  checked={true}
                  onChange={() => {}}
                />

                <div className={styles.select_md}>
                  <Select
                    classProp={styles.select_md}
                    label="Allow Early Entry"
                    name="early_entry"
                    id="early_entry"
                    value={30}
                    options={[
                      { title: '30 Minuts', value: '30' },
                      { title: '35 Minuts', value: '35' },
                    ]}
                  />
                </div>
              </div>

              {/* END TIMES  */}
              <div className="flex">
                <DatePicker
                  selected={startDate}
                  onChange={(e) => {
                    formik.setFieldValue('end_date', e);
                  }}
                  startDate={startDate}
                  customInput={
                    <>
                      <ToolTip
                        description={Tips.end_date}
                        classProp={styles.tip}
                      />
                      <Input
                        placeholder="End Date"
                        name="end_date"
                        label="End Date"
                        id="end_date"
                        value=""
                      />
                    </>
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
                Participants entering an event will be sorted into room groups,
                composed of one at least one room URL. Groups add up the user
                count of its rooms to determine total capacity before accepting
                new participants. Room groups allow event hosts to better
                distribute pariticpants across a large, multi-room event,
                lowering the likelihood that some rooms will be quite crowded
                while others are nearly empty. For more information on Room
                Groups, review this documentation.
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
                classProp="mt-12"
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
                value="https://quackweek.myhubs.net/events/Mozilla-SXSW-Exhibition"
              />
            </div>
            <div className="flex-justify-end p-40">
              <Button label="create event" text="create event" />
            </div>
          </div>
        </form>
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
