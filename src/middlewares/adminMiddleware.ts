import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";
import {messageResponse} from "../util/MessageResponse";

export const adminMiddleware = async (request: any, h: any) => {
    const {role} = get(request, "pre.jwtMiddleware", "");

    const middlewareMessage: string = get(request, "pre.jwtMiddleware.message", "");
    if (middlewareMessage !== "")
        return h.response({
            message: middlewareMessage
        }).code(400);

    if(role !== "admin")
        return h.response({
            message: "This endpoint is accesible only for the 'admin' role"
        }).code(400);

    return h.continue;
}
