import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, isEmpty, isNil, omit} from "lodash";
import crypto from "js-sha512";
import {retrieveUser, saveUser, updateUser} from "../controllers/users.controller";
import {generateJwt, verifyJWT} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";
import {messageResponse} from "../util/MessageResponse";

export const blockUserHandler = async (request: Request, h: ResponseToolkit): Promise<object> => {
    const middlewareMessage: string = get(request, "pre.adminMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const {id} = get(request, "pre.jwtMiddleware", "");
    const user: UserEntity | null = await retrieveUser(get(request, "params", ""))

    if (isNil(user) || user?.role === "admin")
        return messageResponse("This user can´t be blocked", 400, h);

    updateUser({ ...user, user_state: "block" }, {id});

    return messageResponse("The user has been successfully blocked", 400, h);
};
