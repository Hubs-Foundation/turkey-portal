import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dot_pulse}></div>
    </div>
  );
};

export default Loader;
