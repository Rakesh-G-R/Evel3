import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

