"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const sessionEntity_1 = require("./entities/sessionEntity");
const transactions_entity_1 = require("./entities/transactions.entity");
const bets_entity_1 = require("./entities/bets.entity");
const userBets_entity_1 = require("./entities/userBets.entity");
const userWallet_entity_1 = require("./entities/userWallet.entity");
const dotenv_1 = require("dotenv");
const entities = [user_entity_1.UserEntity, sessionEntity_1.SessionEntity, transactions_entity_1.TransactionEntity, bets_entity_1.BetsEntity, userBets_entity_1.UserBetsEntity, userWallet_entity_1.WalletEntity];
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    entities,
    type: "mysql",
    host: `${process.env.MY_SQL_HOST}`,
    port: Number(`${process.env.MY_SQL_PORT}`),
    username: `${process.env.MY_SQL_USERNAME}`,
    password: `${process.env.MY_SQL_PASSWORD}`,
    database: `${process.env.MY_SQL_DATABASE}`,
    logging: true,
    synchronize: true,
});
const initDb = async () => {
    console.log({
        entities,
        type: "mysql",
        host: `${process.env.MY_SQL_HOST}`,
        port: Number(`${process.env.MY_SQL_PORT}`),
        username: `${process.env.MY_SQL_USERNAME}`,
        password: `${process.env.MY_SQL_PASSWORD}`,
        database: `${process.env.MY_SQL_DATABASE}`,
        logging: true,
        synchronize: true,
    });
    return exports.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
};
exports.initDb = initDb;
