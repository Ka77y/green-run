import { AppDataSource } from "../mysql"
import {
    get, isNil, set
} from "lodash";
import {BetsEntity} from "../entities/bets.entity";

export const saveBet = async (betData: BetsEntity): Promise<void> => {
    const bet: BetsEntity = new BetsEntity();

    bet.bet_option= get(betData,"bet_option",0);
    bet.odd= get(betData,"odd", 0);
    bet.created_at= get(betData,"created_at", 0);
    bet.updated_at= get(betData,"updated_at", 0);
    bet.deleted= get(betData,"deleted", false);
    bet.deleted_at= get(betData,"deleted_at", 0);
    bet.sport= get(betData,"sport", "");
    bet.status= get(betData,"status", "active");
    bet.name= get(betData,"name", "");
    bet.event_id= get(betData,"event_id", 0);
    bet.result= get(betData,"result", "open");

    await AppDataSource.manager.save(bet);
    console.log("bet has been saved. bet id is",bet.id);
}

export const retrieveBets = async (payload: object): Promise<BetsEntity[] | null> => {
    const bets: BetsEntity[] | null = await AppDataSource.getRepository(BetsEntity).findBy(payload);

    return bets;
}

export const retrieveOneBet = async (payload: object): Promise<BetsEntity | null> =>
    await AppDataSource.getRepository(BetsEntity).findOneBy(payload);


export const updateBet = async (betData: BetsEntity, queryPayload: object): Promise<void> => {
    const bet: BetsEntity | null = await retrieveOneBet(queryPayload);

    if (!isNil(bet)) {
        Object.keys(betData).forEach((key: string) => set(<BetsEntity>bet, key, get(betData, key, "")));
    }

    await AppDataSource.manager.save(bet);

    console.log("Bet has been updated. Bet id is", queryPayload);
}
