import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '../components/shared/Dropdown/Dropdown';
import Button from '../components/shared/Button/Button';

export default {
  title: 'Example/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);
const CtaExample = <Button text="CTA" />;
const ContentExample = <div style={{ padding: '10px' }}>Dropdown Content</div>;

// LIGHT DROPDOWN
export const Light = Template.bind({});
Light.args = {
  cta: CtaExample,
  content: ContentExample,
};
