import { Router } from "express";
import { createPoll } from "../controllers/poll.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes
router.route("/").post(verifyJWT, createPoll);

export default router;