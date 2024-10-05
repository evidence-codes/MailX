import express from "express";
import {
  getAllReminders,
  saveReminder,
} from "../controllers/reminder.controller";

const router = express.Router();

router.post("/", saveReminder);
router.get("/", getAllReminders);
router.put("/:id");

export default router;
