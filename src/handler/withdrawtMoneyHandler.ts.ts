import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";

export const withdrawtMoneyHandlerTs = async (request: Request, h: ResponseToolkit) => {
    const body: TransactionEntity = <TransactionEntity> get(request, "payload");
    const {id} = get(request, "pre.jwtMiddleware", "");
    const wallet_aux: WalletEntity = await defaultTo(retrieveWallet("user_id", id), {}) as WalletEntity;
    let balance: number;

    if (isNil(wallet_aux)) {
        saveTransaction({
            ...body,
            user_id: id,
            category: "withdraw",
            created_at: Date.now(),
            status: "denied",
            amount: body.amount //todo: add reason in the trx object
        })
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    } else if (wallet_aux.balance! - body.amount! < 0) {
        return h.response({
            message: "You do not have a balance available to execute the transaction."
        }).code(400);
    } else {
        balance = wallet_aux.balance! - body.amount!;
    }

    saveTransaction({
        ...body,
        user_id: id,
        category: "withdraw",
        created_at: Date.now(),
        status: "approval",
        amount: body.amount
    })
    saveWallet({
        ...wallet_aux,
        user_id: id,
        balance,
        updated_at: Date.now()
    });
    return body;
}
