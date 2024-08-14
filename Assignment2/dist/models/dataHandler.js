"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, "../../data/users.json");
const readData = () => {
    try {
        const data = fs_1.default.readFileSync(filepath, 'utf-8');
        return JSON.parse(data);
    }
    catch (e) {
        return [];
    }
};
exports.readData = readData;
const writeData = (data) => {
    fs_1.default.writeFileSync(filepath, JSON.stringify(data, null, 2));
};
exports.writeData = writeData;
