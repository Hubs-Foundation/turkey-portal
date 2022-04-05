export function formatNumber(num) {
  return typeof num === "number" ? num.toLocaleString() : num;
}
