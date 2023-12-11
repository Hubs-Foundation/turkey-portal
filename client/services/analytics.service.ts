import axios, { AxiosResponse } from 'axios';
import { PUBLIC_API_SERVER } from 'config';
import { TierT } from 'types/General';

const API_PATH = '/api/v1/analytics';

export type HubStat = {
  hubId: string;
  tier: TierT;
};

export const getAnalytics = async (startDate: string, endDate: string) => {
  const path = `/?start_date=${startDate}T00:00:00Z&end_date=${endDate}T00:00:00Z`;

  return axios
    .get(`${PUBLIC_API_SERVER}${API_PATH}${path}`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      return response.data.hubs as HubStat[];
    });
};
