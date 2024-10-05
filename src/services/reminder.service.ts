import Reminders from "../classes/Reminder";

class ReminderService {
  private readonly reminders: Reminders;

  constructor() {
    this.reminders = new Reminders();
  }

  save(data: any) {
    return this.reminders.saveReminder(data);
  }

  getAll() {
    return this.reminders.getAllReminders();
  }

  updateStatus(id: number, status: string) {
    return this.reminders.updateReminderStatus(id, status);
  }
}

const reminderServiceInstance = new ReminderService();

export default reminderServiceInstance;
