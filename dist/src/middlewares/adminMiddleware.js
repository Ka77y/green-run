"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const lodash_1 = require("lodash");
const adminMiddleware = async (request, h) => {
    const { role } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    if (role !== "admin")
        return h.response({
            message: "This endpoint is accesible only for the 'admin' role"
        }).code(400);
};
exports.adminMiddleware = adminMiddleware;
