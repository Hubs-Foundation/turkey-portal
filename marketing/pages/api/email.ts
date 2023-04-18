import nodemailer from 'nodemailer';

export default function handler(req, res) {
  console.log('hit');
  const message = {
    from: 'ngrato@gmail.com',
    to: 'ngrato@mozilla.com',
    subject: 'test',
    text: 'test',
    html: `<p>this is a test!</p>`,
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ngrato@gmail.com',
      pass: 'upbxsqbfjjwucmhy',
    },
  });

  transporter.sendMail(message, (err, info) => {
    if (err) {
      res.status(404).json({
        error: `Connection refused at ${err.message}`,
      });
    } else {
      res.status(250).json({
        success: `Message delivered to ${info.accepted}`,
      });
    }
  });
}
