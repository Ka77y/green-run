"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBetsHandler = void 0;
const lodash_1 = require("lodash");
const transaction_controller_1 = require("../controllers/transaction.controller");
const getBetsHandler = async (request, h) => {
    const params = (0, lodash_1.get)(request, "query", "");
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    const wallet_aux = await (0, transaction_controller_1.retrieveTransactions)("user_id", id);
    console.log("params");
    console.log(params);
    console.log("params");
    if ((0, lodash_1.isNil)(wallet_aux))
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    return wallet_aux;
};
exports.getBetsHandler = getBetsHandler;
