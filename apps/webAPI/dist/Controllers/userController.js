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
exports.logIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../types/index");
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const inputValidation = index_1.signupInput.safeParse(body);
        if (!inputValidation.success)
            return res.status(400).json({ msg: 'invalid input' });
        const { username, password, profile_pic, email, role } = body;
        const existingUser = yield userModel_1.default.find({ username: username });
        if (existingUser.length > 0)
            return res.status(400).json({ msg: "user exists" });
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const addUser = new userModel_1.default({
            username: username, password: hashedPassword, profile_pic: profile_pic, email: email, role: role
        });
        const addedUser = yield addUser.save();
        return res.status(200).json({ msg: "user created", user: addedUser });
    });
}
exports.signUp = signUp;
function logIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const inputValidation = index_1.loginInput.safeParse(body);
        if (!inputValidation.success)
            return res.status(400).json({ msg: 'invalid input' });
        const { username, password } = body;
        const existingUser = yield userModel_1.default.find({ username: username });
        console.log(existingUser);
        if (existingUser.length === 0)
            return res.status(400).json({ msg: "user does not exist" });
        const comparePassword = yield bcryptjs_1.default.compareSync(password, existingUser[0].password);
        if (!comparePassword)
            return res.status(400).json({ msg: 'invalid password' });
        const tokenDetails = {
            id: existingUser[0]._id,
            username: existingUser[0].username
        };
        const token = yield jsonwebtoken_1.default.sign(tokenDetails, "ANEESH", { expiresIn: "1d" });
        return res.status(200).json({
            token: token,
            msg: 'user logged in'
        });
    });
}
exports.logIn = logIn;
