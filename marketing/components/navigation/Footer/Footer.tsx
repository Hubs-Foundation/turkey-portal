import styles from './Footer.module.scss';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';

type FooterPropsT = {
  classProp?: string;
};

const Footer = ({ classProp = '' }: FooterPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo_wrapper}>
          <div className={styles.logo}>hubs</div>
          <BlobIcon />
        </div>
        footer
      </div>
    </section>
  );
};

export default Footer;
