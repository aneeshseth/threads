import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    message: {
        type: String
    },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
}, {
    timestamps: true
});

const Messages = mongoose.models.messages || mongoose.model("messages", messageSchema);

export default Messages;