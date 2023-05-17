"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawtMoneyHandlerTs = void 0;
const lodash_1 = require("lodash");
const userWallet_controller_1 = require("../controllers/userWallet.controller");
const transaction_controller_1 = require("../controllers/transaction.controller");
const withdrawtMoneyHandlerTs = async (request, h) => {
    const body = (0, lodash_1.get)(request, "payload");
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    const wallet_aux = await (0, lodash_1.defaultTo)((0, userWallet_controller_1.retrieveWallet)("user_id", id), {});
    let balance;
    if ((0, lodash_1.isNil)(wallet_aux)) {
        (0, transaction_controller_1.saveTransaction)(Object.assign(Object.assign({}, body), { user_id: id, category: "withdraw", created_at: Date.now(), status: "denied", amount: body.amount //todo: add reason in the trx object
         }));
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    }
    else if (wallet_aux.balance - body.amount < 0) {
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    }
    else {
        balance = wallet_aux.balance - body.amount;
    }
    (0, transaction_controller_1.saveTransaction)(Object.assign(Object.assign({}, body), { user_id: id, category: "withdraw", created_at: Date.now(), status: "approval", amount: body.amount }));
    (0, userWallet_controller_1.saveWallet)(Object.assign(Object.assign({}, wallet_aux), { user_id: id, balance, updated_at: Date.now() }));
    return body;
};
exports.withdrawtMoneyHandlerTs = withdrawtMoneyHandlerTs;
