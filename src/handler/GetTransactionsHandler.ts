import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isNil, omit} from "lodash";
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

    if (role === "admin") {
        const user: UserEntity | null = await retrieveUser("username", get(request, "params.username", ""));

        if (isNil(user))
            return messageResponse("There specified user doesn´t exist", 400, h);

        id = user?.id
    }

    console.log(id);
    const transactions: TransactionEntity[] | null = await retrieveTransactions("user_id", id);

    if (isNil(transactions))
        return messageResponse("There is not any balance for the user", 400, h);

    return transactions;
}
