import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP not configured, skipping email');
    return;
  }
  await mailer.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
}
