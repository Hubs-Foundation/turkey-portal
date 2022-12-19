import { useState, useCallback } from 'react';
import {
  Button,
  ButtonCategoriesE,
  InputIconColorE,
  ButtonSizesE,
  Checkbox,
  Input,
} from '@mozilla/lilypad';
import styles from './RoomBuilder.module.scss';
import ToolTip from '@Shared/ToolTip/ToolTip';
import { useFormik } from 'formik';
import validate, { FormValues } from './validate';

const Tips = {
  landing_room:
    "Once sorted into a room group, participants will randomly populate any rooms specified as a 'Landing Room'. At least one room must be designated per group.",
};

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
  const [isLandingRoom, setIsLandingRoom] = useState<boolean>(true);

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      room_url: url,
    },
    validate,
    onSubmit: (data: FormValues) => {
      onSubmit && onSubmit(data);
    },
  });

  const onToggleEarlyEntry = useCallback((value: boolean) => {
    setIsLandingRoom(value);
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log('data', data);
  };

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
          name="room_url"
          label={title}
          onChange={formik.handleChange}
          id="room_url"
          onBlur={formik.handleBlur}
          value={formik.values.room_url}
          info={baseUrl}
          classProp="mb-12"
          icon="check-circle"
          iconColor={InputIconColorE.SUCCESS}
        />
        <div className="flex-align-center">
          <Checkbox
            onChange={onToggleEarlyEntry}
            classProp="content-box"
            label="Landing Room"
            checked={isLandingRoom}
          />
          <ToolTip classProp="mb-12 ml-5" description={Tips.landing_room} />
        </div>
      </div>
    </section>
  );
};

export default RoomBuilder;
