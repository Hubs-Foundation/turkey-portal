import React from 'react';
import { useTabletUp } from 'hooks/useMediaQuery';
import MainNav from '@Navigation/MainNav/MainNav';
import SideNav from '@Navigation/SideNav/SideNav';
import styles from './MainLayout.module.scss';

type MainLayoutPropsT = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutPropsT) => {
  const tabletUp = useTabletUp();

  return (
    <div>
      <MainNav />
      <section className={styles.page_wrapper}>
        {tabletUp ? <SideNav /> : ''}
        {children}
      </section>
    </div>
  );
};

export default MainLayout;
