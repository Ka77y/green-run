import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";

export const createUserHandler = async (request: { payload: UserEntity }, h: ResponseToolkit): Promise<object> => {
    const body: UserEntity = request.payload;
    let password: string = get(body, "password", "");

    password = await crypto.sha512(password);
    const user_body: UserEntity = {
        ...body,
        password,
        created_at: Date.now(),
        user_state: "active",
    };
    const responseBody: UserEntity = omit(user_body, ["password"]);
    const user_id: number | undefined = await defaultTo(saveUser(user_body), 0);
    const accessToken: string = generateJwt({...responseBody, id: user_id});


    return {
        ...responseBody,
        accessToken,
        id: user_id
    };
};
