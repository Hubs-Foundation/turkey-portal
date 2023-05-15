import { ReactNode, useState } from 'react';
import Head from 'next/head';
import { RadioButton } from '@mozilla/lilypad-ui';
import styles from './Sandbox.module.scss';
type SandboxPropsT = {};
import Flag from '@Shared/Flag/Flag';
import RadioRow from '@Shared/RadioRow/RadioRow';
import ButtonToggle, {
  ButtonToggleOptionsT,
} from '@Shared/ButtonToggle/ButtonToggle';

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

  const options: ButtonToggleOptionsT[] = [
    {
      label: 'Label 1',
      value: 'label_1',
    },
    {
      label: 'Label 2',
      value: 'label_2',
    },
    {
      label: 'Label 3',
      value: 'label_3',
    },
  ];

  const [value, setValue] = useState('label_1');
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleToggleClick = (value: string | number) => {
    console.log('you clicked', value);
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        <h1>Sandbox</h1>
        <div className="p-80">
          <div className="p-40">
            <ButtonToggle options={options} onClick={handleToggleClick} />
          </div>
          <form>
            <fieldset id="sb_radio" onChange={onChange}>
              {radioFormOptions.map((option, i) => {
                return (
                  <RadioRow
                    key={i}
                    currentValue={value}
                    option={option}
                    icon={<Flag country="DE" classProp="ml-16" />}
                    contentRight={
                      <span className="body-md">GDPR Compliant</span>
                    }
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
