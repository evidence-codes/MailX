import express, { Express } from "express";
import { initializeDatabase } from "./config/db.config";
import ReminderRoutes from "./routes/reminder.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app: Express = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(errorHandler);

app.use("/reminders", ReminderRoutes);

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
