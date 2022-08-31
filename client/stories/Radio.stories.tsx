import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RadioButton from '../components/shared/RadioButton/RadioButton';

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

const initialValues = {
  example: 'label_1',
};

export default {
  title: 'Example/Radio',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => {
  const [value, setValue] = useState(radioFormOptions[0].value);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const [darkValue, setDarkValue] = useState(radioFormOptions[0].value);
  const onDarkChange = (e: any) => {
    setDarkValue(e.target.value);
  };

  return (
    <>
      <main data-theme="light" style={{ padding: '20px' }}>
        <form>
          <h3>Light Theme</h3>
          <fieldset
            id="sb_radio"
            onChange={onChange}
            defaultValue={radioFormOptions[0].value}
          >
            {radioFormOptions.map((option) => {
              return (
                <RadioButton
                  key={option.id}
                  label={option.label}
                  value={option.value}
                  id={option.id}
                  groupName={option.groupName}
                />
              );
            })}
          </fieldset>
        </form>
      </main>

      <main
        data-theme="dark"
        style={{ background: '#000000', padding: '20px' }}
      >
        <form>
          <h3 style={{ color: '#ffffff' }}>Dark Theme</h3>
          <fieldset
            id="sb_dark_radio"
            onChange={onDarkChange}
            defaultValue={radioFormOptions[0].value}
          >
            {radioFormOptions.map((option) => {
              return (
                <RadioButton
                  key={option.id}
                  label={option.label}
                  value={option.value}
                  id={option.id}
                  groupName={option.groupName}
                />
              );
            })}
          </fieldset>
        </form>
      </main>
    </>
  );
};

// LIGHT RADIOGROUP
export const Main = Template.bind({});
// Light.args = {
//   options: radioFormOptions,
//   name: 'example',
// }
