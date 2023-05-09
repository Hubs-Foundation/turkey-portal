import styles from './ErrorBox.module.scss';
import Image from 'next/image';
import critical from '../../../public/critical.png';

type ErrorBoxPropsT = {
  title: string;
  body: string;
  classProp?: string;
};

const ErrorBox = ({ title, body, classProp = '' }: ErrorBoxPropsT) => {
  return (
    <section className={`${styles.error_wrapper} ${classProp}`}>
      <div className="mr-10">
        <Image src={critical} width={30} height={30} alt="warning" />
      </div>
      <div>
        <h3 className="heading-xs mb-12">{title}</h3>
        <p className="body-md">{body}</p>
      </div>
    </section>
  );
};

export default ErrorBox;
