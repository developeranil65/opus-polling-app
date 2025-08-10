import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Poll } from "../models/poll.model.js";
import { Vote } from "../models/vote.model.js";

const votePoll = asyncHandler(async (req, res) => {
  const { pollCode } = req.params;
  const { selectedOptions } = req.body;

  // Get IP
  const voterIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Validate request
  if (!Array.isArray(selectedOptions) || selectedOptions.length === 0) {
    throw new ApiError(400, "selectedOptions must be a non-empty array");
  }

  // Find poll
  const poll = await Poll.findOne({ pollCode });
  if (!poll) throw new ApiError(404, "Poll not found");

  // Check poll expiry
  // if (poll.expiresAt && new Date(poll.expiresAt) < new Date()) {
  //   throw new ApiError(403, "Poll has expired");
  // }

  checkPollExpiry(poll);

  // Validate selected options
  const validOptionTexts = poll.options.map(opt => opt.text);
  for (const option of selectedOptions) {
    if (!validOptionTexts.includes(option)) {
      throw new ApiError(400, `Invalid option: ${option}`);
    }
  }

  if (!poll.isMultipleChoice && selectedOptions.length > 1) {
    throw new ApiError(400, "This poll does not allow multiple selections");
  }

  // Prevent duplicate vote from same IP
  const alreadyVoted = poll.voters.find(voter => voter.ip === voterIP);
  if (alreadyVoted) {
    throw new ApiError(403, "You have already voted in this poll");
  }

  // Record vote
  await Vote.create({
    poll: poll._id,
    selectedOptions,
    voterIP,
    user: req.user ? req.user._id : null
  });

  // Increment vote counts
  for (let option of poll.options) {
    if (selectedOptions.includes(option.text)) {
      option.votes = (option.votes || 0) + 1;
    }
  }

  // Track voter
  poll.voters.push({ ip: voterIP });

  // Save updated poll
  await poll.save();

  return res
    .status(200)
    .json(new ApiResponse(200, poll, "Vote submitted successfully"));
});

export { votePoll };
