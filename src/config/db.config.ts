import { AppDataSource } from "./data-source";
// import seedDatabase from "../seed";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
    // await seedDatabase();
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }
};
