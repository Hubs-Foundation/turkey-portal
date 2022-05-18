import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from '../components/shared/Input/Input'
import Form from '../components/shared/Form/Form'

const initialValues = {
  firstName: 'Dr.Duck',
}

export default {
  title: 'Example/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => {
  return (
    <Form
      submit={() => { }}
      initialValues={initialValues}>
      <Input {...args} />
    </Form>
  )
}

// LIGHT INPUT
export const Light = Template.bind({})
Light.args = {
  label: 'First Name',
  name: 'firstName',
  type: 'text',
  info: 'Aditional Input Information'
}