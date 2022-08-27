import axios, { AxiosRequestHeaders } from 'axios';
import { API_SERVER } from 'config';

const API_PATH = '/api/v1/account';

/**
 * Get Account
 * @returns Account:AccountT{}
 */
export const getAccount = async (
  headers?: AxiosRequestHeaders
) => {
  const credentials = { withCredentials: true };
  const contextHeaders = { headers: { ...(headers as AxiosRequestHeaders) } };
  const config = headers ? contextHeaders : credentials;

  try {
    return axios.get(`${API_SERVER}${API_PATH}`, config).then((response) => {
      return response.data;
    });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error in getAccount()', error);
  }
};

/**
 * Log User Out
 * @returns
 */
export const logOut = async () => {
  try {
    return axios
      .get(`${API_SERVER}/logout`, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);
  }
};
