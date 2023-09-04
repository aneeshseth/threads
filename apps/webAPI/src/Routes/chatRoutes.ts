import express from 'express'
import { createChat, createMessage, getChatMessages, getChatsForSidebar } from '../Controllers/chatsController';
import { verify } from '../Middleware/verify';
const router = express.Router()

router.post("/create_chat", createChat)
router.get("/get_sidebar_chats", verify, getChatsForSidebar)
router.post("/get_messages",  getChatMessages)
router.post("/create_messages", createMessage)

export default router;