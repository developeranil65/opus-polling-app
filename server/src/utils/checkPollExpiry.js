import { ApiError } from "./ApiError.js";

export function checkPollExpiry(poll) {
  if (poll.expiresAt && new Date(poll.expiresAt) < new Date()) {
    throw new ApiError(403, "Poll has expired");
  }
}
