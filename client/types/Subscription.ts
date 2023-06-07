import { SubscriptionT } from 'services/subscription.service';
import { convertCurrency } from 'util/utilities';
import { CurrencyAbbrev } from 'types/Countries';

export default class Subscription {
  amount: string | null;
  currency: CurrencyAbbrev | null;
  subscriptionEndTimestampS: number;
  isCancelled: boolean;

  constructor({
    amount,
    currency,
    subscriptionEndTimestampS,
    isCancelled,
  }: SubscriptionT) {
    this.amount = amount;
    this.currency = currency;
    this.subscriptionEndTimestampS = subscriptionEndTimestampS;
    this.isCancelled = isCancelled;
  }

  getFormattedDate(fullDate: boolean): string {
    const date = new Date(Date.UTC(1970, 0, 1)); // Epoch
    const options: Intl.DateTimeFormatOptions = {
      year: fullDate ? 'numeric' : undefined,
      month: 'long',
      day: 'numeric',
    };
    date.setUTCSeconds(this.subscriptionEndTimestampS);

    // TODO : Tech Debt - when adding localization be sure to update this date format country code
    return date.toLocaleDateString('US', options);
  }

  getCurrencySymbol(): string | undefined {
    return convertCurrency(this.currency);
  }

  /* TODO - tech debt localization
  Use something like https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat 
  or i18next to localize the price here - check with backend if they are already formatting anything since currency is being delivered
  with response */
  moneyFormat(): string {
    return Number(this.amount).toFixed(2);
  }
}
