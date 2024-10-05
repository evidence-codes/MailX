import client from "../config/mailgun-config";
import dotenv from "dotenv";

dotenv.config();

const domain = process.env.MAILGUN_DOMAIN || "";
const sender = `${process.env.MAILGUN_SENDER_NAME} <${process.env.MAILGUN_SENDER_EMAIL}>`;

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export async function sendMail({ to, subject, body }: EmailData) {
  const message = {
    from: sender,
    to,
    subject,
    html: body,
  };

  return client.messages.create(domain, message);
}
