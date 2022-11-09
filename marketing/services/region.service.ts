import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/region';
import { PUBLIC_API_SERVER } from 'configV2';

export type RegionT = {
  region: string | null;
};

/**
 * Get Region Of User
 * @returns RegionT
 */
export const getRegion = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, { withCredentials: true })
    .then((response: AxiosResponse) => {
      return response.data as RegionT;
    });
};
