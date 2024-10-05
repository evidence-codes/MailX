export interface Reminder {
  id: number;
  recipientEmail: string;
  subject: string;
  body: string;
  scheduledTime: Date;
  status: string;
}
