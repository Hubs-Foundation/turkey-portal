import axios from 'axios';
import { PUBLIC_API_SERVER } from 'config';

/**
 * Must be encompassed in try/catch
 * @returns {"status": "created"} | error
 */
export const postStarterPlan = async () => {
  return axios
    .post(
      `${PUBLIC_API_SERVER}/api/v1/plans`,
      {
        tier: 'starter',
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const getPlan = async () => {
  return axios
    .get(`${PUBLIC_API_SERVER}/api/v1/plans`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
