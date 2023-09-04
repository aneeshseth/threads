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
exports.createMessage = exports.getChatMessages = exports.getChatsForSidebar = exports.createChat = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const chatModel_1 = __importDefault(require("../Models/chatModel"));
const messageModel_1 = __importDefault(require("../Models/messageModel"));
const types_1 = require("../types");
function createChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const inputValidation = types_1.creatingChat.safeParse(body);
        if (!inputValidation.success)
            return res.sendStatus(403);
        const { user1, user2 } = req.body;
        const addChat = new chatModel_1.default({
            users: [user1, user2]
        });
        const addedChat = yield addChat.save();
        const findUserOne = yield userModel_1.default.findById(user1);
        const findUserTwo = yield userModel_1.default.findById(user2);
        findUserOne.chats.push(addedChat._id);
        findUserTwo.chats.push(addedChat._id);
        yield findUserOne.save();
        yield findUserTwo.save();
        return res.status(200).json({ msg: "user created", user: addedChat });
    });
}
exports.createChat = createChat;
function getChatsForSidebar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.headers["userId"];
        const user = yield userModel_1.default.findById(userId).populate('chats');
        const populatedChats = yield userModel_1.default.populate(user.chats, { path: 'users' });
        console.log(populatedChats);
        return res.status(200).json({ chats: populatedChats });
    });
}
exports.getChatsForSidebar = getChatsForSidebar;
function getChatMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const inputValidation = types_1.gettingMessages.safeParse(body);
        if (!inputValidation.success)
            return res.sendStatus(403);
        const { chatId } = body;
        const getMessages = yield messageModel_1.default.find({ chatId: chatId });
        return res.status(200).json({ messages: getMessages });
    });
}
exports.getChatMessages = getChatMessages;
function createMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const inputValidation = types_1.creatingMessages.safeParse(body);
        if (!inputValidation.success)
            return res.sendStatus(403);
        const { userId, content, chatId } = body;
        const addMessage = new messageModel_1.default({
            sender: userId,
            message: content,
            chatId: chatId
        });
        const addedMessage = yield addMessage.save();
        return res.status(200).json({ msg: "message created", message: addedMessage });
    });
}
exports.createMessage = createMessage;
