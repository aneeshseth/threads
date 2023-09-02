import express from 'express'
import {logIn, signUp} from '../Controllers/userController'
import { getUserDecodedToken, getUserFromDecodedToken, verify } from '../Middleware/verify'
const router = express.Router()

router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/verify", verify)
router.get("/decodedToken", getUserDecodedToken)
router.post("/getUser", getUserFromDecodedToken)

export default router;