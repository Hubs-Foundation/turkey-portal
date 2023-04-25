import nodemailer from 'nodemailer';
import { NewContactT } from 'types';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * About this APi
 *
 * This api is used to send emails from "hubs-sales@mozilla.com" to business
 * email (TODO recieve email) as a proxy for the user. Business can then
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

  const {
    name,
    email,
    organization,
    country,
    subject,
    activity,
    message,
  }: NewContactT = req.body;
  const html = `<div> 
  <h1>New Contact Inquiry</h1>
  <ul>
  <li>Name: ${name}</li>
  <li>Email: ${email}</li>
  <li>Organizaion: ${organization}</li>
  <li>Country Code: ${country}</li>
  <li>Subject: ${subject}</li>
  <li>Activity: ${activity}</li>
  <li>Message: ${message}</li>
  </ul>
  </div>`;

  const mail = {
    from: 'agrego@mozilla.com',
    to: 'enterprise-hubs@mozilla.com',
    subject: `From ${email}`,
    text: 'Inquiry',
    html: html,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'agrego@mozilla.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        res.status(404).json({
          message: `Connection refused at ${err.message}`,
          status: 404,
        });
        reject();
      } else {
        res.status(200).json({
          message: `Message delivered to ${info.accepted}`,
          status: 200,
        });
        resolve();
      }
    });
  });
}
