import Reminders from "../classes/Reminder";
import { PriorityQueue } from "../classes/PriorityQueue";
import { Reminder } from "../models/reminder.model";

class ReminderService {
  private readonly reminders: Reminders;
  private readonly queue: PriorityQueue;

  constructor() {
    this.reminders = new Reminders();
    this.queue = new PriorityQueue();
  }

  async save(data: any) {
    await this.reminders.saveReminder(data);
    this.queue.enqueue(data);
  }

  getAll() {
    return this.reminders.getAllReminders();
  }

  updateStatus(id: number, status: string) {
    return this.reminders.updateReminderStatus(id, status);
  }

  enqueue(reminder: Reminder) {
    // Prevent duplicates in the queue
    if (!this.queue.contains(reminder)) {
      this.queue.enqueue(reminder);
    }
  }

  processReminders() {
    const now = new Date();
    let nextReminder = this.queue.peek();

    while (nextReminder && nextReminder.scheduledTime <= now) {
      nextReminder = this.queue.dequeue();

      if (nextReminder) {
        // Send reminder logic here
        console.log(`Sending reminder to: ${nextReminder.recipientEmail}`);

        // Update the status to "sent"
        nextReminder.status = "sent";

        // You could also update the reminder in your database here
        this.updateStatus(nextReminder.id, nextReminder.status);
      }
    }
  }
}

const reminderServiceInstance = new ReminderService();

export default reminderServiceInstance;
