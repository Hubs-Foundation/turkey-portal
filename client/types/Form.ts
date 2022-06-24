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
  PRIMARY_SOLID = 'primary_solid',
  PRIMARY_OUTLINE = 'primary_outline',
  PRIMARY_CLEAR = 'primary_clear',
  SECONDARY_SOLID = 'secondary_solid',
  SECONDARY_OUTLINE = 'secondary_outline',
  SECONDARY_CLEAR = 'secondary_clear',
}

export enum ButtonSizesE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
