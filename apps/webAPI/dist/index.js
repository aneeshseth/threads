"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 3010;
const db_1 = require("./lib/db");
(0, db_1.ensureDbConnected)();
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
app.use("/", userRoutes_1.default);
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
