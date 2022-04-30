export function formatNumber(num) {
  return typeof num === "number" ? num.toLocaleString(undefined, { maximumSignificantDigits: 1 }) : num;
}
