import express from 'express'
import {createThreads, createComment, likeThread, getAllThreads, getUserFollowingThreads, getUserThreads, unlikeThread} from '../Controllers/threadsController'
import { verify } from '../Middleware/verify';
const router = express.Router()

router.post("/create_threads",  createThreads)
router.post("/like_thread", likeThread)
router.post("/unlike_thread", verify, unlikeThread)
router.post("/create_comment",  createComment)
router.get("/get_following_threads", verify, getUserFollowingThreads)
router.get("/all_threads", verify, getAllThreads)
router.post("/get_user_threads", verify, getUserThreads)

export default router;