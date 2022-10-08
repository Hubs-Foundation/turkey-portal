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
    .then((response) => response.data)
    .catch((e) => console.error(e));
};

/**
 * Log User Out
 * Must be called in a try catch
 * @returns
 */
export const logOut = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}/api/v1/logout`, { withCredentials: true })
    .then((response) => response.data)
    .catch((e) => console.error(e));
};
