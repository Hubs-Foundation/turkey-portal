import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
const API_PATH = '/api/v1/subscription';
import { PUBLIC_API_SERVER } from 'config';

export type SubscriptionT = {
  currency: string | null;
  amount: string | null;
  subscriptionEndTimestampS: number;
  isCancelled: boolean;
};

/**
 * Get Subplate Subscription Data
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
