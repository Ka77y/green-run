"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const lodash_1 = require("lodash");
const js_sha512_1 = __importDefault(require("js-sha512"));
const users_controller_1 = require("../controllers/users.controller");
const JWT_1 = require("../util/JWT");
const session_controller_1 = require("../controllers/session.controller");
const loginHandler = async (request, h) => {
    const body = request.payload;
    let password = (0, lodash_1.get)(body, "password", "");
    let username = (0, lodash_1.get)(body, "username", "");
    console.log(`ddd${process.env.VALUE_TEST}`);
    const user = await (0, users_controller_1.retrieveUser)("username", username);
    password = await js_sha512_1.default.sha512(password);
    console.log(`666${password}666`);
    if ((user === null || user === void 0 ? void 0 : user.username) !== username || (user === null || user === void 0 ? void 0 : user.password) !== password)
        return h.response({
            message: "The user credentials are invalid."
        }).code(400);
    const accessToken = (0, JWT_1.generateJwt)(Object.assign(Object.assign({}, (0, lodash_1.omit)(user, ["password"])), { id: user === null || user === void 0 ? void 0 : user.id }));
    (0, session_controller_1.saveSession)({
        id: 1,
        user_id: user === null || user === void 0 ? void 0 : user.id,
        token: accessToken,
    });
    return {
        accessToken
    };
};
exports.loginHandler = loginHandler;
