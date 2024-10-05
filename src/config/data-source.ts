import "reflect-metadata";
import { DataSource } from "typeorm";
import { Reminder } from "../entities/Reminders";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Database host (change if needed)
  port: 5432, // Default PostgreSQL port
  username: "admin", // Replace with your PostgreSQL username
  password: "admin123", // Replace with your PostgreSQL password
  database: "mailx", // Replace with your PostgreSQL database name
  synchronize: true, // Set to false in production (use migrations instead)
  logging: false,
  entities: [Reminder], // Add your entities here
  migrations: [],
  subscribers: [],
});

// Initialize the connection
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization", err);
//   });
