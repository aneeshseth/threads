"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenType = exports.userType = exports.loginInput = exports.signupInput = void 0;
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
