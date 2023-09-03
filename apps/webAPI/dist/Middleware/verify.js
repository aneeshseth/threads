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
exports.getUserFromDecodedToken = exports.getUserDecodedToken = exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../Models/userModel"));
function verify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearerToken = req.headers.authorization;
            const extractedToken = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ")[1];
            jsonwebtoken_1.default.verify(extractedToken, "ANEESH", (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (!decoded) {
                    return res.sendStatus(403);
                }
                if (typeof decoded === "string") {
                    return res.sendStatus(403);
                }
                req.headers["userId"] = decoded.id;
                next();
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.verify = verify;
function getUserDecodedToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearerToken = req.headers.authorization;
            const extractedToken = bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.split(" ")[1];
            const decodedToken = jsonwebtoken_1.default.verify(extractedToken, "ANEESH");
            return res.status(200).json({
                userDecodedToken: decodedToken
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUserDecodedToken = getUserDecodedToken;
function getUserFromDecodedToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username } = req.body;
            const user = yield userModel_1.default.findOne({ username: username });
            console.log(user);
            return res.status(200).json({
                user: user
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUserFromDecodedToken = getUserFromDecodedToken;
