"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const verify_1 = require("../Middleware/verify");
const router = express_1.default.Router();
router.post("/signup", userController_1.signUp);
router.post("/login", userController_1.logIn);
router.get("/verify", verify_1.verify);
router.get("/decodedToken", verify_1.getUserDecodedToken);
router.post("/getUser", verify_1.getUserFromDecodedToken);
exports.default = router;
