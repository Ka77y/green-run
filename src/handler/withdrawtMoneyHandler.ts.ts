import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet, updateWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";
import {messageResponse} from "../util/MessageResponse";

export const withdrawtMoneyHandlerTs = async (request: Request, h: ResponseToolkit): Promise<TransactionEntity | ResponseObject> => {
    const middlewareMessage: string = get(request, "pre.userMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const body: TransactionEntity = <TransactionEntity> get(request, "payload");
    const {id} = get(request, "pre.jwtMiddleware", "");
    const wallet_aux: WalletEntity = await defaultTo(retrieveWallet({user_id: id}), {}) as WalletEntity;
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
        return messageResponse("You do not have a balance available to execute the transaction.",
            400, h);

    } else if (wallet_aux.balance! - body.amount! < 0) {
        return messageResponse("You do not have a balance available to execute the transaction.",
            400, h);
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
    updateWallet({
        ...wallet_aux,
        balance,
        updated_at: Date.now()
    }, {user_id: id});
    return body;
}
