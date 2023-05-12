import { ReactNode, useState } from 'react';
import Head from 'next/head';
import { RadioButton } from '@mozilla/lilypad-ui';
import styles from './Sandbox.module.scss';
type SandboxPropsT = {};

/**
 * This modal is used to sandbox code. feel free to play, this will
 * not show up on prod
 */
const Sandbox = ({}: SandboxPropsT) => {
  const radioFormOptions = [
    {
      label: 'Label 1',
      value: 'label_1',
      groupName: 'example',
      id: 'label_1',
    },
    {
      label: 'Label 2',
      value: 'label_2',
      groupName: 'example',
      id: 'label_2',
    },
  ];

  const [value, setValue] = useState('label_1');
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  type RadioRowOptionT = {
    label: string;
    value: string;
    groupName: string;
    id: string;
  };

  type RadioRowT = {
    option: RadioRowOptionT;
    additional?: ReactNode;
    classProp?: string;
  };
  const RadioRow = ({ option, additional, classProp }: RadioRowT) => {
    return (
      <label htmlFor={option.id}>
        <div
          className={`${styles.wrapper} ${
            option.value === value && styles.active
          } ${classProp}`}
        >
          <RadioButton
            groupValue={value}
            key={option.id}
            label={option.label}
            value={option.value}
            id={option.id}
            groupName={option.groupName}
          />

          <div className={styles.additoinal}>{additional}</div>
        </div>
      </label>
    );
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        <h1>Sandbox</h1>
        <div className="p-80">
          <form>
            <h3>Light Theme - {value}</h3>
            <fieldset id="sb_radio" onChange={onChange}>
              {radioFormOptions.map((option, i) => {
                return (
                  <RadioRow
                    key={i}
                    option={option}
                    additional={<span className="body-md">GDPR Compliant</span>}
                  />
                );
              })}
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Sandbox;

export async function getStaticProps() {
  if (process.env.ENV === 'prod') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
