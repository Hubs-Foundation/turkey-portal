import axios, { AxiosRequestHeaders } from 'axios';
import { PUBLIC_API_SERVER } from 'config';

const API_PATH = '/api/v1/account';

/**
 * Get Account
 * Must be called within a try catch
 * @returns Account:AccountT{}
 */
export const getAccount = async (headers?: AxiosRequestHeaders) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;

  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, config)
    .then((response) => {
      return response.data;
    });
};

/**
 * Log User Out
 * Must be called in a try catch
 * @returns
 */
export const logOut = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}/logout`, { withCredentials: true })
    .then((response) => {
      return response.data;
    });
};
