import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {BetsEntity} from "../entities/bets.entity";
import {retrieveOneBet, saveBet, updateBet} from "../controllers/bet.controller";
import {messageResponse} from "../util/MessageResponse";

export const updateBetHandler = async (request: Request, h: ResponseToolkit): Promise<BetsEntity | ResponseObject> => {
    const middlewareMessage: string = get(request, "pre.adminMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const body: BetsEntity = <BetsEntity> get(request, "payload");
    const bet_id: number = get(request, "params");
    const bet: BetsEntity | null = await retrieveOneBet({id: bet_id});

    if (body.status === "cancelled" && bet?.status === "settled")
        return messageResponse("The status can´t be updated to cancelled because the bet is already settled" , 400, h);

    updateBet({
        ...body,
        updated_at: Date.now(),
    }, get(request, "params"));

    return body;
}
