"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsHandler = void 0;
const lodash_1 = require("lodash");
const transaction_controller_1 = require("../controllers/transaction.controller");
const getTransactionsHandler = async (request, h) => {
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    const wallet_aux = await (0, transaction_controller_1.retrieveTransactions)("user_id", id);
    if ((0, lodash_1.isNil)(wallet_aux))
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    return wallet_aux;
};
exports.getTransactionsHandler = getTransactionsHandler;
