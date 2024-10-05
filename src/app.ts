import express, { Express } from "express";
import { initializeDatabase } from "./config/db.config";
import ReminderRoutes from "./routes/reminder.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cron from "node-cron";
import Reminder from "./services/reminder.service";
import { sendMail } from "./utils/emailHelper";

const app: Express = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(errorHandler);

// routes
app.post("/email", async (req, res) => {
  try {
    const { recipientEmail, subject, body } = req.body;
    const message = {
      to: recipientEmail,
      subject,
      body,
    };
    await sendMail(message);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err: any) {
    res.status(500).json({ "Failed to send email": err.message });
  }
});
app.use("/reminders", ReminderRoutes);

setInterval(async () => {
  await Reminder.processReminders();
}, 1000);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

// Connect to the database and start the server after successful connection
initializeDatabase()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error(
      "Failed to connect to the database. Server not started.",
      error
    );
  });
