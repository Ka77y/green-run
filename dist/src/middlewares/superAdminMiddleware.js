"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminMiddleware = void 0;
const lodash_1 = require("lodash");
const superAdminMiddleware = async (request, h) => {
    const { role } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    if (role !== "user")
        return h.response({
            message: "This endpoint is accesible only for the 'user' role"
        }).code(400);
};
exports.superAdminMiddleware = superAdminMiddleware;
