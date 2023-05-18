import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isNil, omit} from "lodash";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {TransactionEntity} from "../entities/transactions.entity";
import {retrieveTransactions} from "../controllers/transaction.controller";
import {retrieveBets} from "../controllers/bet.controller";
import {BetsEntity} from "../entities/bets.entity";
import {messageResponse} from "../util/MessageResponse";

export const getBetsHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject | BetsEntity[]> => {
    const middlewareMessage: string = get(request, "pre.adminMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const bets: BetsEntity[] | null = await retrieveBets({status: "active"});

    if (isNil(bets))
        return h.response({
        message: "There aren´t active bets for now"
    }).code(400);


    return bets;
}
