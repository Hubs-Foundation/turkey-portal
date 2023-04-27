import axios, { AxiosResponse } from 'axios';
const API_PATH = '/api/v1/hubs';
import { RoomT } from 'types';
import getEnvVariable from 'config';

/**
 * Create New Room
 * @returns RegionT
 */
export const createRoom = async (sceneId: string) => {
  const body = { hub: { name: 'auto-generated', scene_id: sceneId } };

  const data = await axios
    .post(`${getEnvVariable('BASE_URL')}${API_PATH}`, body)
    .then(({ data }: AxiosResponse) => data);

  return data as RoomT;
};
