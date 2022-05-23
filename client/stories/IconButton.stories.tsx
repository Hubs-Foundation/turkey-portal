import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import IconButton from '../components/shared/IconButton/IconButton'

export default {
  title: 'Example/IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />

// PRIMARY ICON BUTTON 
export const Primary = Template.bind({})
Primary.args = {
  icon: 'feather'
}