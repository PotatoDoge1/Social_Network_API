import { Schema, Types, type Document } from "mongoose";

interface IReaction extends Document {
    username: String,
    reactionId: Schema.Types.ObjectId,
    reactionContent: String,
    createdAt: Schema.Types.Date
}

const reactionSchema = new Schema<IReaction>(
    {
        username: {
            type: String,
            required: true
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionContent: {
            type: String,
            required: true,
            maxlength: 140
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        },
        timestamps: true,
        id: false
    }
);

export default reactionSchema;