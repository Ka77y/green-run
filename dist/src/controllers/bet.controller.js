"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveBets = exports.saveBet = void 0;
const mysql_1 = require("../mysql");
const lodash_1 = require("lodash");
const bets_entity_1 = require("../entities/bets.entity");
const bet = new bets_entity_1.BetsEntity();
const saveBet = async (betData) => {
    bet.bet_option = (0, lodash_1.get)(betData, "bet_option", 0),
        bet.odd = (0, lodash_1.get)(betData, "last_name", 0),
        bet.created_at = (0, lodash_1.get)(betData, "created_at", 0),
        bet.updated_at = (0, lodash_1.get)(betData, "updated_at", 0),
        bet.deleted = (0, lodash_1.get)(betData, "deleted", false),
        bet.deleted_at = (0, lodash_1.get)(betData, "deleted_at", 0),
        bet.sport = (0, lodash_1.get)(betData, "sport", ""),
        bet.status = (0, lodash_1.get)(betData, "status", "active"),
        bet.name = (0, lodash_1.get)(betData, "name", ""),
        bet.event_id = (0, lodash_1.get)(betData, "event", 0),
        bet.result = (0, lodash_1.get)(betData, "birth_date", 0),
        await mysql_1.AppDataSource.manager.save(bet);
    console.log("bet has been saved. bet id is", bet.id);
};
exports.saveBet = saveBet;
const retrieveBets = async (key, value) => {
    console.log("value");
    console.log(value);
    console.log("value");
    const bets = await mysql_1.AppDataSource.getRepository(bets_entity_1.BetsEntity).find();
    console.log("transactions: ", bets);
    return bets;
};
exports.retrieveBets = retrieveBets;
