import axios, { AxiosResponse } from 'axios';
import { NewContactT } from 'types';
const EMAIL_PATH = '/api/email';

export type EmailResponseT = {
  message: string;
  status: number;
};

/**
 * Send Email via internal NextJs api
 * @param contact
 * @returns Promise<EmailResponseT>
 */
export const sendEmail = async (
  contact: NewContactT
): Promise<EmailResponseT> => {
  return axios.post(EMAIL_PATH, contact).then((response: AxiosResponse) => {
    return response.data;
  });
};
