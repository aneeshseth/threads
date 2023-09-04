"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "threads"
        }],
    following: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "users"
        }],
    followers: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "users"
        }],
    chats: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "chats"
        }]
});
const User = mongoose_1.default.models.users || mongoose_1.default.model("users", userSchema);
exports.default = User;
