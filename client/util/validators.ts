
export const requiredValidator = (value: string | number | readonly string[] | undefined) => {
  const stringValue = value?.toString()
  return stringValue?.length
}