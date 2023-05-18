type BlobIconProps = {
  classProp?: string;
  size?: number;
};

const BlobIcon = ({ classProp = '', size = 36 }: BlobIconProps) => {
  return (
    <svg
      width={size}
      className={classProp}
      height={size}
      viewBox="0 0 36 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.467049 8.63446V24.3423C0.467049 29.111 4.4039 32.9768 9.26022 32.9768H9.26601C14.1223 32.9768 17.9453 29.062 17.9453 24.2934L18.0592 16.4884V8.63446C18.0592 3.86578 14.1223 0 9.26601 0L9.26022 0C4.4039 0 0.467049 3.86578 0.467049 8.63446Z"
        fill="url(#paint0_linear_96_477)"
      />
      <path
        d="M17.9452 24.2876L17.9453 24.2934C17.9453 29.062 21.7682 32.9278 26.6245 32.9278H26.6303C31.4866 32.9278 35.4235 29.062 35.4235 24.2934V24.2876C35.4235 19.519 31.4866 15.6532 26.6303 15.6532H26.6245C21.7682 15.6532 17.9452 19.519 17.9452 24.2876Z"
        fill="url(#paint1_linear_96_477)"
      />
      <path
        d="M17.9454 24.1508L18.0022 17.6099C18.0022 17.6099 18.1161 20.8524 20.1657 18.5044C20.2227 19.0076 17.9454 24.1508 17.9454 24.1508Z"
        fill="url(#paint2_linear_96_477)"
      />
      <path
        d="M18.3425 22.8092C18.3425 22.8092 14.8642 27.5495 16.9775 28.2878C17.0344 28.2319 17.8884 26.2194 18.9132 28.2877C19.0838 27.8099 18.3425 22.8092 18.3425 22.8092Z"
        fill="url(#paint3_linear_96_477)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_96_477"
          x1="35.4163"
          y1="47.1636"
          x2="12.1113"
          y2="-12.8301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9898FF" />
          <stop offset="0.904121" stopColor="#6AE1D9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_96_477"
          x1="35.4163"
          y1="47.1636"
          x2="12.1113"
          y2="-12.8301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9898FF" />
          <stop offset="0.904121" stopColor="#6AE1D9" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_96_477"
          x1="35.4163"
          y1="47.1636"
          x2="12.1113"
          y2="-12.8301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9898FF" />
          <stop offset="0.904121" stopColor="#6AE1D9" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_96_477"
          x1="35.4163"
          y1="47.1636"
          x2="12.1113"
          y2="-12.8301"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9898FF" />
          <stop offset="0.904121" stopColor="#6AE1D9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BlobIcon;
