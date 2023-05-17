"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.retrieveUser = exports.saveUser = void 0;
const mysql_1 = require("../mysql");
const user_entity_1 = require("../entities/user.entity");
const lodash_1 = require("lodash");
const saveUser = async (userData) => {
    const user = new user_entity_1.UserEntity();
    user.role = (0, lodash_1.get)(userData, "role", "user"),
        user.first_name = (0, lodash_1.get)(userData, "first_name", ""),
        user.last_name = (0, lodash_1.get)(userData, "last_name", ""),
        user.phone = (0, lodash_1.get)(userData, "phone", ""),
        user.email = (0, lodash_1.get)(userData, "email", ""),
        user.username = (0, lodash_1.get)(userData, "username", ""),
        user.country = (0, lodash_1.get)(userData, "country", ""),
        user.city = (0, lodash_1.get)(userData, "city", ""),
        user.document_id = (0, lodash_1.get)(userData, "document_id", ""),
        user.user_state = (0, lodash_1.get)(userData, "user_state", ""),
        user.created_at = (0, lodash_1.get)(userData, "created_at", 0),
        user.updated_at = (0, lodash_1.get)(userData, "updated_at", 0),
        user.deleted = (0, lodash_1.get)(userData, "deleted", false),
        user.deleted_at = (0, lodash_1.get)(userData, "deleted_at", 0),
        user.address = (0, lodash_1.get)(userData, "address", ""),
        user.gender = (0, lodash_1.get)(userData, "gender", "neuter"),
        user.birth_date = (0, lodash_1.get)(userData, "birth_date", 0);
    user.password = (0, lodash_1.get)(userData, "password");
    await mysql_1.AppDataSource.manager.save(user);
    console.log("User has been saved. User id is", user.id);
    return user.id;
};
exports.saveUser = saveUser;
const retrieveUser = async (key, value) => {
    const retrieve_query = {
        [key]: value
    };
    console.log("retrieve_query");
    console.log(retrieve_query);
    console.log("retrieve_query");
    const user = await mysql_1.AppDataSource.getRepository(user_entity_1.UserEntity).findOneBy(retrieve_query);
    console.log("user: ", user);
    return user;
};
exports.retrieveUser = retrieveUser;
const updateUser = async (userData, id) => {
    const user = await (0, exports.retrieveUser)("id", id);
    console.log("userData");
    console.log(userData);
    console.log("userData");
    if (!(0, lodash_1.isNil)(user)) {
        // @ts-ignore
        Object.keys(userData).forEach((key) => (user[key] = userData[key]));
    }
    console.log("userId");
    console.log(user);
    console.log("userId");
    await mysql_1.AppDataSource.manager.save(user);
    console.log("User has been updated. User id is", id);
};
exports.updateUser = updateUser;
