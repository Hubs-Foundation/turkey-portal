import styles from './Footer.module.scss';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import Image from 'next/image';
import hubDuck from '../../../public/hub_duck.svg';
import mozillaLogo from '../../../public/mozilla_logo.svg';

type FooterPropsT = {
  classProp?: string;
};

const Footer = ({ classProp = '' }: FooterPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>

        {/* HEADER  */}
        <div className={styles.header}>
          <Image width={100} src={hubDuck} />
          <div className={styles.header_content}>
            <h3>Looking for your legacy rooms?</h3>
            {/* TODO - get link  */}
            <a className={styles.link} href="#">visit legacy/former hubs.mozilla.com site</a>
          </div>
        </div>

        {/* LINKS  */}
        <div className={styles.links_wrapper}>

        </div>

        <div className={styles.border}/>

        {/* LINKS  */}
        <div className={styles.submenu_wrapper}>
          <div>
            <a className={styles.link} href="#">Privacy Policy</a>
            <a className={styles.link} href="#">Turms of Use</a>
          </div>
          <Image width={130} src={mozillaLogo}/>
        </div>

      </div>
    </section>
  );
};

export default Footer;

// {/* Logo */}
// <div className={styles.logo_wrapper}>
// <div className={styles.logo}>hubs</div>
// <BlobIcon />
// </div>
