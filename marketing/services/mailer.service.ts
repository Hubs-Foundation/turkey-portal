import nodemailer from 'nodemailer';
import { NewContactT } from 'types';

type ResponseT = {
  status: number;
};

export const sendEmail = async ({
  name,
  email,
  organization,
  country,
  subject,
  activity,
  message,
}: NewContactT): Promise<ResponseT> => {
  const htmlEmail = `<div>
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
    from: 'hubs-sales@mozilla.com',
    to: 'enterprise-hubs@mozilla.com',
    subject: `From ${email}`,
    text: 'Inquiry',
    html: htmlEmail,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hubs-sales@mozilla.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return new Promise<ResponseT>((resolve) => {
    transporter.sendMail(mail, (err) => {
      if (err) {
        console.error(err);
        resolve({ status: 401 });
      } else {
        resolve({ status: 200 });
      }
    });
  });
};
