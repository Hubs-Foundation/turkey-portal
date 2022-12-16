import {
  Button,
  ButtonCategoriesE,
  InputIconColorE,
  ButtonSizesE,
  Checkbox,
  Input,
} from '@mozilla/lilypad';
import { useContext, useMemo, useState } from 'react';
import styles from './RoomBuilder.module.scss';
//mike
import ToolTip from '@Shared/ToolTip/ToolTip';
//mikend

type RoomBuilderPropsT = {
  title: string;
  url: string;
  baseUrl: string;
  canDelete?: boolean;
  onDeleteRoom: Function;
  classProp?: string;
};

const RoomBuilder = ({
  title,
  url,
  baseUrl,
  canDelete,
  onDeleteRoom,
  classProp = '',
}: RoomBuilderPropsT) => {
  const handleDeleteRoom = () => {
    typeof onDeleteRoom === 'function' && onDeleteRoom();
  };

  return (
    <section className={`${styles.wrapper} ${classProp}`}>
      <div>
        {canDelete && (
          <Button
            classProp={styles.close_button}
            label="delete group"
            size={ButtonSizesE.SMALL}
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            onClick={handleDeleteRoom}
            icon="x"
          />
        )}
        <Input
          placeholder="url"
          name="url"
          label={title}
          value={url}
          info={baseUrl}
          classProp="mb-12"
          icon="check-circle"
          iconColor={InputIconColorE.SUCCESS}
        />
        <Checkbox
          onChange={() => {}}
          classProp="content-box"
          label="Landing Room"
          checked={true}
        />
        {/* mike */}
        <ToolTip 
          description="landing_room"
        />
        {/* mikend */}
      </div>
    </section>
  );
};

export default RoomBuilder;
