"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveWallet = exports.saveWallet = void 0;
const mysql_1 = require("../mysql");
const lodash_1 = require("lodash");
const userWallet_entity_1 = require("../entities/userWallet.entity");
const wallet = new userWallet_entity_1.WalletEntity();
const saveWallet = async (walletData) => {
    wallet.user_id = (0, lodash_1.get)(walletData, "user_id"),
        wallet.balance = (0, lodash_1.get)(walletData, "balance", 0),
        wallet.currency = "USD",
        wallet.created_at = (0, lodash_1.get)(walletData, "created_at", 0),
        wallet.updated_at = (0, lodash_1.get)(walletData, "updated_at", 0),
        wallet.deleted = (0, lodash_1.get)(walletData, "deleted", false),
        wallet.deleted_at = (0, lodash_1.get)(walletData, "deleted_at", 0),
        await mysql_1.AppDataSource.manager.save(wallet);
    console.log("wallet has been saved. Wallet id is", wallet.id, " for the user id", wallet.user_id);
};
exports.saveWallet = saveWallet;
const retrieveWallet = async (key, value) => {
    const wallet = await mysql_1.AppDataSource.getRepository(userWallet_entity_1.WalletEntity).findOneBy({
        user_id: Number(value)
    });
    console.log("wallet: ", wallet);
    return wallet;
};
exports.retrieveWallet = retrieveWallet;
