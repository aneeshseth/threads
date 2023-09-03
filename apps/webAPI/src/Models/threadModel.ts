import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    thread: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});

const Threads = mongoose.models.threads || mongoose.model("threads", threadSchema);

export default Threads;