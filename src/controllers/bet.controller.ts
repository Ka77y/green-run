import { AppDataSource } from "../mysql"
import {
    get
} from "lodash";
import {BetsEntity} from "../entities/bets.entity";
import {TransactionEntity} from "../entities/transactions.entity";
const bet: BetsEntity = new BetsEntity();

export const saveBet = async (betData: BetsEntity): Promise<void> => {
    bet.bet_option= get(betData,"bet_option",0),
    bet.odd= get(betData,"last_name", 0),
    bet.created_at= get(betData,"created_at", 0),
    bet.updated_at= get(betData,"updated_at", 0),
    bet.deleted= get(betData,"deleted", false),
    bet.deleted_at= get(betData,"deleted_at", 0),
    bet.sport= get(betData,"sport", ""),
    bet.status= get(betData,"status", "active"),
    bet.name= get(betData,"name", ""),
    bet.event_id= get(betData,"event", 0),
    bet.result= get(betData,"birth_date", 0),

    await AppDataSource.manager.save(bet);
    console.log("bet has been saved. bet id is",bet.id);
}

export const retrieveBets = async (key:string, value: string | number): Promise<BetsEntity[] | null> => {
    console.log("value");
    console.log(value);
    console.log("value");

    const bets: BetsEntity[] | null = await AppDataSource.getRepository(BetsEntity).find();

    console.log("transactions: ", bets);

    return bets;
}
