"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    users: [{
            type: mongoose_1.default.Schema.Types.ObjectId, ref: "users"
        }]
}, {
    timestamps: true
});
const Chats = mongoose_1.default.models.chats || mongoose_1.default.model("chats", chatSchema);
exports.default = Chats;
