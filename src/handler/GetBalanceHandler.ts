import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isEmpty, isNil} from "lodash";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {messageResponse} from "../util/MessageResponse";
import {UserEntity} from "../entities/user.entity";
import {retrieveUser} from "../controllers/users.controller";

export const getBalanceHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    let {id, role, user_state} = get(request, "pre.jwtMiddleware", "");
    console.log("id");
    console.log(id);
    console.log("id");
    const query = get(request, "query", "");
    let payload: object = {};

    if(user_state === "block") {
        return messageResponse("The user is blocked and cannot perform this action", 400, h);
    }

    if (!isEmpty(query)){
        payload = {...query, user_id: get(request, "query.user_id", "") };
    } else {
        if (role === "user") {
            payload = { user_id: id };
        }
    }

    console.log("payload");
    console.log(payload);
    console.log("payload");
    const wallet_aux: WalletEntity | null = await retrieveWallet(payload);

    if (isNil(wallet_aux))
        return messageResponse("There is not any balance for the user", 400, h);

    return messageResponse(`The current balance is ${wallet_aux.balance} ${wallet_aux.currency}`, 200, h);
}
