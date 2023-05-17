"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const lodash_1 = require("lodash");
const JWT_1 = require("../util/JWT");
const jwtMiddleware = (request, h) => {
    const token = (0, lodash_1.get)(request, "headers.authorization");
    const user = (0, JWT_1.verifyJWT)(token);
    if (user instanceof Error)
        return h.response({
            message: "The authentication Token has been expired, please login!."
        }).code(400);
    return user;
};
exports.jwtMiddleware = jwtMiddleware;
