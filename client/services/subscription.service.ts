import axios, { AxiosRequestHeaders } from 'axios';
const API_PATH = 'TODO';
import { PUBLIC_API_SERVER } from 'config';

export type SubscriptionT = {
  nextPayment: string;
  endOfCycle: string;
};

/**
 * Get Account
 * @returns Account:AccountT{}
 */
export const getSubscription = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;

  // What is the best struct here .. TODO!!!
  const mockDate = {
    nextPayment: 'February 14',
    endOfCycle: 'February 12, 2023',
  };

  return mockDate;

  // try {
  //   return axios.get(`${PUBLIC_API_SERVER}${API_PATH}`, config).then((response) => {
  //     return response.data;
  //   });
  // } catch (error) {
  //   // TODO: Make game plan for error handling
  //   console.error('Error', error);
  // }
};
