import express, { Express } from "express";
import { initializeDatabase } from "./config/db.config";
import ReminderRoutes from "./routes/reminder.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cron from "node-cron";
import Reminder from "./services/reminder.service";

const app: Express = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(errorHandler);

// routes
app.use("/reminders", ReminderRoutes);

// cron job
cron.schedule("* * * * *", async () => {
  console.log("Processing reminders...");
  await Reminder.processReminders();
});

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
