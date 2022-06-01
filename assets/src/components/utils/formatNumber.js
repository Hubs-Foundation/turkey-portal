export function formatNumber(num) {
  return typeof num === "number" ? num.toLocaleString(undefined, { maximumSignificantDigits: 1 }) : num;
}
export function formatMegabytes(mb) {
  if (mb === null) return "-";
  if (mb < 1000) {
    return mb.toFixed(0) + "MB";
  } else {
    return (mb / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 }) + "GB";
  }
}
