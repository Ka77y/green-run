import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet, saveWallet} from "../controllers/userWallet.controller";
import {saveTransaction} from "../controllers/transaction.controller";

export const adminMiddleware = async (request: Request, h: ResponseToolkit) => {
    const {role} = get(request, "pre.jwtMiddleware", "");

    if(role !== "admin")
        return h.response({
            message: "This endpoint is accesible only for the 'admin' role"
        }).code(400);
}
