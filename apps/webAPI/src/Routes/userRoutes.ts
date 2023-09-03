import express from 'express'
import {followUser, getAllUsers, logIn, signUp} from '../Controllers/userController'
import { getUserDecodedToken, getUserFromDecodedToken, verify } from '../Middleware/verify'
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/verify", verify)
router.get("/decodedToken", getUserDecodedToken)
router.post("/getUser", getUserFromDecodedToken)
router.post("/follow_user", verify,followUser)
router.get("/all_users", verify, getAllUsers)


export default router;