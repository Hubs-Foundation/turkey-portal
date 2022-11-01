import qs from 'qs';

const BASKET_URL = 'https://basket.mozilla.org';
const SUBSCRIBE = '/news/subscribe/';
const UNSUBSCRIBE = '/news/unsubscribe/';

/**
 * For more information about the subsription API go basket documentation
 * https://basket.readthedocs.io/newsletter_api.html#news-subscribe
 */

export type BasketResponseT = {
  ok: boolean;
  status: number;
  statusText: string;
};

export type BasketBodyT = {
  email: string;
  format: string;
  newsletters: string;
  lang: string;
  source_url: string;
};

/**
 * Subscribe a new email
 * Must be called within a try catch
 * @returns BasketResponseT
 */
export const subscribe = async (body: BasketBodyT) => {
  const url = BASKET_URL + SUBSCRIBE;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(body),
  }).then((resp) => resp);
};
