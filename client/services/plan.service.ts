import axios from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { AcceptedRegionCodeT } from 'types/Countries';
import { planDataT } from 'types/General';
const PLANS_API_PATH = `${PUBLIC_API_SERVER}/api/v1/plans`;

type PostReturnDataT = { status: 'created' } | { error: 'already started' };

/**
 * Must be encompassed in try/catch
 * @returns {"status": "created"} | throws an error
 */
export const postStarterPlan = async () => {
  return axios
    .post(
      PLANS_API_PATH,
      {},
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      return response.data as PostReturnDataT;
    });
};

export const getPlanData = async (region: AcceptedRegionCodeT) => {
  return axios.get(`/api/plans?region=${region}`).then((response) => {
    return response.data as planDataT;
  });
};
