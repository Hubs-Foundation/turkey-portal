import nodemailer from 'nodemailer';
import { NewContactT } from 'types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const data: NewContactT = req.body;

  const message = {
    from: 'ngrato@gmail.com',
    to: 'ngrato@mozilla.com',
    subject: `From ${data.email}`,
    text: 'Inquiry',
    html: `<div> 
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>
    <li>Organizaion: ${data.organization}</li>
    <li>Country Code: ${data.country}</li>
    <li>Subject: ${data.subject}</li>
    <li>Activity: ${data.activity}</li>
    <li>Message: ${data.message}</li>
    </ul>
    </div>`,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ngrato@gmail.com',
      pass: 'upbxsqbfjjwucmhy',
    },
  });

  return new Promise<void>((resolve, reject) => {
    transporter.sendMail(message, (err, info) => {
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
