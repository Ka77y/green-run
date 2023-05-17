import { AppDataSource } from "../mysql"
import {
    get
} from "lodash";
import {TransactionEntity} from "../entities/transactions.entity";

export const saveTransaction = async (trxData: TransactionEntity): Promise<void> => {
    const transaction: TransactionEntity = new TransactionEntity();

    transaction.user_id = get(trxData,"user_id"),
    transaction.user_bet_id = get(trxData,"user_bet_id"),
    transaction.category = get(trxData,"category"),
    transaction.status = get(trxData,"status", ""),
    transaction.amount = get(trxData, "amount", 0);

    await AppDataSource.manager.save(transaction);
    console.log("Transaction has been saved. Transaction id is",transaction.id);
}

export const retrieveTransactions = async (key:string, value: string | number): Promise<TransactionEntity[] | null> => {
    console.log("value");
    console.log(value);
    console.log("value");

    const transactions: TransactionEntity[] | null = await AppDataSource.getRepository(TransactionEntity).findBy({
        user_id: Number(value)
    })

    console.log("transactions: ", transactions);

    return transactions;
}
