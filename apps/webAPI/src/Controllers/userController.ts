import User from "../Models/userModel";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {Request, Response} from 'express'
import {signupInput, loginInput} from '../types/index'



export async function signUp(req: Request, res: Response) {
    const body = req.body;
    const inputValidation = signupInput.safeParse(body);
    if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
    const {username, password, profile_pic, email, role} = body;
    const existingUser = await User.find({username: username})
    if (existingUser.length > 0) return res.status(400).json({msg: "user exists"})
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)
    const addUser = new User({
        username:username, password: hashedPassword, profile_pic: profile_pic, email: email, role: role
    })
    const addedUser = await addUser.save()
    return res.status(200).json({msg: "user created", user: addedUser})
}

export async function logIn(req: Request, res: Response) {
    const body = req.body;
    const inputValidation = loginInput.safeParse(body);
    if (!inputValidation.success) return res.status(400).json({msg: 'invalid input'})
    const {username, password} = body;
    const existingUser = await User.find({username: username})
    console.log(existingUser)
    if (existingUser.length === 0) return res.status(400).json({msg: "user does not exist"})
    const comparePassword = await bcryptjs.compareSync(password, existingUser[0].password!)
    if (!comparePassword) return res.status(400).json({msg: 'invalid password'})
    const tokenDetails = {
        id: existingUser[0]._id,
        username: existingUser[0].username
    }
    const token = await jwt.sign(tokenDetails, "ANEESH", {expiresIn: "1d"})
    return res.status(200).json({
        token: token,
        msg: 'user logged in'
    })
}