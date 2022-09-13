import styles from './TitleDescription.module.scss';

type TitleDescriptionPropsT = {
  title?: string;
  description?: string;
  classProp?: string;
};

const TitleDescription = ({
  title,
  description,
  classProp = '',
}: TitleDescriptionPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default TitleDescription;
