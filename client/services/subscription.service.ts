import axios, { AxiosRequestHeaders } from 'axios';
const API_PATH = 'TODO';
import { API_SERVER } from 'config';

export type SubscriptionT = {
  next_payment: string;
};

/**
 * Get Account
 * @returns Account:AccountT{}
 */
export const getSubscriptions = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;


  // What is the best struct here .. TODO!!!
  const mockDate = {
    next_payment: 'Februaru 14',
  };

  return mockDate;

  // try {
  //   return axios.get(`${API_SERVER}${API_PATH}`, config).then((response) => {
  //     return response.data;
  //   });
  // } catch (error) {
  //   // TODO: Make game plan for error handling
  //   console.error('Error', error);
  // }
};



