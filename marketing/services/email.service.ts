import axios, { AxiosResponse } from 'axios';
import { NewContactT } from 'types';
const EMAIL_PATH = '/api/email';

export type EmailResponseT = {
  message: string;
  status: number;
};

export const sendEmail = async (contact: NewContactT) => {
  return axios.post(EMAIL_PATH, contact).then((response: AxiosResponse) => {
    return response.data as EmailResponseT;
  });
};
