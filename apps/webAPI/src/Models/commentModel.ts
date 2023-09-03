import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    comment: {
        type: String,
    },
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'threads',
    }
});

const Comments = mongoose.models.comments || mongoose.model("comments", commentSchema);

export default Comments;