import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {retrieveUser, saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";

export const loginHandler = async (request: { payload: UserEntity }, h: ResponseToolkit): Promise<object> => {
    const body: UserEntity = request.payload;
    let password: string = get(body, "password", "");
    let username: string = get(body, "username", "");

    console.log(`ddd${process.env.VALUE_TEST}`);

    const user: UserEntity | null = await retrieveUser("username", username);
    password = await crypto.sha512(password);
    console.log(`666${password}666`);


    if (user?.username !== username || user?.password !== password)
        return h.response({
            message: "The user credentials are invalid."
        }).code(400);

    const accessToken: string = generateJwt({...omit(user, ["password"]), id: user?.id});

    saveSession({
        id: 1,
        user_id: user?.id,
        token: accessToken,
    })

    return {
        accessToken
    };
};
