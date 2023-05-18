import { AppDataSource } from "../mysql"
import {
    get
} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";

export const saveTransaction = async (trxData: object): Promise<void> => {
    const transaction: TransactionEntity = new TransactionEntity();

    transaction.user_id = get(trxData,"user_id");
    transaction.user_bet_id = get(trxData,"user_bet_id");
    transaction.category = get(trxData,"category");
    transaction.status = get(trxData,"status", "");
    transaction.amount = get(trxData, "amount", 0);
    transaction.created_at= get(trxData,"created_at", 0);
    transaction.updated_at= get(trxData,"updated_at", 0);
    transaction.deleted= get(trxData,"deleted", false);
    transaction.deleted_at= get(trxData,"deleted_at", 0);

    await AppDataSource.manager.save(transaction);
    console.log("Transaction has been saved. Transaction id is",transaction.id);
}

export const retrieveTransactions = async (payload: object): Promise<TransactionEntity[] | null> => await AppDataSource.getRepository(TransactionEntity).findBy(payload);
