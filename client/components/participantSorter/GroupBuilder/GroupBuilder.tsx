import { Button, ButtonCategoriesE, Input } from '@mozilla/lilypad';
import { useContext, useMemo, useState } from 'react';
import RoomBuilder from '../RoomBuilder/RoomBuilder';
import Select from '@Shared/Select/Select';
import styles from './GroupBuilder.module.scss';

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
  const MockBaseUrl = 'https://kateshub.myhubs.net/oTtoifq/';
  const groupsInit: Room[] = [
    { title: 'Room 1', url: 'cool-site', baseUrl: MockBaseUrl },
  ];
  const [rooms, setRooms] = useState<Room[]>(groupsInit);

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
        <Select
          classProp={`${styles.select_md} mr-20-dt`}
          label="Max Capacity"
          name="max_capacity"
          id="max_capacity"
          value="test"
          options={[
            { title: '70', value: '70' },
            { title: '80', value: '80' },
          ]}
        />
        <Select
          classProp={styles.select_md}
          label="Refilling Threshold"
          name="refilling_threshold"
          id="refilling_threshold"
          value="test"
          options={[
            { title: '20', value: '20' },
            { title: '30', value: '30' },
          ]}
        />
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
