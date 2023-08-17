import axios, { AxiosResponse } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
const API_PATH = '/api/v1/qa';

/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const doCallOrWhatever = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    });
};
