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
exports.ensureDbConnected = void 0;
let alreadyDone = false;
const mongoose_1 = __importDefault(require("mongoose"));
function ensureDbConnected() {
    return __awaiter(this, void 0, void 0, function* () {
        if (alreadyDone)
            return;
        yield mongoose_1.default.connect("mongodb+srv://user123:pass2123@cluster0.8dhddrv.mongodb.net/").then(() => {
            console.log("done!");
        });
        alreadyDone = true;
    });
}
exports.ensureDbConnected = ensureDbConnected;
