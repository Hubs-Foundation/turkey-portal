import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Spinner from '../components/shared/Spinner/Spinner'

export default {
  title: 'Example/Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />

// PRIMARY SPINNER 
export const Primary = Template.bind({})
Primary.args = {
  size: 200,
}