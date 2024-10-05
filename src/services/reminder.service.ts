import Reminders from "../classes/Reminder";
import { PriorityQueue } from "../classes/PriorityQueue";
import { Reminder } from "../models/reminder.model";
import { sendMail } from "../utils/emailHelper";

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
    console.log(`Saved and enqueued reminder: ${JSON.stringify(data)}`);
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
      console.log(`Enqueued reminder: ${JSON.stringify(reminder)}`);
    }
  }

  async processReminders() {
    const now = new Date().getTime(); // Get the current time in milliseconds
    console.log(`Processing reminders at: ${new Date(now).toISOString()}`);

    let nextReminder = this.queue.peek(); // Peek at the next reminder
    console.log(`Next reminder: ${JSON.stringify(nextReminder)}`);

    // Use a while loop to process all reminders that are due
    while (
      nextReminder &&
      new Date(nextReminder.scheduledTime).getTime() <= now
    ) {
      console.log(`Processing reminder: ${JSON.stringify(nextReminder)}`);

      // Dequeue the next reminder
      const reminderToSend = this.queue.dequeue();
      console.log(`Dequeued reminder: ${JSON.stringify(reminderToSend)}`);

      if (reminderToSend) {
        const message = {
          to: reminderToSend.recipientEmail,
          subject: reminderToSend.subject,
          body: reminderToSend.body,
        };

        console.log(
          `Preparing to send reminder to: ${reminderToSend.recipientEmail} with subject: ${reminderToSend.subject}`
        );

        try {
          // Attempt to send the email
          await sendMail(message);
          console.log(`Sent reminder to: ${reminderToSend.recipientEmail}`);

          // Update status to "sent"
          reminderToSend.status = "sent";
          await this.updateStatus(reminderToSend.id, reminderToSend.status);
        } catch (error) {
          // Log error and mark the status as "failed"
          console.error(
            `Failed to send reminder to ${reminderToSend.recipientEmail}:`,
            error
          );
          reminderToSend.status = "failed";
          await this.updateStatus(reminderToSend.id, reminderToSend.status);
        }
      }

      // Log queue length after each dequeue
      console.log(`Queue length: ${this.queue.length}`);

      // Peek the next reminder for the next iteration
      nextReminder = this.queue.peek();
      console.log(`Next reminder: ${JSON.stringify(nextReminder)}`);
    }

    // If no reminders are left, log that information
    if (!nextReminder) {
      console.log("No more reminders to process.");
    }
  }
}

const reminderServiceInstance = new ReminderService();

export default reminderServiceInstance;
