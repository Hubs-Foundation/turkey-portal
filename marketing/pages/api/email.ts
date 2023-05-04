import { NewContactT } from 'types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { addContact } from 'services/google.service';
import { sendEmail } from 'services/mailer.service';

/**
 * About this APi
 *
 * This api is used to send emails from "hubs-sales@mozilla.com" to enterprise-hubs@mozilla.com
 * as a proxy for the user. Business can then
 * respond to the email the user provided in the form.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Only accept post req
   */
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const newContact: NewContactT = req.body;

  return new Promise<void>((resolve, reject) => {
    try {
      const emailPromise = sendEmail(newContact);
      const sheetsPromise = addContact(newContact);
      return Promise.all([emailPromise, sheetsPromise]).then((values) => {
        let isFailed = false;
        values.forEach(({ status }) => {
          if (status !== 200) isFailed = true;
        });

        isFailed
          ? res.status(401).json({
              status: 401,
            })
          : res.status(200).json({
              status: 200,
            });

        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
