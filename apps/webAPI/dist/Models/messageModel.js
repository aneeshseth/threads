"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    sender: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "users" },
    message: {
        type: String
    },
    chatId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "chats" },
}, {
    timestamps: true
});
const Messages = mongoose_1.default.models.messages || mongoose_1.default.model("messages", messageSchema);
exports.default = Messages;
