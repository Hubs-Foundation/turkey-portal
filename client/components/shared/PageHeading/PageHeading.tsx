import styles from './PageHeading.module.scss';

type PageHeadingPropsT = {
  title: string;
  classProp?: string;
};

const PageHeading = ({
  title = 'Page Title',
  classProp = '',
}: PageHeadingPropsT) => {
  return (
    <div className={`${classProp} ${styles.header_wrapper}`}>
      <div className={styles.header_container}>
        <h1 className={styles.header_title}>{title}</h1>
      </div>
    </div>
  );
};

export default PageHeading;
