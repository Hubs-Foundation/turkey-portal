import { CountrieCurrency } from 'types/Countries';

/**
 * Convert abbrev to symbol
 * @param currency
 * @returns
 */
export const convertCurrency = (currency: string | null) => {
  const { US, DE } = CountrieCurrency;
  if (!currency) return;
  switch (currency.toUpperCase()) {
    case DE.abbrev:
      return DE.symbol;
    case US.abbrev:
      return US.symbol;
    default:
      return US.symbol;
  }
};
