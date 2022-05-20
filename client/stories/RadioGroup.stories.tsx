import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import RadioGroup from '../components/shared/RadioGroup/RadioGroup'
import Form from '../components/shared/Form/Form'

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
  }
]

const initialValues = {
  example: 'label_1'
}

export default {
  title: 'Example/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>

const Template: ComponentStory<typeof RadioGroup> = (args) => {
  return (
    <Form
      submit={() => { }}
      initialValues={initialValues}>
      <RadioGroup {...args} />
    </Form>
  )
}

// LIGHT RADIOGROUP
export const Light = Template.bind({})
Light.args = {
  options: radioFormOptions,
  name: 'example',
}