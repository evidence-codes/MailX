import { Request, Response } from "express";
import Reminder from "../services/Reminder.service";

export async function saveReminder(req: Request, res: Response) {
  try {
    const reminder = await Reminder.save(req.body);
    res.status(200).json({ message: "Reminder saved successfully", reminder });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllReminders(req: Request, res: Response) {
  try {
    const reminders = await Reminder.getAll();
    res.status(200).json({ reminders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
