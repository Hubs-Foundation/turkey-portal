/**
 * Form Related Types
 */

export type RadioGroupOptionT = {
  value: number | string
  id: string
  label: string
  groupName: string
}

export type InputT = 'text' | 'password' | 'email' | 'number' | 'tel'

export type ButtonT = 'button' | 'submit' | 'reset'

export enum ButtonCategoriesE {
  primary = 'primary',
  secondary = 'secondary',
}
