import { NextFunction, Request, Response } from "express";
import Reminder from "../services/reminder.service";

export async function saveReminder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reminder = await Reminder.save(req.body);
    res.status(200).json({ message: "Reminder saved successfully", reminder });
  } catch (err: any) {
    next(err);
  }
}

export async function getAllReminders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reminders = await Reminder.getAll();
    res.status(200).json({ reminders });
  } catch (err: any) {
    next(err);
  }
}

export async function updateReminderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.params;

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID" });
    }

    const updatedReminder = await Reminder.updateStatus(id, status);
    res.status(200).json({
      message: "Reminder status updated successfully",
      updatedReminder,
    });
  } catch (err: any) {
    next(err);
  }
}
