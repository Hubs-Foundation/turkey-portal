import styles from './TitleDescription.module.scss';
import { TitleDescriptionT } from 'types';

interface TitleDescriptionPropsI extends TitleDescriptionT {
  classProp?: string;
}

const TitleDescription = ({
  title,
  description,
  classProp = '',
}: TitleDescriptionPropsI) => {
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
