import axios, { AxiosRequestHeaders } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { CookiesE } from 'types/Cookies';
import { removeCookies } from 'cookies-next';
import { AccountT } from 'types/General';

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
      response.data.planName = 'professional';
      // response.data.planName = 'personal';
      // response.data.planName = 'starter';
      return response.data as AccountT;
    });
};

/**
 * Log User Out
 * Must be called in a try catch
 * @returns
 */
export const logOut = async () => {
  removeCookies(CookiesE.TurkeyAuthToken);

  return axios
    .get(`${PUBLIC_API_SERVER}/api/v1/logout`, { withCredentials: true })
    .then((response) => response.data);
};
