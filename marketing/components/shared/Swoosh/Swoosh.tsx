import styles from './Swoosh.module.scss';

type SwooshPropsT = {
  location?: 'top' | 'bottom';
  classProp?: string;
};

const Swoosh = ({ location = 'top', classProp = '' }: SwooshPropsT) => {
  return (
    <div className={`${styles[`swoosh_${location}`]} ${classProp}`}>
      <svg viewBox="0 70 500 60" preserveAspectRatio="none">
        <rect x="0" y="0" width="500" height="500" fill="transparent" />
        <path
          d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
  );
};

export default Swoosh;
