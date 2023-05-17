"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.saveSession = void 0;
const mysql_1 = require("../mysql");
const lodash_1 = require("lodash");
const sessionEntity_1 = require("../entities/sessionEntity");
const saveSession = async (sessionData) => {
    console.log("sessionData");
    console.log(sessionData);
    console.log("sessionData");
    const session = new sessionEntity_1.SessionEntity();
    session.user_id = (0, lodash_1.get)(sessionData, "user_id"),
        session.token = (0, lodash_1.get)(sessionData, "token"),
        await mysql_1.AppDataSource.manager.save(session);
    console.log("User Session has been saved. User Session id is", session.id);
};
exports.saveSession = saveSession;
const updateSession = async (sessionData, sessionId) => {
    const session = new sessionEntity_1.SessionEntity();
    await mysql_1.AppDataSource.manager.createQueryBuilder()
        .update(session)
        .set(Object.assign({}, sessionData))
        .where("id = :sessionId", { sessionId })
        .execute();
    console.log("User Session has been saved. User Session id is", session.id);
};
exports.updateSession = updateSession;
