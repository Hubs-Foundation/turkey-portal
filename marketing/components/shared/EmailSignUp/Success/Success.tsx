import styles from './Success.module.scss';
import Image from 'next/image';
import cone from '../../../../public/cone.png';

const Success = () => {
  return (
    <section className={styles.success_wrapper}>
      <div className="flex-box">
        <h3>You&apos;re on the list</h3>
        <Image src={cone} width={100} height={100} alt="celebrate" />
      </div>
    </section>
  );
};

export default Success;
