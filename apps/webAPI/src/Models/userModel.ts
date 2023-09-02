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
  }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;