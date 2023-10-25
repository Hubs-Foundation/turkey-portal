import axios, { AxiosResponse } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { PlansE } from 'types/General';
const API_PATH = '/api/v1/qa';

/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const submitPlam = async (plan: PlansE) => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}?plan=${plan}`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    });
};
