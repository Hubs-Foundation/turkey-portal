import axios, { AxiosResponse } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { HubT } from 'types/General';
const API_PATH = '/api/v1/hubs';

export type validationResponseT = {
  error: string;
  success: boolean;
};

/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const getHubs = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}`, {
      withCredentials: true,
      timeout: 300_000,
    })
    .then((response) => {
      return response.data;
    });
};

/**
 * Get Hub By Id
 * @param hubId string
 * @returns Hub{}
 */
export const getHub = async (hubId: string) => {
  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}/${hubId}`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    });
};

/**
 * Validate Proposed Subdomain
 * @param hubId string
 * @param subdomain string
 * @returns data{}
 */
export const validateHubSubdomain = async (
  hubId: string,
  subdomain: string
): Promise<validationResponseT> => {
  return axios
    .post(
      `${PUBLIC_API_SERVER}${API_PATH}/validate_subdomain`,
      {
        excludedHubId: hubId,
        subdomain: subdomain,
      },
      {
        withCredentials: true,
      }
    )
    .then((response: AxiosResponse) => {
      return response.data;
    });
};

/**
 * TODO: UPDATE AND DELETE
 **/

/**
 * Update Hub By Id
 * @param hubId string
 */

/**
 * Warning: this has been confirmed on the backend, this API only
 * alows you ro update the subdomain, nothing else. Consider renaming
 * this function in the future if no additional values can be changed
 */
export const updateHub = async (hubId: string, hub: HubT) => {
  if (!hub) return;

  return axios
    .patch(`${PUBLIC_API_SERVER}${API_PATH}/${hubId}`, hub, {
      withCredentials: true,
    })
    .then((resp: AxiosResponse) => {
      return resp;
    });
};

/**
 * Delete Hub By Id
 * @param hubId string
 */
export const deleteHub = async (hubId: string) => {};
