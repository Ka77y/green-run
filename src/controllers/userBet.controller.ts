import { AppDataSource } from "../mysql"
import {UserEntity} from "../entities/user.entity";
import {
    get
} from "lodash";
import {UserBetsEntity} from "../entities/userBets.entity";

export const saveUserBets = async (userBetsData: UserBetsEntity): Promise<void> => {
    const userBets: UserBetsEntity = new UserBetsEntity();

    userBets.user_id= get(userBetsData,"user_id"),
    userBets.bet_id= get(userBetsData,"bet_id"),
    userBets.odd= get(userBetsData,"odd", 0),
    userBets.amount= get(userBetsData,"amount", 0),
    userBets.state= get(userBetsData,"state", "open")

    await AppDataSource.manager.save(userBets);
    console.log("User Bets has been saved. User Bets id is", userBets.id);
}
