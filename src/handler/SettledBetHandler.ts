import {UserEntity} from "../entities/user.entity";
import {ResponseObject, ResponseToolkit} from "hapi";
import {defaultTo, get, omit} from "lodash";
import crypto from "js-sha512";
import {saveUser} from "../controllers/users.controller";
import {generateJwt} from "../util/JWT";
import {saveSession} from "../controllers/session.controller";
import {BetsEntity} from "../entities/bets.entity";
import {saveBet, updateBet} from "../controllers/bet.controller";
import {saveTransaction} from "../controllers/transaction.controller";
import {retrieveUsersBet, updateUserBet} from "../controllers/userBet.controller";
import {UserBetsEntity} from "../entities/userBets.entity";
import {BET_RESULT, TRANSACTION_SETTLED_CATEGORY} from "../Enum/BusinessRulesEnum";
import {retrieveWallet, updateWallet} from "../controllers/userWallet.controller";
import {WalletEntity} from "../entities/userWallet.entity";
import {rxSubscriber} from "rxjs/internal-compatibility";
import {messageResponse} from "../util/MessageResponse";

export const settledBetHandler = async (request: Request, h: ResponseToolkit): Promise<BetsEntity | ResponseObject> => {
    const body: BetsEntity = <BetsEntity> get(request, "payload");
    const middlewareMessage: string = get(request, "pre.adminMiddleware.message", "");
    if (middlewareMessage !== "")
        return messageResponse(middlewareMessage, 400, h);


    updateBet({
        ...body,
        updated_at: Date.now(),
    }, {id: get(request, "params.bet_id")});



    const betUsers: UserBetsEntity[] | null = await retrieveUsersBet(get(request, "params"));

    console.log("3333333333333333333333333");
    console.log( betUsers);
    console.log("3333333333333333333333333");

    betUsers?.forEach((betUser: UserBetsEntity) => updateSettledBetInfo(betUser, body))

    return body;
}
export const updateSettledBetInfo = async (betUser: UserBetsEntity, body: BetsEntity) => {
    const amount: number = body.result! === BET_RESULT.WON? betUser.amount! * betUser.odd! : 0;
    const wallet: WalletEntity | null = await retrieveWallet({user_id: betUser.user_id});

    saveTransaction({
        amount,
        user_id: betUser.user_id,
        category: TRANSACTION_SETTLED_CATEGORY[body.result!],
        created_at: Date.now(),
        status: "approval",
        user_bet_id: betUser.id
    });
    updateWallet({
        ...wallet,
        balance: wallet?.balance! + amount
    }, {user_id: betUser.user_id});

    updateUserBet(
        {
            ...betUser,
            state: body.result!,
            updated_at: Date.now()
        },
        {id: betUser.id!})

    return body;

}
