import { Button, ButtonCategoriesE, Input } from '@mozilla/lilypad';
import { useContext, useMemo, useState } from 'react';
import styles from './GroupBuilder.module.scss';

type GroupBuilderPropsT = {
  classProp?: string;
};

const GroupBuilder = ({ classProp = '' }: GroupBuilderPropsT) => {
  return (
    <section className={styles.wrapper}>
      <h2 className="heading-sm mb-24">Group A</h2>
      <div className="flex"></div>
      <div className="flex-end">
        <Button
          text="Add Room"
          label="add room"
          category={ButtonCategoriesE.PRIMARY_OUTLINE}
          icon="plus"
        />
      </div>
    </section>
  );
};

export default GroupBuilder;
