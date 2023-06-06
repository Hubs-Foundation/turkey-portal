import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
const API_PATH = '/api/v1/subscription';
import { CurrencyAbbrev } from 'types/Countries';
import { PUBLIC_API_SERVER } from 'config';

export type SubscriptionT = {
  currency: CurrencyAbbrev;
  amount: string;
  subscriptionEndTimestampS: number;
  isCancelled: boolean;
};

/**
 * Get Subplat Subscription Data
 * @returns Subscription:SubscriptionT{}
 */
export const getSubscription = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;

  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, config)
    .then((response: AxiosResponse) => {
      return response.data as SubscriptionT;
    });
};
