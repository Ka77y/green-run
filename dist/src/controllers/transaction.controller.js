"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveTransactions = exports.saveTransaction = void 0;
const mysql_1 = require("../mysql");
const lodash_1 = require("lodash");
const transactions_entity_1 = require("../entities/transactions.entity");
const saveTransaction = async (trxData) => {
    const transaction = new transactions_entity_1.TransactionEntity();
    transaction.user_id = (0, lodash_1.get)(trxData, "user_id"),
        transaction.user_bet_id = (0, lodash_1.get)(trxData, "user_bet_id"),
        transaction.category = (0, lodash_1.get)(trxData, "category"),
        transaction.status = (0, lodash_1.get)(trxData, "status", ""),
        transaction.amount = (0, lodash_1.get)(trxData, "amount", 0);
    await mysql_1.AppDataSource.manager.save(transaction);
    console.log("Transaction has been saved. Transaction id is", transaction.id);
};
exports.saveTransaction = saveTransaction;
const retrieveTransactions = async (key, value) => {
    console.log("value");
    console.log(value);
    console.log("value");
    const transactions = await mysql_1.AppDataSource.getRepository(transactions_entity_1.TransactionEntity).findBy({
        user_id: Number(value)
    });
    console.log("transactions: ", transactions);
    return transactions;
};
exports.retrieveTransactions = retrieveTransactions;
