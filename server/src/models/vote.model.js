import {Schema, model} from "mongoose"

const voteSchema = new Schema(
	{
		poll: {
            type: Schema.Types.ObjectId,
            ref: 'Poll'
        },
        selectedOptions: [String], // option text or index

        voterIP: String,

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null // anonymous voting supported
        }
	}, 
	{timestamps: true}
)

export const Vote = model("Vote", voteSchema)