import {ResponseObject, ResponseToolkit} from "hapi";
import {get, isNil, omit} from "lodash";
import {verifyJWT} from "../util/JWT";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {messageResponse} from "../util/MessageResponse";
import {UserEntity} from "../entities/user.entity";
import {retrieveUser} from "../controllers/users.controller";

export const getBalanceHandler = async (request: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    console.log("heeeeereee");
    let {id, role} = get(request, "pre.jwtMiddleware", "");

    console.log(get(request, "params.username", ""));

    if (role === "admin") {
        const user: UserEntity | null = await retrieveUser("username", get(request, "params.username", ""));

        if (isNil(user))
            return messageResponse("There specified user doesn´t exist", 400, h);

        id = user?.id
    }

    console.log(id);

    const wallet_aux: WalletEntity | null = await retrieveWallet("user_id", id);

    if (isNil(wallet_aux))
        return messageResponse("There is not any balance for the user", 400, h);

    return messageResponse(`The current balance is ${wallet_aux.balance} ${wallet_aux.currency}`, 200, h);
}
