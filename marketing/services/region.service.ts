import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/region';
import getEnvVariable from 'config';
import { RegionT } from 'types/Countries';

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
      if (!response.data.code === null) response.data.code = 'US';
      return response.data as RegionT;
    });
};
