"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const threadSchema = new mongoose_1.default.Schema({
    thread: {
        type: String,
        required: true
    },
    likes: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'users',
        }],
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'comments'
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
});
const Threads = mongoose_1.default.models.threads || mongoose_1.default.model("threads", threadSchema);
exports.default = Threads;
