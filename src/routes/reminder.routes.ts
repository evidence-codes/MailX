import express from "express";
import {
  getAllReminders,
  saveReminder,
  updateReminderStatus,
} from "../controllers/reminder.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReminderDto } from "../dtos/reminder.dto";

const router = express.Router();

router.post("/", validationMiddleware(CreateReminderDto), saveReminder);
router.get("/", getAllReminders);
router.put("/:id/status/:status", updateReminderStatus);

export default router;
