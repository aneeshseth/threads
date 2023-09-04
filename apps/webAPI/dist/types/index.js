"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatingMessages = exports.gettingMessages = exports.creatingChat = exports.followThisUser = exports.actualThreadType = exports.userCommentingType = exports.userLikingThreadType = exports.threadType = exports.tokenType = exports.userType = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    profile_pic: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.string()
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.userType = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    _id: zod_1.z.string(),
    profile_pic: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.string()
});
exports.tokenType = zod_1.z.object({
    username: zod_1.z.string(),
    id: zod_1.z.string()
});
exports.threadType = zod_1.z.object({
    thread: zod_1.z.string().max(140),
    userId: zod_1.z.string()
});
exports.userLikingThreadType = zod_1.z.object({
    threadId: zod_1.z.string(),
    userId: zod_1.z.string()
});
exports.userCommentingType = zod_1.z.object({
    threadId: zod_1.z.string(),
    comment: zod_1.z.string(),
    userId: zod_1.z.string()
});
exports.actualThreadType = zod_1.z.object({
    thread: zod_1.z.string(),
    userId: zod_1.z.string()
});
exports.followThisUser = zod_1.z.object({
    userToFollow: zod_1.z.string()
});
exports.creatingChat = zod_1.z.object({
    user1: zod_1.z.string(),
    user2: zod_1.z.string()
});
exports.gettingMessages = zod_1.z.object({
    chatId: zod_1.z.string()
});
exports.creatingMessages = zod_1.z.object({
    userId: zod_1.z.string(),
    content: zod_1.z.string(),
    chatId: zod_1.z.string(),
});
