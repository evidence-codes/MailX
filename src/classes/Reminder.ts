import { AppDataSource } from "../config/data-source";
import { Reminder } from "../entities/reminder.entity";

const reminderRepository = AppDataSource.getRepository(Reminder);

export default class Reminders {
  async saveReminder(reminder: Reminder) {
    try {
      const savedReminder = await reminderRepository.save(reminder);
      console.log("Reminder saved successfully");
      return savedReminder;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error saving reminder:", err.message);
        throw new Error(err.message);
      }
    }
  }

  async getAllReminders() {
    try {
      const reminders = await reminderRepository.find();
      return reminders;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error getting reminders:", err.message);
        throw new Error(err.message);
      }
    }
  }

  async updateReminderStatus(id: number, status: string) {
    try {
      const updatedReminder = await reminderRepository.update(
        { id },
        { status }
      );
      return updatedReminder;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error updating reminder status:", err.message);
        throw new Error(err.message);
      }
    }
  }
}
