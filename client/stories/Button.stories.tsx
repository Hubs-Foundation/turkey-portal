import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ButtonCategoriesE } from '../types/Form'
import Button from '../components/shared/Button/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    category: {
      control: {
        type: 'select', options: [ButtonCategoriesE.PRIMARY_SOLID, ButtonCategoriesE.SECONDARY_SOLID, ButtonCategoriesE.PRIMARY_OUTLINE]
      }
    }
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />


// PRIMARY BUTTON 
export const Primary = Template.bind({})
Primary.args = {
  text: 'Primary',
  category: ButtonCategoriesE.PRIMARY_SOLID
}

// SECONDARY BUTTON 
export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Secondary',
  category: ButtonCategoriesE.SECONDARY_SOLID
}

// OUTLINE BUTTON 
export const Outline = Template.bind({})
Outline.args = {
  text: 'Outline',
  category: ButtonCategoriesE.PRIMARY_OUTLINE
}

// OUTLINE BUTTON 
export const Icon = Template.bind({})
Icon.args = {
  text: 'Icon',
  category: ButtonCategoriesE.PRIMARY_SOLID,
  icon: 'star'
}

// DISABLED BUTTON 
export const Disabled = Template.bind({})
Disabled.args = {
  text: 'Disabled',
  category: ButtonCategoriesE.PRIMARY_SOLID,
  disabled: true
}