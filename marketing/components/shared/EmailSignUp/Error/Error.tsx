import styles from './Error.module.scss';
import Image from 'next/image';
import critical from '../../../../public/critical.png';

const Error = () => {
  return (
    <section className={styles.error_wrapper}>
      <div className="mr-10">
        <Image src={critical} width={30} height={30} alt="warning" />
      </div>
      <div>
        <h3>We ran into a problem</h3>

        <p className={styles.error_body}>
          Sorry, we were unable to add you to the mailing list, please try again
          later. If the problem persists please reach out on our{' '}
          <a
            href="https://discord.com/invite/dFJncWwHun"
            rel="noopener noreferrer"
            className="u-primary-link"
            target="_blank"
          >
            Discord
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Error;
