import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  }, 
  profile_pic: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  threads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "threads"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  chats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "chats"
  }]
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;