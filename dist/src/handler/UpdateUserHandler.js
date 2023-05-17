"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserHandler = void 0;
const lodash_1 = require("lodash");
const js_sha512_1 = __importDefault(require("js-sha512"));
const users_controller_1 = require("../controllers/users.controller");
const JWT_1 = require("../util/JWT");
const session_controller_1 = require("../controllers/session.controller");
const updateUserHandler = async (request, h) => {
    const body = (0, lodash_1.get)(request, "payload");
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    let password = (0, lodash_1.get)(body, "password", "");
    let user_body;
    if (!(0, lodash_1.isEmpty)(password)) {
        password = await js_sha512_1.default.sha512(password);
        user_body = Object.assign(Object.assign({}, body), { password, updated_at: Date.now() });
    }
    else {
        user_body = Object.assign(Object.assign({}, body), { updated_at: Date.now() });
    }
    const responseBody = (0, lodash_1.omit)(user_body, ["password"]);
    const accessToken = (0, JWT_1.generateJwt)(Object.assign(Object.assign({}, responseBody), { id }));
    (0, users_controller_1.updateUser)(user_body, id);
    (0, session_controller_1.saveSession)({
        id: 1,
        user_id: id,
        token: accessToken,
    });
    return Object.assign(Object.assign({}, responseBody), { accessToken });
};
exports.updateUserHandler = updateUserHandler;