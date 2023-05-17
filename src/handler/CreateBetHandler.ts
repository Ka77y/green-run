import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {BetsEntity} from "../entities/bets.entity";

export const createBetHandler = async (request: { payload: BetsEntity }, h: ResponseToolkit): Promise<BetsEntity> => {
    const body: BetsEntity = request.payload;
    const user: string = get(body, "pwd", "");
    let password: string = get(body, "pwd", "");

    console.log("request", request);
    console.log(password);

    password = await crypto.sha512(password)

    console.log(password);

    return body;
}
