import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/region';
import getEnvVariable from 'config';
import { RegionCodeT } from 'types/Countries';

export type RegionObjT = {
  region: RegionCodeT;
};

/**
 * Get Region Of User
 * @returns RegionT
 */
export const getRegion = async () => {
  return axios
    .get(`${getEnvVariable('PUBLIC_API_SERVER')}${API_PATH}`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data as RegionObjT;
    });
};
