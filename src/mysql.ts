import {DataSource} from "typeorm";
import { UserEntity } from "./entities/user.entity";
import {SessionEntity} from "./entities/sessionEntity";
import {TransactionEntity} from "./entities/transactions.entity";
import {BetsEntity} from "./entities/bets.entity";
import {UserBetsEntity} from "./entities/userBets.entity";
import {WalletEntity} from "./entities/userWallet.entity";
import {config} from "dotenv";

const entities = [UserEntity, SessionEntity, TransactionEntity, BetsEntity, UserBetsEntity, WalletEntity];
config();
export const AppDataSource: DataSource = new DataSource({
        entities,
        type: "mysql",
        host: `${process.env.MY_SQL_HOST}`,
        port: Number(`${process.env.MY_SQL_PORT}`),
        username: `${process.env.MY_SQL_USERNAME}`,
        password: `${process.env.MY_SQL_PASSWORD}`,
        database: `${process.env.MY_SQL_DATABASE}`,
        logging: true,
        synchronize: true,
    }
)

export const initDb = async (): Promise<void> => {
    return AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err: Error) => {
            console.error("Error during Data Source initialization:", err);
        });
}

