"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserThreads = exports.getAllThreads = exports.getUserFollowingThreads = exports.createComment = exports.unlikeThread = exports.likeThread = exports.createThreads = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const commentModel_1 = __importDefault(require("../Models/commentModel"));
const threadModel_1 = __importDefault(require("../Models/threadModel"));
const index_1 = require("../types/index");
function createThreads(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.headers["userId"];
            const body = req.body;
            const inputValidation = index_1.threadType.safeParse(body);
            if (!inputValidation.success)
                return res.status(400).json({ msg: 'invalid input' });
            const { thread } = body;
            const addThread = new threadModel_1.default({
                thread: thread,
                userId: userId,
                likes: [],
                comments: []
            });
            const addedThread = yield addThread.save();
            const user = yield userModel_1.default.findById(userId);
            user.threads.push(addThread._id);
            yield user.save();
            return res.status(200).json({ msg: "thread created", thread: addedThread });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createThreads = createThreads;
function likeThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.headers["userId"];
            const body = req.body;
            const inputValidation = index_1.userLikingThreadType.safeParse(body);
            if (!inputValidation.success)
                return res.status(400).json({ msg: 'invalid input' });
            const { threadId } = req.body;
            const findThread = yield threadModel_1.default.findById(threadId);
            findThread.likes.push(userId);
            yield findThread.save();
            return res.status(200).json({ msg: 'Thread liked successfully', findThread });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.likeThread = likeThread;
function unlikeThread(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.headers["userId"];
            const body = req.body;
            const inputValidation = index_1.userLikingThreadType.safeParse(body);
            if (!inputValidation.success)
                return res.status(400).json({ msg: 'invalid input' });
            const { threadId } = req.body;
            const findThread = yield threadModel_1.default.findById(threadId);
            findThread.likes = findThread.likes.filter((like) => like.toString() !== userId);
            yield findThread.save();
            return res.status(200).json({ msg: 'Thread unliked successfully', findThread });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.unlikeThread = unlikeThread;
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.headers["userId"];
            const body = req.body;
            const inputValidation = index_1.userCommentingType.safeParse(body);
            if (!inputValidation.success)
                return res.status(400).json({ msg: 'invalid input' });
            const { comment, threadId } = req.body;
            const addComment = new commentModel_1.default({
                threadId: threadId,
                comment: comment,
                userId: userId
            });
            const addedComment = yield addComment.save();
            const findThread = yield threadModel_1.default.findById(threadId);
            findThread.comments.push(addedComment._id);
            yield findThread.save();
            return res.status(200).json({ msg: 'Thread commented on successfully', findThread });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createComment = createComment;
function getUserFollowingThreads(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.headers["userId"];
            const user = yield userModel_1.default.findById(userId);
            const promises = user.following.map((followingUserId) => __awaiter(this, void 0, void 0, function* () {
                const getThreadsOfFollowing = yield threadModel_1.default.find({ userId: followingUserId });
                return getThreadsOfFollowing;
            }));
            const result = yield Promise.all(promises);
            const flattenedThreads = result.flat();
            return res.status(200).json({ threads: flattenedThreads });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUserFollowingThreads = getUserFollowingThreads;
function getAllThreads(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allThreads = yield threadModel_1.default.find({});
            return res.status(200).json({ threads: allThreads });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getAllThreads = getAllThreads;
function getUserThreads(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userUsername } = req.body;
            const userData = yield userModel_1.default.find({ username: userUsername }).populate('threads');
            return res.status(200).json({ data: userData });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUserThreads = getUserThreads;
