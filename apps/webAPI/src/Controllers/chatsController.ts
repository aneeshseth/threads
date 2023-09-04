import User from "../Models/userModel";
import Comments from "../Models/commentModel";
import Threads from "../Models/threadModel";
import Chats from "../Models/chatModel";
import Messages from "../Models/messageModel";
import { Request, Response} from 'express'
import { creatingChat, creatingMessages, gettingMessages } from "../types";

export async function createChat(req: Request, res: Response) {
    const body = req.body;
    const inputValidation = creatingChat.safeParse(body);
    if (!inputValidation.success) return res.sendStatus(403)
    const {user1, user2} = req.body;
    const addChat = new Chats({
        users: [user1, user2]
    })
    const addedChat = await addChat.save()
    const findUserOne = await User.findById(user1)
    const findUserTwo = await User.findById(user2);
    findUserOne.chats.push(addedChat._id)
    findUserTwo.chats.push(addedChat._id)
    await findUserOne.save()
    await findUserTwo.save()
    return res.status(200).json({msg: "user created", user: addedChat})
}


export async function getChatsForSidebar(req: Request, res: Response) {
    const userId = req.headers["userId"]
    const user = await User.findById(userId).populate('chats')
    const populatedChats = await User.populate(user.chats, { path: 'users' });
    console.log(populatedChats)
    return res.status(200).json({chats: populatedChats})
}


export async function getChatMessages(req: Request, res: Response) {
    const body = req.body;
    const inputValidation = gettingMessages.safeParse(body)
    if (!inputValidation.success) return res.sendStatus(403)
    const {chatId} = body;
    const getMessages = await Messages.find({chatId: chatId})
    return res.status(200).json({messages: getMessages})
}

export async function createMessage(req: Request, res: Response) {
    const body = req.body;
    const inputValidation = creatingMessages.safeParse(body)
    if (!inputValidation.success) return res.sendStatus(403)
    const {userId, content, chatId} = body;
    const addMessage = new Messages({
        sender: userId,
        message: content, 
        chatId: chatId
    })
    const addedMessage = await addMessage.save()
    return res.status(200).json({msg: "message created", message: addedMessage})
}