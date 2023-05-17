"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const lodash_1 = require("lodash");
const js_sha512_1 = __importDefault(require("js-sha512"));
const users_controller_1 = require("../controllers/users.controller");
const JWT_1 = require("../util/JWT");
const session_controller_1 = require("../controllers/session.controller");
const createUserHandler = async (request, h) => {
    const body = request.payload;
    let password = (0, lodash_1.get)(body, "password", "");
    console.log(`333${password}333`);
    password = await js_sha512_1.default.sha512(password);
    console.log(`444${password}444`);
    const user_body = Object.assign(Object.assign({}, body), { password, created_at: Date.now(), user_state: "available" });
    const responseBody = (0, lodash_1.omit)(user_body, ["password"]);
    const user_id = await (0, lodash_1.defaultTo)((0, users_controller_1.saveUser)(user_body), 0);
    const accessToken = (0, JWT_1.generateJwt)(Object.assign(Object.assign({}, responseBody), { id: user_id }));
    (0, session_controller_1.saveSession)({
        id: 1,
        user_id,
        token: accessToken,
    });
    return Object.assign(Object.assign({}, responseBody), { accessToken });
};
exports.createUserHandler = createUserHandler;
