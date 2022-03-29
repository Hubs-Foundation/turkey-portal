export function format(value) {
  return typeof value === "number" ? value.toLocaleString() : value;
}
