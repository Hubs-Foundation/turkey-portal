import { Button, ButtonCategoriesE, Input } from '@mozilla/lilypad';
import { useContext, useMemo, useState } from 'react';
import RoomBuilder from '../RoomBuilder/RoomBuilder';
import Select from '@Shared/Select/Select';
import styles from './GroupBuilder.module.scss';
import ToolTip from '@Shared/ToolTip/ToolTip';
import { useFormik } from 'formik';
import validate, { FormValues } from './validate';

const Tips = {
  max_capacity:
    'Participants will be added to this room group until max capacity is reached.',
  refilling_threshold:
    'After being filled to max capacity, this group will not accept any new participants until its user count falls below this threshold.',
};

type GroupBuilderPropsT = {
  title: string;
  canDelete?: boolean;
  onDeleteGroup: Function;
  classProp?: string;
};

const GroupBuilder = ({
  title,
  canDelete = true,
  onDeleteGroup,
  classProp = '',
}: GroupBuilderPropsT) => {
  type Room = {
    title: string;
    url: string;
    baseUrl: string;
  };
  const MockBaseUrl = 'hubs.mozilla.com/******/';
  const groupsInit: Room[] = [
    { title: 'Room 1', url: 'quack-room', baseUrl: MockBaseUrl },
  ];
  const [rooms, setRooms] = useState<Room[]>(groupsInit);

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      max_capacity: 70,
      refilling_threshold: 20,
    },
    validate,
    onSubmit: (data: FormValues) => {
      onSubmit && onSubmit(data);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };
  const handleDeleteGroup = () => {
    typeof onDeleteGroup === 'function' && onDeleteGroup();
  };
  const onDeleteRoom = () => {
    setRooms((state) => {
      const updateRooms = [...state];
      updateRooms.pop();
      return updateRooms;
    });
  };

  const onAddRoomClick = () => {
    setRooms((state) => {
      const updateGroups = [
        ...state,
        {
          title: `Room ${rooms.length + 1}`,
          url: 'I-generated',
          baseUrl: MockBaseUrl,
        },
      ];
      return updateGroups;
    });
  };

  return (
    <section className={`${styles.wrapper} ${classProp}`}>
      <div className="flex-justify-between flex-align-center mb-24">
        <h2 className="heading-sm">{title}</h2>
        {canDelete && (
          <Button
            label="delete group"
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            onClick={handleDeleteGroup}
            classProp={styles.close_button}
            icon="x"
          />
        )}
      </div>

      <div className="flex mb-24">
        <div className="relative">
          <ToolTip classProp={styles.tip_a} description={Tips.max_capacity} />
          <Select
            classProp={`${styles.select_md} mr-20-dt`}
            label="Max Capacity"
            name="max_capacity"
            id="max_capacity"
            onChange={formik.handleChange}
            value={formik.values.max_capacity}
            options={[
              { title: '70', value: '70' },
              { title: '80', value: '80' },
            ]}
          />
        </div>

        <div className="relative">
          <ToolTip
            classProp={styles.tip_b}
            description={Tips.refilling_threshold}
          />
          <Select
            classProp={styles.select_md}
            label="Refilling Threshold"
            name="refilling_threshold"
            id="refilling_threshold"
            onChange={formik.handleChange}
            value={formik.values.refilling_threshold}
            options={[
              { title: '20', value: '20' },
              { title: '30', value: '30' },
            ]}
          />
        </div>
      </div>

      <div>
        <p className="mb-24">ROOMS</p>

        {rooms.map((room, i) => {
          return (
            <RoomBuilder
              key={i}
              canDelete={i + 1 === rooms.length && i !== 0}
              classProp="mb-24"
              url={room.url}
              title={room.title}
              baseUrl={room.baseUrl}
              onDeleteRoom={onDeleteRoom}
            />
          );
        })}
      </div>
      <div className="flex-end">
        <Button
          text="Add Room"
          label="add room"
          onClick={onAddRoomClick}
          category={ButtonCategoriesE.PRIMARY_OUTLINE}
          icon="plus"
        />
      </div>
    </section>
  );
};

export default GroupBuilder;
