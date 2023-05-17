"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBetHandler = void 0;
const lodash_1 = require("lodash");
const js_sha512_1 = __importDefault(require("js-sha512"));
const createBetHandler = async (request, h) => {
    const body = request.payload;
    const user = (0, lodash_1.get)(body, "pwd", "");
    let password = (0, lodash_1.get)(body, "pwd", "");
    console.log("request", request);
    console.log(password);
    password = await js_sha512_1.default.sha512(password);
    console.log(password);
    return body;
};
exports.createBetHandler = createBetHandler;
