"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserBets = void 0;
const mysql_1 = require("../mysql");
const lodash_1 = require("lodash");
const userBets_entity_1 = require("../entities/userBets.entity");
const saveUserBets = async (userBetsData) => {
    const userBets = new userBets_entity_1.UserBetsEntity();
    userBets.user_id = (0, lodash_1.get)(userBetsData, "user_id"),
        userBets.bet_id = (0, lodash_1.get)(userBetsData, "bet_id"),
        userBets.odd = (0, lodash_1.get)(userBetsData, "odd", 0),
        userBets.amount = (0, lodash_1.get)(userBetsData, "amount", 0),
        userBets.state = (0, lodash_1.get)(userBetsData, "state", "open");
    await mysql_1.AppDataSource.manager.save(userBets);
    console.log("User Bets has been saved. User Bets id is", userBets.id);
};
exports.saveUserBets = saveUserBets;
