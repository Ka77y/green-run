"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositMoneyHandler = void 0;
const lodash_1 = require("lodash");
const userWallet_controller_1 = require("../controllers/userWallet.controller");
const transaction_controller_1 = require("../controllers/transaction.controller");
const depositMoneyHandler = async (request, h) => {
    const body = (0, lodash_1.get)(request, "payload");
    const token = (0, lodash_1.get)(request, "headers.authorization");
    const { id } = (0, lodash_1.get)(request, "pre.jwtMiddleware", "");
    const wallet_aux = await (0, userWallet_controller_1.retrieveWallet)("user_id", id);
    let balance;
    (0, transaction_controller_1.saveTransaction)(Object.assign(Object.assign({}, body), { user_id: id, category: "deposit", created_at: Date.now(), status: "approval", amount: body.amount }));
    if ((0, lodash_1.isNil)(wallet_aux)) {
        balance = body.amount;
        (0, userWallet_controller_1.saveWallet)({
            user_id: id,
            balance,
            created_at: Date.now(),
            deleted: undefined,
            deleted_at: undefined,
            id: 0,
            updated_at: undefined
        });
    }
    else {
        balance = wallet_aux.balance + body.amount;
        (0, userWallet_controller_1.saveWallet)(Object.assign(Object.assign({}, wallet_aux), { balance, updated_at: Date.now() }));
    }
    return body;
};
exports.depositMoneyHandler = depositMoneyHandler;
