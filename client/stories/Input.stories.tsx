import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '../components/shared/Input/Input';

const initialValues = {
  firstName: 'Dr.Duck',
};

export default {
  title: 'Example/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <form>
      <Input {...args} value={initialValues.firstName} />
    </form>
  );
};

// LIGHT INPUT
export const Light = Template.bind({});
Light.args = {
  label: 'First Name',
  name: 'firstName',
  type: 'text',
  info: 'Additional Input Information',
  required: true,
};
