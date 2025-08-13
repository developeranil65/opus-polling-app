import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.set('trust proxy', true);

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({
    extended: true, 
    limit: "16kb"
}));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from './routes/user.route.js';
import pollRouter from './routes/poll.route.js';
import voteRouter from './routes/vote.route.js';

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/polls", pollRouter);
app.use("/api/v1/votes", voteRouter);

app.use("*", (req , res) => {
  new ApiError(404, "Route not found");
});

// Exporting the app to server.js
export {app};