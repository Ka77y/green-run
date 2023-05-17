"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceHandler = void 0;
const lodash_1 = require("lodash");
const userWallet_controller_1 = require("../controllers/userWallet.controller");
const getBalanceHandler = async (request, h) => {
    const token = (0, lodash_1.get)(request, "headers.authorization");
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    const wallet_aux = await (0, userWallet_controller_1.retrieveWallet)("user_id", id);
    if ((0, lodash_1.isNil)(wallet_aux))
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    return h.response({
        message: `Your current balance is ${wallet_aux.balance} ${wallet_aux.currency}`
    }).code(200);
};
exports.getBalanceHandler = getBalanceHandler;
