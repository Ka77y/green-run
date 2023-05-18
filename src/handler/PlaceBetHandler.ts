import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, isNil, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {BetsEntity} from "../entities/bets.entity";
import {retrieveBets, retrieveOneBet, saveBet, updateBet} from "../controllers/bet.controller";
import {UserBetsEntity} from "../entities/userBets.entity";
import {saveUserBets} from "../controllers/userBet.controller";
import {messageResponse} from "../util/MessageResponse";
import {retrieveWallet, updateWallet} from "../controllers/userWallet.controller";
import {WalletEntity} from "../entities/userWallet.entity";
import {saveTransaction} from "../controllers/transaction.controller";

export const placeBetHandler = async (request: Request, h: ResponseToolkit): Promise<UserBetsEntity | ResponseObject> => {
    const middlewareMessage: string = get(request, "pre.userMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);

    const body: UserBetsEntity = <UserBetsEntity> get(request, "payload");
    const bet: BetsEntity | null = await retrieveOneBet(get(request, "params"));
    const {id} = get(request, "pre.jwtMiddleware", "");
    const wallet: WalletEntity | null = await retrieveWallet({user_id: id});

    if ( body.amount! > defaultTo(wallet?.balance, 0)){
        return messageResponse("You don´t have enough money to place the bet", 400, h);
    }

    console.log("bet");
    console.log(get(request, "params"));
    console.log(bet);
    console.log("bet");

    if (isNil(bet)) {
        return messageResponse("The specified bet doesn´t exist", 400, h);
    }
    if (bet.status !== "active" || bet.result !== "open") {
        return messageResponse("The specified bet isn´t active, please choose another", 400, h);
    }


    const user_bet_id: number = await saveUserBets({
        ...body,
        created_at: Date.now(),
        odd: bet.odd,
        state: bet.result,
        user_id: id,
        bet_id: bet.id
    });

    saveTransaction({
        ...body,
        user_bet_id,
        user_id: id,
        category: "bet",
        created_at: Date.now(),
        status: "approved",
        amount: body.amount
    })


    updateWallet({
        ...wallet,
        balance: wallet?.balance! - body.amount!
    }, {user_id: id});

    return {
        ...body,
        created_at: Date.now(),
        odd: bet.odd,
        state: bet.result,
        user_id: id,
        bet_id: bet.id
    };
}
