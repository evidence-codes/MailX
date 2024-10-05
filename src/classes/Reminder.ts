import { AppDataSource } from "../config/data-source";
import { Reminder } from "../entities/Reminders";

const reminderRepository = AppDataSource.getRepository(Reminder);

export default class Reminders {
  async saveReminder(reminder: Reminder) {
    try {
      await reminderRepository.save(reminder);
      console.log("Reminder saved successfully");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error saving reminder:", err.message);
        throw new Error(err.message);
      }
    }
  }
}
