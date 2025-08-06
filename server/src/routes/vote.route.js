import express from "express";
import { votePoll } from "../controllers/vote.controller.js";

const router = express.Router();

// public vote route
router.post("/:pollCode/vote", votePoll);

export default router;