"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users',
    },
    comment: {
        type: String,
    },
    threadId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'threads',
    }
});
const Comments = mongoose_1.default.models.comments || mongoose_1.default.model("comments", commentSchema);
exports.default = Comments;
