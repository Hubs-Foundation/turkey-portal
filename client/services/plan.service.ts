import axios from 'axios';
import { PUBLIC_API_SERVER } from 'config';

const PLANS_API_PATH = `${PUBLIC_API_SERVER}/api/v1/plans`;

type PostReturnDataT = { status: 'created' } | { error: 'already started' };

/**
 * Must be encompassed in try/catch
 * @returns {"status": "created"} | throws an error
 */
export const postStarterPlan = async (): Promise<PostReturnDataT> => {
  return axios
    .post(
      PLANS_API_PATH,
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

/**
 * Must be encompassed in try/catch
 * @returns {"status": "created"} | error
 */
export const getPlan = async () => {
  return axios
    .get(PLANS_API_PATH, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
