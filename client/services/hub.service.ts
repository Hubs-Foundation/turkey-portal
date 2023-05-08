import axios, { AxiosResponse } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { UpdateHubT } from 'types/General';
const API_PATH = '/api/v1/hubs';

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
) => {
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
export const updateHub = async (hubId: string, hub: UpdateHubT) => {
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
