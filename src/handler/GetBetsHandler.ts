import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isNil, omit} from "lodash";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {TransactionEntity} from "../entities/transactions.entity";
import {retrieveTransactions} from "../controllers/transaction.controller";

export const getBetsHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject | TransactionEntity[]> => {
    const {id} = get(request, "pre.jwtMiddleware", "");
    const wallet_aux: TransactionEntity[] | null = await retrieveTransactions("user_id", id);

    if (isNil(wallet_aux))
        return h.response({
        message: "You do not have a balance available to execute the transaction."
    }).code(400);


    return wallet_aux;
}
