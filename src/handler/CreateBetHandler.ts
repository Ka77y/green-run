import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {BetsEntity} from "../entities/bets.entity";
import {saveBet} from "../controllers/bet.controller";

export const createBetHandler = async (request: { payload: BetsEntity }, h: ResponseToolkit): Promise<BetsEntity> => {
    const body: BetsEntity = request.payload;
    saveBet({
        ...body,
        created_at: Date.now(),
    });

    return body;
}
