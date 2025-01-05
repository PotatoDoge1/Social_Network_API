import { Schema, model, type Document } from "mongoose";
import reactionSchema from './Reactions.js';

interface IThought extends Document {
    username: string,
    thoughtContent: string,
    createdAt: Schema.Types.Date,
    reactions: [typeof reactionSchema]
}

const thoughtSchema = new Schema<IThought>(
    {
        username: {
            type: String,
            required: true
        },
        thoughtContent: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 140
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            //getters: true
        },
            timestamps: true,
            id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

export default Thoughts;