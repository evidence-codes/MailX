import express from "express";
import {
  getAllReminders,
  saveReminder,
  updateReminderStatus,
} from "../controllers/reminder.controller";

const router = express.Router();

router.post("/", saveReminder);
router.get("/", getAllReminders);
router.put("/:id/status/:status", updateReminderStatus);

export default router;
