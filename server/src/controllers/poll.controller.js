import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {generatePollCode} from "../utils/pollCodeGenerator.js";
import {generateQRCodeAndUpload} from "../utils/qrCodeGenerator.js";
import { Poll } from "../models/poll.model.js";

const createPoll = asyncHandler(async (req, res)=>{
    // Fetch the poll data from body
    const {title, options, isMultipleChoice, isPublicResult, expiresAt} = req.body;

    // Input Validation
    
    // generate poll code of the poll
    const pollCode = generatePollCode();

    // generate and upload Qr code of the poll in cloudinary
    const pollUrl = `${process.env.FRONTEND_URL}/vote/${pollCode}`;
    const pollqr = await generateQRCodeAndUpload(pollUrl);

    // Create entry of poll in db
    const poll = await Poll.create({
        title,
        options,
        isMultipleChoice,
        isPublicResult,
        expiresAt,
        pollCode,
        qrUrl : pollqr,
        createdBy: req.user._id
    })

    if(!poll){
        throw new ApiError(500, "Something went wrong while creating the poll");
    }
        
    // return the user with poll code and Qr code
    return res.status(201).json(
        new ApiResponse(201, poll, "Poll created successfully")
    )
})

const getPollByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const poll = await Poll.findOne({ pollCode: code }).select(
    "-voters -createdBy -__v"
  );

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  // Return options without vote counts
  const strippedOptions = poll.options.map(opt => ({
    text: opt.text
  }));

  const response = {
    _id: poll._id,
    title: poll.title,
    options: strippedOptions,
    pollCode: poll.pollCode,
    qrUrl: poll.qrUrl,
    isMultipleChoice: poll.isMultipleChoice,
    isPublicResult: poll.isPublicResult,
    expiresAt: poll.expiresAt,
    createdAt: poll.createdAt,
  };

  res.status(200).json(new ApiResponse(200, response, "Poll fetched successfully"));
});

const getPollResults = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const poll = await Poll.findOne({ pollCode: code }).select("options title");

  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);

  const results = poll.options.map(opt => ({
    text: opt.text,
    votes: opt.votes || 0,
    percentage: totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(1) : "0.0"
  }));

  res.status(200).json(
    new ApiResponse(200, {
      title: poll.title,
      totalVotes,
      results
    }, "Live results fetched successfully")
  );
});

const deletePoll = asyncHandler(async (req, res) => {
  const { code } = req.params;

  // Find poll
  const poll = await Poll.findOne({ pollCode: code });
  if (!poll) {
    throw new ApiError(404, "Poll not found");
  }

  // Check ownership
  if (!poll.createdBy || poll.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this poll");
  }

  // Delete poll
  await Poll.deleteOne({ _id: poll._id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Poll deleted successfully"));
});

export{
    createPoll,
    getPollByCode,
    getPollResults,
    deletePoll
}