import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isEmpty, isNil, omit} from "lodash";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {TransactionEntity} from "../entities/transactions.entity";
import {retrieveTransactions} from "../controllers/transaction.controller";
import {messageResponse} from "../util/MessageResponse";
import {UserEntity} from "../entities/user.entity";
import {retrieveUser} from "../controllers/users.controller";

export const getTransactionsHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject | TransactionEntity[]> => {
    let {id, role} = get(request, "pre.jwtMiddleware", "");
    const query = get(request, "query", "");
    let transactions: TransactionEntity[] | null;

    let payload: object = {};

    if (!isEmpty(query)){
        if (role === "user") {
            payload = {...query, user_id: id };
        } else {
            payload = {...query };
        }

    } else {
        if (role === "user") {
            payload = { user_id: id };
        }
    }

    transactions = await retrieveTransactions(payload);
    if (isNil(transactions))
        return messageResponse("There is not any balance for the user", 400, h);

    return transactions;
}
