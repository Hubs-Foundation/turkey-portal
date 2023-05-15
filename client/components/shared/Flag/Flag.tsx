type IconPropsT = {
  country: 'DE' | 'US';
  width?: number;
  classProp?: string;
};

const Flag = ({ width = 32, country, classProp = '' }: IconPropsT) => {
  return (
    <svg className={classProp} width={width} fill="none" viewBox="0 0 32 24">
      {country === 'DE' && (
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 16H32V24H0V16Z"
            fill="#FFD018"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8H32V16H0V8Z"
            fill="#E31D1C"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H32V8H0V0Z"
            fill="#272727"
          />
        </g>
      )}
    </svg>
  );
};

export default Flag;
