import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet, updateWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";
import {messageResponse} from "../util/MessageResponse";

export const depositMoneyHandler = async (request: Request, h: ResponseToolkit): Promise<TransactionEntity | ResponseObject> => {
    const middlewareMessage: string = get(request, "pre.userMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const body: TransactionEntity = <TransactionEntity> get(request, "payload");
    const {id} = get(request, "pre.jwtMiddleware", "");
    const wallet: WalletEntity | null = await retrieveWallet({user_id: id});
    let balance: number;

    saveTransaction({
        ...body,
        created_at: Date.now(),
        user_id: id,
        category: "deposit",
        status: "approval",
        amount: body.amount
    })

    if (isNil(wallet)) {
        balance = body.amount!;
        saveWallet({
            user_id: id,
            balance,
            created_at: Date.now(),
        });
    } else {
        balance = wallet.balance! + body.amount!;
        updateWallet({
            ...wallet,
            balance,
            updated_at: Date.now()
        }, {user_id: id});
    }

    return body;
}
