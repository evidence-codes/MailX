import express from "express";
import { saveReminder } from "../controllers/reminder.controller";

const router = express.Router();

router.post("/", saveReminder);
router.get("/");
router.put("/:id");

export default router;
