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
    const pollUrl = `${process.env.CORS_ORIGIN}/api/v1/votes/${pollCode}/vote`
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
        
    // return the user with poll code and Qr code;
    return res.status(201).json(
        new ApiResponse(201, poll, "Poll created successfully")
    )
})

export{
    createPoll
}