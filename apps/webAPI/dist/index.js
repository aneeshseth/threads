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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const ws_1 = require("ws");
const port = 8021;
const wss = new ws_1.WebSocketServer({ port });
const roomConnections = new Map();
wss.on('connection', (ws) => {
    console.log(`Connected to ${ws}`);
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        console.log(data);
        try {
            if (data.action) {
                if (data.action === "joinRoom") {
                    const { room } = data;
                    if (!roomConnections.has(room)) {
                        roomConnections.set(room, new Set());
                    }
                    roomConnections.get(room).add(ws);
                    console.log(`WebSocket joined room: ${room}`);
                }
                else if (data.action === "sendMessage") {
                    console.log('HELLOS FROM SEND');
                    const { room, text } = data;
                    if (roomConnections.has(room)) {
                        const roomClients = roomConnections.get(room);
                        console.log(roomClients);
                        for (const client of roomClients) {
                            console.log('number');
                            client.send(JSON.stringify({ user: "aneesh", msg: text }));
                        }
                        console.log(`Message sent to room ${room}: ${JSON.stringify({ user: "aneesh", msg: text })}`);
                    }
                    else {
                        console.log(`Room ${room} not found.`);
                    }
                }
            }
        }
        catch (error) {
            console.error('Error handling message:', error);
        }
    });
    ws.on('close', () => {
        roomConnections.forEach((connections, room) => {
            if (connections.has(ws)) {
                connections.delete(ws);
            }
            if (connections.size === 0) {
                roomConnections.delete(room);
            }
        });
    });
});
const db_1 = require("./lib/db");
(0, db_1.ensureDbConnected)();
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const threadRoutes_1 = __importDefault(require("./Routes/threadRoutes"));
const chatRoutes_1 = __importDefault(require("./Routes/chatRoutes"));
app.use("/", userRoutes_1.default);
app.use("/", threadRoutes_1.default);
app.use("/", chatRoutes_1.default);
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: "AKIA35VTPTMRCBRBML64",
        secretAccessKey: "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"
    },
    region: "us-east-1"
});
app.post("/api/posts", upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const params = {
        Bucket: "my-bucket-next",
        Key: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
        Body: (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer,
        ContentType: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype
    };
    const command = new client_s3_1.PutObjectCommand(params);
    yield s3.send(command);
    console.log(command);
    const getObjectParams = {
        Bucket: "my-bucket-next",
        Key: (_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname,
    };
    const command2 = new client_s3_1.GetObjectCommand(getObjectParams);
    console.log(command2);
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command2, { expiresIn: 3700 });
    console.log(url);
    return res.status(200).json({ image: url });
}));
app.listen(3010, () => {
    console.log(`app listening on port 3010`);
});
