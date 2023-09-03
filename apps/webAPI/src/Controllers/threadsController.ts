import User from "../Models/userModel";
import Comments from "../Models/commentModel";
import Threads from "../Models/threadModel";
import { Request, Response} from 'express'
import {threadType, userCommentingType, userLikingThreadType, actualThreadParams} from '../types/index'


export async function createThreads(req: Request, res: Response) {
    try {
        const userId = req.headers["userId"]
        const body = req.body;
        const inputValidation = threadType.safeParse(body);
        if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
        const {thread} = body;
        const addThread = new Threads({
            thread: thread,
            userId: userId,
            likes: [],
            comments: []
        })
        const addedThread = await addThread.save()
        const user = await User.findById(userId);
        user.threads.push(addThread._id)
        await user.save()
        return res.status(200).json({msg: "thread created", thread: addedThread})
    } catch (err) {
        console.log(err)
    }
}


export async function likeThread(req: Request, res: Response) {
    try {
        const userId = req.headers["userId"]
        const body = req.body;
        const inputValidation = userLikingThreadType.safeParse(body)
        if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
        const {threadId} = req.body;
        const findThread = await Threads.findById(threadId)
        findThread.likes.push(userId)
        await findThread.save()
        return res.status(200).json({ msg: 'Thread liked successfully', findThread });
    } catch (err) {
        console.log(err)
    }
}

export async function unlikeThread(req: Request, res: Response) {
    try {
        const userId = req.headers["userId"]
        const body = req.body;
        const inputValidation = userLikingThreadType.safeParse(body)
        if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
        const {threadId} = req.body;
        const findThread = await Threads.findById(threadId)
        findThread.likes = findThread.likes.filter((like: string) => like.toString() !== userId);
        await findThread.save()
        return res.status(200).json({ msg: 'Thread unliked successfully', findThread });
    } catch (err) {
        console.log(err)
    }
}

export async function createComment(req: Request, res: Response) {
    try {
        const userId = req.headers["userId"]
        const body = req.body;
        const inputValidation = userCommentingType.safeParse(body)
        if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
        const {comment,threadId} = req.body;
        const addComment = new Comments({
            threadId: threadId,
            comment: comment,
            userId: userId
        })
        const addedComment = await addComment.save()
        const findThread = await Threads.findById(threadId)
        findThread.comments.push(addedComment._id)
        await findThread.save()
        return res.status(200).json({ msg: 'Thread commented on successfully', findThread });
    } catch (err) {
        console.log(err)
    }
}


export async function getUserFollowingThreads(req: Request, res: Response) {
    try {
        const userId = req.headers["userId"];
        const user = await User.findById(userId);
        const promises = user.following.map(async (followingUserId: any) => {
            const getThreadsOfFollowing = await Threads.find({ userId: followingUserId });
            return getThreadsOfFollowing;
        });
        const result = await Promise.all(promises);
        const flattenedThreads = result.flat();
        return res.status(200).json({threads: flattenedThreads})
    } catch (err) {
        console.log(err);
    }
}


export async function getAllThreads(req: Request, res: Response) {
    try {
        const allThreads = await Threads.find({})
        return res.status(200).json({threads: allThreads})
    } catch (err) {
        console.log(err);
    }
}


export async function getUserThreads(req: Request, res: Response) {
    try {
        const {userUsername} = req.body;
        const userData = await User.find({username: userUsername}).populate('threads')
        return res.status(200).json({data: userData});
    } catch (err) {
        console.log(err)
    }
}