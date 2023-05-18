import { AppDataSource } from "../mysql"
import {UserEntity} from "../entities/user.entity";
import {
    get, isNil, set
} from "lodash";
import {UserBetsEntity} from "../entities/userBets.entity";
import {WalletEntity} from "../entities/userWallet.entity";
import {retrieveWallet} from "./userWallet.controller";

export const saveUserBets = async (userBetsData: UserBetsEntity): Promise<number> => {
    const userBets: UserBetsEntity = new UserBetsEntity();

    userBets.user_id= get(userBetsData,"user_id"),
    userBets.bet_id= get(userBetsData,"bet_id"),
    userBets.odd= get(userBetsData,"odd", 0),
    userBets.amount= get(userBetsData,"amount", 0),
    userBets.state= get(userBetsData,"state", "open")
    userBets.created_at= get(userBetsData,"created_at", 0)
    userBets.updated_at= get(userBetsData,"updated_at", 0)
    userBets.deleted= get(userBetsData,"deleted", false)
    userBets.deleted_at= get(userBetsData,"deleted_at", 0)

    await AppDataSource.manager.save(userBets);
    console.log("User Bets has been saved. User Bets id is", userBets.id);

    return userBets.id!;
}

export const retrieveUsersBet = async (payload: object): Promise<UserBetsEntity[] | null> => {
    const user: UserBetsEntity[] | null = await AppDataSource.getRepository(UserBetsEntity).findBy(payload)

    return user
}

export const retrieveOneUsersBet = async (payload: object): Promise<UserBetsEntity | null> => {
    const user: UserBetsEntity | null = await AppDataSource.getRepository(UserBetsEntity).findOneBy(payload)

    return user
}
export const updateUserBet = async (userBetData: object, query_payload: object): Promise<void> => {
    const userBet: UserBetsEntity | null = await retrieveOneUsersBet(query_payload);

    if (!isNil(userBetData)) {
        Object.keys(userBetData).forEach((key: string) => set(<UserBetsEntity>userBet, key, get(userBetData, key, "")));
    }

    await AppDataSource.manager.save(UserBetsEntity, userBetData);
    console.log("User bet has been updated. User id is", query_payload);
}
