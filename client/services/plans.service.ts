import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
const API_PATH = '/api/v1/plans';
import { PUBLIC_API_SERVER } from 'config';

/**
 * POST subscribe to Starter plan
 */
export const postStarterPlan = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;

  return axios
    .post(`${PUBLIC_API_SERVER}${API_PATH}`, { plan: 'starter' }, config)
    .then((response: AxiosResponse) => {
      return response.data;
    });
};
