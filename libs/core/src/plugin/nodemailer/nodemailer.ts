import nodemailer from 'nodemailer';
require('dotenv').config();

export const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: process.env.SMTP_HOST as unknown as string, // Your SMTP server hostname
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465, // SMTP port (default: 587 for TLS, 465 for SSL)
  secure: process.env.SMTP_SECURE.toLowerCase() === 'true' ? true : false, // Set to true if you're using SSL
  auth: {
    user: process.env.SMTP_EMAIL, // SMTP username
    pass: process.env.SMTP_PASSWORD, // SMTP password
  },
});
