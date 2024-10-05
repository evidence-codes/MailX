import { AppDataSource } from "./config/data-source";
import { Reminder } from "./entities/reminder.entity";

export default async function seedDatabase() {
  const reminderRepository = AppDataSource.getRepository(Reminder);

  const reminders = [
    {
      recipientEmail: "example1@mail.com",
      subject: "First Reminder",
      body: "This is the first reminder.",
      scheduledTime: new Date(Date.now() + 3600 * 1000), // 1 hour from now
    },
    {
      recipientEmail: "example2@mail.com",
      subject: "Second Reminder",
      body: "This is the second reminder.",
      scheduledTime: new Date(Date.now() + 7200 * 1000), // 2 hours from now
    },
  ];

  for (const reminder of reminders) {
    await reminderRepository.save(reminder);
  }
  console.log("Database seeded with initial reminder data.");
}
