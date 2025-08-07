import { Router } from "express";
import { createPoll } from "../controllers/poll.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getPollByCode } from "../controllers/poll.controller.js";
import { getPollResults } from "../controllers/poll.controller.js";

const router = Router();

router.get("/:code", getPollByCode);
router.get("/:code/results", getPollResults);

// secured routes
router.route("/").post(verifyJWT, createPoll);

export default router;