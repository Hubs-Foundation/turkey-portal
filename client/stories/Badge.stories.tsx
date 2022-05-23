import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Badge from '../components/shared/Badge/Badge'

export default {
  title: 'Example/Badge',
  component: Badge,
  argTypes: {
    category: {
      control: {
        type: 'select', options: ['primary', 'secondary']
      }
    }
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

// PRIMARY BADGE 
export const Primary = Template.bind({})
Primary.args = {
  name: 'Primary',
  category: 'primary'
}

// SECONDARY BADGE 
export const Secondary = Template.bind({})
Secondary.args = {
  name: 'Secondary',
  category: 'secondary'
}