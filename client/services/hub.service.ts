import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/hubs';
import { PUBLIC_API_SERVER } from 'config';
import { UpdateHubT } from 'types/General';

/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const getHubs = async () => {
  try {
    return axios
      .get(`${PUBLIC_API_SERVER}${API_PATH}`, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);
  }
};

/**
 * Get Hub By Id
 * @param hubId string
 * @returns Hub{}
 */
export const getHub = async (hubId: string) => {
  try {
    return axios
      .get(`${PUBLIC_API_SERVER}${API_PATH}/${hubId}`, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        return response.data;
      });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);
  }
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
  try {
    return PUBLIC_API_SERVER.post(
      `${PUBLIC_API_SERVER}${API_PATH}/validate_subdomain`,
      {
        excludedHubId: hubId,
        subdomain: subdomain,
      },
      {
        withCredentials: true,
      }
    ).then((response: AxiosResponse) => {
      return response.data;
    });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);
  }
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
  PUBLIC_API_SERVER;
  try {
    return axios.patch(`${PUBLIC_API_SERVER}${API_PATH}/${hubId}`, hub, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Delete Hub By Id
 * @param hubId string
 */
export const deleteHub = async (hubId: string) => {};
