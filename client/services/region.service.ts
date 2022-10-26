import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/region';
import { PUBLIC_API_SERVER } from 'config';

export type RegionT = {
  region: string | null;
};

/**
 * Get Region Of User
 * @returns RegionT
 */
export const getRegion = async () => {
  try {
    return axios
      .get(`${PUBLIC_API_SERVER}${API_PATH}`, { withCredentials: true })
      .then((response: AxiosResponse) => {
        return response.data as RegionT;
      });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);
  }
};
