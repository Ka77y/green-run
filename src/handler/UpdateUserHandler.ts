import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, isEmpty, isNil, omit} from "lodash";
import crypto from "js-sha512";
import {retrieveUser, saveUser, updateUser} from "../controllers/users.controller";
import {generateJwt, verifyJWT} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "../controllers/userWallet.controller";

export const updateUserHandler = async (request: Request, h: ResponseToolkit): Promise<object> => {
    const body: UserEntity = <UserEntity> get(request, "payload");
    const {id} = get(request, "pre.jwtMiddleware", "");
    let password: string = get(body, "password", "");
    let user_body: UserEntity

    if (!isEmpty(password)) {
        password = await crypto.sha512(password);
        user_body = {
            ...body,
            password,
            updated_at: Date.now()
        }
    } else {
        user_body = {
            ...body,
            updated_at: Date.now()
        }
    }

    const responseBody: UserEntity = omit(user_body, ["password"]);
    const accessToken: string = generateJwt({...responseBody, id});

    updateUser(user_body, id);
    saveSession({
        id: 1,
        user_id: id,
        token: accessToken,
    })

    return {
        ...responseBody,
        accessToken
    };
};
