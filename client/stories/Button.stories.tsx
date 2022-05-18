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
        type: 'select', options: [ButtonCategoriesE.primary, ButtonCategoriesE.secondary]
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
  category: ButtonCategoriesE.primary
}

// SECONDARY BUTTON 
export const Secondary = Template.bind({})
Secondary.args = {
  text: 'Secondary',
  category: ButtonCategoriesE.secondary
}

// OUTLINE BUTTON 
export const Outline = Template.bind({})
Outline.args = {
  text: 'Outline',
  category: ButtonCategoriesE.outline
}

// OUTLINE BUTTON 
export const Icon = Template.bind({})
Icon.args = {
  text: 'Icon',
  category: ButtonCategoriesE.primary,
  icon: 'star'
}