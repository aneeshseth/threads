import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId, ref: "users"
  }]
}, {
    timestamps: true
});

const Chats = mongoose.models.chats || mongoose.model("chats", chatSchema);

export default Chats;