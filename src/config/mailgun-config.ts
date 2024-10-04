import formData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";

dotenv.config();

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || "";

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY, // Replace with your Mailgun API key
});

export default mg;
