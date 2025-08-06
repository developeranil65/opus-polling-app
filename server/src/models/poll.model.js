import {Schema, model} from "mongoose"

const pollSchema = new Schema(
	{
		title: {
            type: String,
            required: true,
            trim: true
        },
        options: [{
            text: { type: String, required: true },
            votes: { type: Number, default: 0 }
            }
        ],
        pollCode: {
            type: String,
            unique: true,
            required: true,
        },
        qrUrl: {
            type: String,
        },
        isMultipleChoice: {
            type: Boolean,
            default: false
        },
        isPublicResult: {
            type: Boolean,
            default: true
        },
        expiresAt: {
            type: Date,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        voters: [{
            ip: String, // or deviceHash or cookieHash
        }]
	}, 
	{timestamps: true}
)

export const Poll = model("Poll", pollSchema)