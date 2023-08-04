import styles from './Legacy.module.scss';
import Image from 'next/image';
import hubDuck from 'public/hub_duck.svg';

const Legacy = () => (
  <section className={styles.wrapper}>
    <div className={styles.container}>
      <Image src={hubDuck} width={100} height={100} alt="Hub Yellow Duck" />
      <div className={styles.content}>
        <h4>Looking for your old rooms?</h4>
        <a className="primary-link" href="/demo">
          visit the legacy hubs.mozilla.com site
        </a>
      </div>
    </div>
  </section>
);

export default Legacy;
