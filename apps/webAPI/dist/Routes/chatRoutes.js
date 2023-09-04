"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatsController_1 = require("../Controllers/chatsController");
const verify_1 = require("../Middleware/verify");
const router = express_1.default.Router();
router.post("/create_chat", chatsController_1.createChat);
router.get("/get_sidebar_chats", verify_1.verify, chatsController_1.getChatsForSidebar);
router.post("/get_messages", chatsController_1.getChatMessages);
router.post("/create_messages", chatsController_1.createMessage);
exports.default = router;
