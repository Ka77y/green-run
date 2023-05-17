import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";

export const depositMoneyHandler = async (request: Request, h: ResponseToolkit): Promise<TransactionEntity> => {
    const body: TransactionEntity = <TransactionEntity> get(request, "payload");
    const token: string = get(request, "headers.authorization")
    const {id} = get(request, "pre.jwtMiddleware", "");

    const wallet_aux: WalletEntity | null = await retrieveWallet("user_id", id);
    let balance: number;

    saveTransaction({
        ...body,
        user_id: id,
        category: "deposit",
        created_at: Date.now(),
        status: "approval",
        amount: body.amount
    })

    if (isNil(wallet_aux)) {
        balance = body.amount!;
        saveWallet({
            user_id: id,
            balance,
            created_at: Date.now(),
            deleted: undefined,
            deleted_at: undefined,
            id: 0,
            updated_at: undefined
        });
    } else {
        balance = wallet_aux.balance! + body.amount!;
        saveWallet({
            ...wallet_aux,
            balance,
            updated_at: Date.now()
        });
    }

    return body;
}
