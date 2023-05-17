"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const lodash_1 = require("lodash");
const userMiddleware = async (request, h) => {
    const { role } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    if (role !== "user") {
        h.response({
            message: "This endpoint is accesible only for the 'superAdmin' role"
        }).code(400);
        throw new Error();
    }
    return h.continue;
};
exports.userMiddleware = userMiddleware;
