import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/region';
import { PUBLIC_API_SERVER } from 'config';
import { RegionsT } from 'types/Countries';

export type RegionObjT = {
  region: RegionsT;
};

/**
 * Get Region Of User
 * @returns RegionT
 */
export const getRegion = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, { withCredentials: true })
    .then((response: AxiosResponse) => {
      return response.data as RegionObjT;
    });
};
