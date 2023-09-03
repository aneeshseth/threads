"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const threadsController_1 = require("../Controllers/threadsController");
const verify_1 = require("../Middleware/verify");
const router = express_1.default.Router();
router.post("/create_threads", verify_1.verify, threadsController_1.createThreads);
router.post("/like_thread", verify_1.verify, threadsController_1.likeThread);
router.post("/unlike_thread", verify_1.verify, threadsController_1.unlikeThread);
router.post("/create_comment", verify_1.verify, threadsController_1.createComment);
router.get("/get_following_threads", verify_1.verify, threadsController_1.getUserFollowingThreads);
router.get("/all_threads", verify_1.verify, threadsController_1.getAllThreads);
router.post("/get_user_threads", verify_1.verify, threadsController_1.getUserThreads);
exports.default = router;
