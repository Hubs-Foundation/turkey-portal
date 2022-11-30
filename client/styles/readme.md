<!-- GETTING STARTED -->

## Getting Started

This is a helpful document describing how to use some of the useful features in the style folder. Including utility classes, mixins etc..

### Utility Classes

The utility class provided here should not dominate the JSX className. These are intended to be used sparingly and/or when only a few utlity classes are needed and the provided classes do the trick.

#### Margin and Padding

These classes are used for fast margin or padding with aditional mobile/tablet responsive behavior. Any size from 0-100 is available and any number number in that threshold should work in this pattern

- Key
  m = margin
  p = padding
  t = top
  r = right
  b = bottom
  l = left
  mb = mobile
  dt = desktop

- Pattern
  { attribute }{ direction }-{ size }-{ mobile or desktop }

Say you want a class with margin right 20px, the class would look like '.mr-20'. Let's say you wanted
that 20px to only display on mobile the class would be '.mr-20-mb'.
