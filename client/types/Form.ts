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
  PRIMARY_SOLID = 'primarySolid',
  PRIMARY_OUTLINE = 'primaryOutline',
  PRIMARY_CLEAR = 'primaryClear',
  SECONDARY_SOLID = 'secondarySolid',
  SECONDARY_OUTLINE = 'secondaryOutline',
  SECONDARY_CLEAR = 'secondaryClear',
}

export enum ButtonSizesE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
