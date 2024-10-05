import Reminders from "../classes/Reminder";

class ReminderService {
  private readonly reminders: Reminders;

  constructor() {
    this.reminders = new Reminders();
  }

  save(data: any) {
    return this.reminders.saveReminder(data);
  }
}

const reminderServiceInstance = new ReminderService();

export default reminderServiceInstance;
